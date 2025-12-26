<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plat extends Model
{
    use HasFactory;

    // Table associée
    protected $table = 'plats';

    // Colonnes autorisées pour l'assignation en masse
    protected $fillable = [
        'nom',
        'description',
        'prix',
        'image',
        'disponible',
        'category_id'
    ];

    // Relation avec la catégorie
    public function category()
    {
        return $this->belongsTo(Categorie::class, 'category_id');
    }
}
