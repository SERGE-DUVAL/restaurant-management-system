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
        Schema::create('stocks', function (Blueprint $table) {
            $table->id(); // INT PK auto-increment

    $table->foreignId('plat_id')
          ->constrained('plats') // fait le lien avec la table plats (dishes)
          ->cascadeOnDelete();

    $table->integer('quantite')->default(0);
    $table->integer('seuil_alerte')->default(0);

    $table->timestamps(); // created_at & updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stocks');
    }
};
