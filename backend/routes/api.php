<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PlatsController;
use App\Http\Controllers\CommandeController;
use App\Http\Controllers\PaiementController;
use App\Http\Controllers\StockController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\OnlineCommandeController;
use App\Http\Controllers\DashboardController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/password/forgot', [AuthController::class, 'forgotPassword']);
Route::post('/password/reset', [AuthController::class, 'resetPassword']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    // Routes protégées selon rôle
    Route::middleware('role:admin')->get('/admin-only', function() {
        return response()->json(['message' => 'Bienvenue admin']);
    });

    Route::middleware('role:caissier,serveur,gestionnaire')->get('/staff', function() {
        return response()->json(['message' => 'Bienvenue membre du staff']);
    });
});

Route::get('/test', function() {
    return response()->json(['message' => 'API fonctionne !']);
});

Route::get('/test-db-driver', function () {
    $info = [
        'php_version' => PHP_VERSION,
        'pdo_mysql_loaded' => extension_loaded('pdo_mysql'),
        'pdo_drivers' => PDO::getAvailableDrivers(),
        'php_ini' => php_ini_loaded_file(),
    ];

    try {
        DB::connection()->getPdo();
        $info['connection'] = 'success';
        $info['database'] = DB::connection()->getDatabaseName();
    } catch (\Exception $e) {
        $info['connection'] = 'failed';
        $info['error'] = $e->getMessage();
        $info['error_code'] = $e->getCode();
    }

    return response()->json($info, 200, [], JSON_PRETTY_PRINT);
});

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/users', [UserController::class, 'index']);              // liste
    Route::post('/users', [UserController::class, 'store']);             // ajouter
    Route::put('/users/{id}', [UserController::class, 'update']);        // modifier
    Route::delete('/users/{id}', [UserController::class, 'destroy']);    // supprimer
    Route::get('/users/search', [UserController::class, 'search']);      // recherche
    Route::patch('/users/{id}/role', [UserController::class, 'updateRole']); // changer rôle

});


Route::middleware('auth:sanctum')->group(function () {

    Route::get('/categories', [CategoryController::class, 'index']);        // lister
    Route::post('/categories', [CategoryController::class, 'store']);       // ajouter
    Route::put('/categories/{id}', [CategoryController::class, 'update']);  // modifier
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy']); // supprimer

});

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/dishes', [PlatsController::class, 'index']);              // liste
    Route::post('/dishes', [PlatsController::class, 'store']);             // ajouter
    Route::put('/dishes/{id}', [PlatsController::class, 'update']);        // modifier
    Route::delete('/dishes/{id}', [PlatsController::class, 'destroy']);    // supprimer
    Route::get('/dishes/search', [PlatsController::class, 'search']);      // recherche

});

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/orders', [CommandeController::class, 'index']);              // liste
    Route::post('/orders', [CommandeController::class, 'store']);             // ajouter
    Route::put('/orders/{id}', [CommandeController::class, 'update']);        // modifier
    Route::delete('/orders/{id}', [CommandeController::class, 'destroy']);    // supprimer
    Route::post('/orders/{id}/add-dish', [CommandeController::class, 'addDish']);      // ajouter plat
    Route::post('/orders/{id}/remove-dish', [CommandeController::class, 'removeDish']); // supprimer plat
    Route::get('/orders/history', [CommandeController::class, 'history']);    // historique

});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/paiements', [PaiementController::class, 'store']);
    Route::get('/paiements/{order_id}', [PaiementController::class, 'show']);
    Route::get('/paiements/{order_id}/facture', [PaiementController::class, 'generateInvoice']);

});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/stocks', [StockController::class, 'index']);
    Route::post('/stocks', [StockController::class, 'store']);
    Route::put('/stocks/{id}', [StockController::class, 'update']);
    Route::delete('/stocks/{id}', [StockController::class, 'destroy']);
    Route::get('/stocks/movements', [StockController::class, 'movements']);
});
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/menu', [OnlineCommandeController::class, 'menu']);
    Route::post('/cart/add', [OnlineCommandeController::class, 'addToCart']);
    Route::post('/cart/checkout', [OnlineCommandeController::class, 'checkout']);
    Route::get('/cart/status/{order_id}', [OnlineCommandeController::class, 'status']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/notify', [NotificationController::class, 'send']);

    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::post('/notifications', [NotificationController::class, 'store']);
    Route::patch('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);
});

Route::middleware('auth:sanctum')->group(function () {
Route::get('/dashboard', [DashboardController::class, 'index']);
Route::get('/dashboard/sales-chart', [DashboardController::class, 'salesChart']);
});