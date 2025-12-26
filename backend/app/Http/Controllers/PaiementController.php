<?php

namespace App\Http\Controllers;

use App\Models\Paiement;
use App\Models\Commande as Order;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf as Pdf;

class PaiementController extends Controller
{
    // POST /paiements → enregistrer paiement
    public function store(Request $request)
    {
        $request->validate([
            'commande_id'  => 'required|exists:commandes,id',
            'mode_paiement' => 'required|in:cash,mobile_money,carte',
            'montant'       => 'required|numeric|min:0',
        ]);

        $paiement = Paiement::create([
            'commande_id'  => $request->commande_id,
            'mode_paiement'=> $request->mode_paiement,
            'montant'      => $request->montant,
            'statut'       => 'valide',
        ]);

        return response()->json($paiement, 201);
    }

    // GET /paiements/{order_id} → détail paiement
    public function show($order_id)
    {
        $paiements = Paiement::where('commande_id', $order_id)->get();
        return response()->json($paiements, 200);
    }

    // GET /paiements/{order_id}/facture → génération facture PDF
    public function generateInvoice($order_id)
    {
        $paiements = Paiement::where('commande_id', $order_id)->get();
        $order = Order::with('dishes')->findOrFail($order_id);

        $pdf = Pdf::loadView('factures.invoice', compact('order', 'paiements'));
        
        return $pdf->download("facture_commande_{$order_id}.pdf");
    }
}
