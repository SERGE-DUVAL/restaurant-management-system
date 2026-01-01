<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('paiements', function (Blueprint $table) {
            $table->id(); // INT PK auto-increment

    $table->foreignId('commande_id')
          ->constrained('commandes')
          ->cascadeOnDelete();

    $table->enum('mode_paiement', ['cash', 'mobile_money', 'carte']);
    $table->decimal('montant', 10, 2);
    $table->enum('statut', ['valide', 'refuse'])->default('valide');

    $table->timestamps(); // created_at & updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('paiements');
    }
};
