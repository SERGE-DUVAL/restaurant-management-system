<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Commande;
use App\Models\Paiement;
use App\Models\Plat;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    // GET /dashboard
    public function index()
    {
        // Total ventes journalières
        $todaySales = Paiement::whereDate('created_at', now())
            ->sum('montant');

        // Total ventes mensuelles
        $monthSales = Paiement::whereMonth('created_at', now()->month)
            ->sum('montant');

        // Nombre de commandes
        $totalOrders = Commande::count();

        // Plats les plus vendus
        $topDishes = DB::table('commande_plat')
            ->select('plat_id', DB::raw('SUM(quantite) as total'))
            ->groupBy('plat_id')
            ->orderByDesc('total')
            ->limit(5)
            ->get();

        // Si tu veux, tu peux joindre les infos des plats
        $topDishes = $topDishes->map(function($item) {
            $plat = Plat::find($item->plat_id);
            return [
                'plat' => $plat->nom ?? 'Inconnu',
                'total_vendu' => $item->total
            ];
        });

        return response()->json([
            'today_sales' => $todaySales,
            'month_sales' => $monthSales,
            'total_orders' => $totalOrders,
            'top_dishes' => $topDishes,
        ]);
    }

    // Optionnel : statistiques pour graphiques
    public function salesChart()
    {
        // Exemple : ventes des 7 derniers jours
        $sales = Paiement::select(
            DB::raw('DATE(created_at) as date'),
            DB::raw('SUM(montant) as total')
        )
        ->where('created_at', '>=', now()->subDays(7))
        ->groupBy('date')
        ->orderBy('date')
        ->get();

        return response()->json($sales);
    }
}
