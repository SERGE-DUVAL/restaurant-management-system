<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'nom' => 'Admin',
            'prenom' => 'User',
            'email' => 'admin@test.com',
            'password' => Hash::make('password123'),
            'role' => 'admin', // admin | caissier | serveur | gestionnaire
            'telephone' => '0123456789',
        ]);
    }
}
