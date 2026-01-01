<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Commande as Order;
use App\Models\Plat;


class CommandeController extends Controller
{
 
    // GET /orders → liste des commandes
    public function index(Request $request)
    {
        $orders = Order::with(['clients', 'users', 'plats'])->get();
       // $orders = Order::filter($request->all())->get();

        return response()->json($orders, 200);
    }

    // POST /orders → créer une commande
    public function store(Request $request)
    {
        $request->validate([
            'client_id' => 'required|exists:clients,id',
            'user_id'   => 'required|exists:users,id',
            'total'     => 'required|numeric|min:0',
        ]);

        $order = Order::create($request->only(['client_id', 'user_id', 'total']));

        return response()->json($order, 201);
    }

    // PUT /orders/{id} → modifier une commande
    public function update(Request $request, $id)
    {
        $order = Order::findOrFail($id);

        $request->validate([
            'client_id' => 'sometimes|exists:clients,id',
            'user_id'   => 'sometimes|exists:users,id',
            'total'     => 'sometimes|numeric|min:0',
            'statut'    => 'sometimes|in:en_attente,payee,annulee',
        ]);

        $order->update($request->only(['client_id', 'user_id', 'total', 'statut']));

        return response()->json($order, 200);
    }

    // DELETE /orders/{id} → annuler une commande
    public function destroy($id)
    {
        $order = Order::findOrFail($id);
        $order->delete();

        return response()->json(['message' => 'Commande annulée'], 200);
    }

    // POST /orders/{id}/add-dish → ajouter un plat à la commande
    public function addDish(Request $request, $id)
    {
        $order = Order::findOrFail($id);

        $request->validate([
            'plat_id'  => 'required|exists:plats,id',
            'quantite' => 'required|integer|min:1',
        ]);

        $order->dishes()->syncWithoutDetaching([
            $request->plat_id => ['quantite' => $request->quantite]
        ]);

        return response()->json($order->load('plats'), 200);
    }

    // POST /orders/{id}/remove-dish → supprimer un plat de la commande
    public function removeDish(Request $request, $id)
    {
        $order = Order::findOrFail($id);

        $request->validate([
            'plat_id' => 'required|exists:plats,id',
        ]);

        $order->dishes()->detach($request->plat_id);

        return response()->json($order->load('plats'), 200);
    }

    // GET /orders/history → historique des commandes
    public function history()
    {
        $orders = Order::with(['clients', 'users', 'plats'])
                        ->orderBy('created_at', 'desc')
                        ->get();

        return response()->json($orders, 200);
    }
}
