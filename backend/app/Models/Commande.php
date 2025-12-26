<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;



class Commande extends Model
{

    use HasFactory;

    protected $table = 'commandes';

    protected $fillable = [
        'client_id',
        'user_id',
        'total',
        'statut',
    ];

    // Relation avec le client
    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    // Relation avec l'utilisateur (ex: caissier)
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relation avec les plats (many-to-many)
    public function dishes()
    {
        return $this->belongsToMany(Plat::class, 'commande_plat', 'commande_id', 'plat_id')
                    ->withPivot('quantite')
                    ->withTimestamps();
    }
    public function scopeFilter($query, $filters)
{
    return $query
        ->when($filters['date'] ?? null, fn($q,$date) => $q->whereDate('created_at', $date))
        ->when($filters['client_id'] ?? null, fn($q,$id) => $q->where('client_id', $id))
        ->when($filters['statut'] ?? null, fn($q,$statut) => $q->where('statut', $statut));
}
}


