<?php

namespace App\Http\Controllers;

use App\Models\Stock;
use App\Models\Mouvement_stock;
use Illuminate\Http\Request;

class StockController extends Controller
{
    // GET /stocks
    public function index()
    {
        $stocks = Stock::with('plat')->get();
        return response()->json($stocks, 200);
    }

    // POST /stocks → ajouter un produit
    public function store(Request $request)
    {
        $request->validate([
            'plat_id' => 'required|exists:plats,id',
            'quantite' => 'required|integer|min:0',
            'seuil_alerte' => 'nullable|integer|min:0'
        ]);

        $stock = Stock::create($request->all());

        // Optionnel : ajouter mouvement initial
        Mouvement_stock::create([
            'stock_id' => $stock->id,
            'type' => 'entree',
            'quantite' => $stock->quantite,
            'description' => 'Stock initial'
        ]);

        return response()->json($stock, 201);
    }

    // PUT /stocks/{id} → modifier quantité
    public function update(Request $request, $id)
    {
        $stock = Stock::findOrFail($id);

        $request->validate([
            'quantite' => 'required|integer',
        ]);

        $delta = $request->quantite - $stock->quantite;
        $stock->quantite = $request->quantite;
        $stock->save();

        // Ajouter mouvement
        if ($delta != 0) {
            Mouvement_stock::create([
                'stock_id' => $stock->id,
                'type' => $delta > 0 ? 'entree' : 'sortie',
                'quantite' => abs($delta),
                'description' => 'Mise à jour stock'
            ]);
        }

        // Vérifier seuil d'alerte
        if ($stock->quantite <= $stock->seuil_alerte) {
            // Ici tu peux envoyer une notification (email, webhook, etc.)
        }

        return response()->json($stock, 200);
    }

    // DELETE /stocks/{id} → supprimer
    public function destroy($id)
    {
        $stock = Stock::findOrFail($id);
        $stock->delete();

        return response()->json(['message' => 'Stock supprimé'], 200);
    }

    // GET /stocks/movements → historique mouvements
    public function movements()
    {
        $movements = Mouvement_stock::with('stock.plat')->get();
        return response()->json($movements, 200);
    }
}
