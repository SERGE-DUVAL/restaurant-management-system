<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Events\NewNotification;

class NotificationController extends Controller
{
    // GET /notifications → liste des notifications pour l’utilisateur
    public function index()
    {
        $user = Auth::user();
        $notifications = Notification::where('user_id', $user->id)
                                     ->orderBy('created_at', 'desc')
                                     ->get();

        return response()->json($notifications, 200);
    }

    // Marquer une notification comme lue
    public function markAsRead($id)
    {
        $notification = Notification::findOrFail($id);

        if ($notification->user_id != Auth::id()) {
            return response()->json(['message' => 'Accès refusé'], 403);
        }

        $notification->update(['lu' => true]);

        return response()->json(['message' => 'Notification marquée comme lue'], 200);
    }

    // Ajouter une notification
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'message' => 'required|string',
        ]);

        $notification = Notification::create([
            'user_id' => $request->user_id,
            'message' => $request->message,
        ]);

        // Ici tu pourrais émettre un événement pour Laravel Echo / Pusher
        // event(new NewNotification($notification));

        return response()->json($notification, 201);
    }
    public function send(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'message' => 'required|string',
        ]);

        $data = [
            'user_id' => $request->user_id,
            'message' => $request->message
        ];

        event(new NewNotification($data));

        return response()->json(['status' => 'Notification envoyée']);
    }
}
