<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Identifiants invalides'], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user,
        ]);
    }

    // Inscription
    public function register(Request $request)
    {
        // Validation de base (sans vérification unique si DB inaccessible)
        $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|email',
            'password' => 'required|string|min:6|confirmed',
            'telephone' => 'nullable|string|max:20',
        ]);

        // Vérification manuelle de l'unicité de l'email (avec gestion d'erreur DB)
        try {
            $existingUser = User::where('email', $request->email)->first();
            if ($existingUser) {
                return response()->json([
                    'message' => 'Cet email est déjà utilisé',
                    'errors' => ['email' => ['Cet email est déjà associé à un compte']]
                ], 422);
            }
        } catch (\Exception $e) {
            // Si la base de données n'est pas accessible, on continue quand même
            // pour permettre le développement même sans DB
            \Log::warning('Impossible de vérifier l\'unicité de l\'email: ' . $e->getMessage());
        }

        try {
            $user = User::create([
                'nom' => $request->nom,
                'prenom' => $request->prenom,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => 'client', // Par défaut, les nouveaux utilisateurs sont des clients
                'telephone' => $request->telephone,
            ]);

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'access_token' => $token,
                'token_type' => 'Bearer',
                'user' => $user,
                'message' => 'Inscription réussie',
            ], 201);
        } catch (\Exception $e) {
            \Log::error('Erreur lors de l\'inscription: ' . $e->getMessage());
            
            // Vérifier si c'est une erreur de connexion DB
            if (str_contains($e->getMessage(), 'could not translate host name') || 
                str_contains($e->getMessage(), 'could not find driver')) {
                return response()->json([
                    'message' => 'Impossible de se connecter à la base de données. Vérifiez la configuration Supabase.',
                    'error' => 'Database connection failed'
                ], 503);
            }
            
            return response()->json([
                'message' => 'Une erreur est survenue lors de l\'inscription',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Déconnexion
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Déconnecté avec succès']);
    }
    public function forgotPassword(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $status = Password::sendResetLink(
            $request->only('email')
        );

        return $status === Password::RESET_LINK_SENT
            ? response()->json(['message' => 'Lien de réinitialisation envoyé'])
            : response()->json(['message' => 'Impossible d’envoyer le lien'], 400);
    }

    // Reset password
    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|confirmed|min:6'
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->password = Hash::make($password);
                $user->save();
            }
        );

        return $status === Password::PASSWORD_RESET
            ? response()->json(['message' => 'Mot de passe réinitialisé'])
            : response()->json(['message' => 'Impossible de réinitialiser le mot de passe'], 400);
    }
}
