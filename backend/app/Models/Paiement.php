<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Paiement extends Model
{
    use HasFactory;

    protected $fillable = [
        'commande_id',
        'mode_paiement',
        'montant',
        'statut',
    ];

    // Relation vers la commande
    public function commande()
    {
        return $this->belongsTo(\App\Models\Commande::class, 'commande_id');
    }
}
