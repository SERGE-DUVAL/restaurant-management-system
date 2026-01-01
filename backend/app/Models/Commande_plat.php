<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Commande_plat extends Model
{
    // Nom de la table (si ce n'est pas le pluriel par défaut)
    protected $table = 'commande_plats';

    // Les champs assignables en masse
    protected $fillable = [
        'commande_id',
        'plat_id',
        'quantite',
        'prix_unitaire'
    ];

    // Relations
    public function commande()
    {
        return $this->belongsTo(Commande::class);
    }

    public function plat()
    {
        return $this->belongsTo(Plat::class);
    }

    // Optionnel : désactiver les timestamps si tu ne les utilises pas
    public $timestamps = false;
}
