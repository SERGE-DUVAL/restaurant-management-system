<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    // GET /categories
    public function index()
    {
        return response()->json(Categorie::all(), 200);
    }

    // POST /categories
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|unique:categories,nom',
            'description' => 'nullable|string'
        ]);

        $category = Categorie::create([
            'nom' => $request->nom,
            'description' => $request->description
        ]);

        return response()->json($category, 201);
    }

    // PUT /categories/{id}
    public function update(Request $request, $id)
    {
        $category = Categorie::findOrFail($id);

        $request->validate([
            'nom' => 'required|string|unique:categories,nom,' . $id,
            'description' => 'nullable|string'
        ]);

        $category->update([
            'nom' => $request->nom,
            'description' => $request->description
        ]);

        return response()->json($category, 200);
    }

    // DELETE /categories/{id}
    public function destroy($id)
    {
        $category = Categorie::findOrFail($id);
        $category->delete();

        return response()->json(['message' => 'Catégorie supprimée'], 200);
    }
}
