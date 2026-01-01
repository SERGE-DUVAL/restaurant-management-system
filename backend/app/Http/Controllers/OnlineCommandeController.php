<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Plat;
use App\Models\Commande;
use App\Models\Paiement;
use Illuminate\Support\Facades\Auth;

class OnlineCommandeController extends Controller
{

    // GET /menu → liste des plats disponibles
    public function menu()
    {
        $plats = Plat::where('disponible', true)->get();
        return response()->json($plats, 200);
    }

    // POST /cart/add → ajouter plat au panier
    public function addToCart(Request $request)
    {
        $request->validate([
            'plat_id' => 'required|exists:plats,id',
            'quantite' => 'required|integer|min:1'
        ]);

        $cart = session()->get('cart', []);

        $plat_id = $request->plat_id;
        $quantite = $request->quantite;

        if(isset($cart[$plat_id])) {
            $cart[$plat_id] += $quantite;
        } else {
            $cart[$plat_id] = $quantite;
        }

        session()->put('cart', $cart);

        return response()->json(['message' => 'Plat ajouté au panier', 'cart' => $cart], 200);
    }

    // POST /cart/checkout → valider commande
    public function checkout(Request $request)
    {
        $cart = session()->get('cart', []);

        if(empty($cart)) {
            return response()->json(['message' => 'Le panier est vide'], 400);
        }

        $request->validate([
            'mode_paiement' => 'required|in:cash,mobile_money,carte',
        ]);

        $user = Auth::user(); // Client connecté
        $total = 0;

        foreach($cart as $plat_id => $quantite) {
            $plat = Plat::findOrFail($plat_id);
            $total += $plat->prix * $quantite;
        }

        $commande = Commande::create([
            'client_id' => $user->id,
            'user_id' => $user->id, // Si le serveur gère la commande
            'total' => $total,
            'statut' => 'en_attente'
        ]);

        // Ajouter les plats à la commande
        foreach($cart as $plat_id => $quantite) {
            $commande->dishes()->attach($plat_id, ['quantite' => $quantite]);
        }

        // Créer paiement
        Paiement::create([
            'commande_id' => $commande->id,
            'mode_paiement' => $request->mode_paiement,
            'montant' => $total,
            'statut' => 'valide'
        ]);

        // Vider le panier
        session()->forget('cart');

        return response()->json(['message' => 'Commande passée avec succès', 'commande_id' => $commande->id], 201);
    }

    // GET /cart/status/{order_id} → suivi commande
    public function status($order_id)
    {
        $commande = Commande::with('dishes')->findOrFail($order_id);
        return response()->json([
            'commande_id' => $commande->id,
            'statut' => $commande->statut,
            'total' => $commande->total,
            'plats' => $commande->dishes
        ], 200);
    }

}
