<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Mouvement_stock extends Model
{
    protected $fillable = [
        'stock_id',
        'type',
        'quantite',
        'description',
    ];

    public function stock()
    {
        return $this->belongsTo(Stock::class);
    }
}
