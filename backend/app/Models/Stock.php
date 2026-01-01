<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    protected $fillable = [
        'plat_id',
        'quantite',
        'seuil_alerte',
    ];

    public function plat()
    {
        return $this->belongsTo(Plat::class);
    }

    public function mouvements()
    {
        return $this->hasMany(Mouvement_stock::class);
    }
}
