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
        Schema::create('mouvement_stocks', function (Blueprint $table) {
            $table->id(); // INT PK auto-increment

    $table->foreignId('stock_id')->constrained('stocks')->cascadeOnDelete();

    $table->enum('type', ['entree', 'sortie']);
    $table->integer('quantite');
    $table->text('description')->nullable(); // Motif

    $table->timestamps(); // created_at & updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mouvement_stocks');
    }
};
