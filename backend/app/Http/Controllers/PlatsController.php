<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Plat;

use Illuminate\Support\Facades\Storage;
class PlatsController extends Controller
{




    // GET /dishes
    public function index()
    {
        // Récupère tous les plats avec leur catégorie
        $dishes = Plat::with('category')->get();
        return response()->json($dishes, 200);
    }

    // POST /dishes
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|unique:plats,nom',
            'description' => 'nullable|string',
            'prix' => 'required|numeric',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'disponible' => 'boolean'
        ]);

        $data = $request->only(['nom', 'description', 'prix', 'category_id', 'disponible']);

        // Upload de l'image si elle existe
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('plats', 'public');
        }

        $dish = Plat::create($data);

        return response()->json($dish, 201);
    }

    // PUT /dishes/{id}
    public function update(Request $request, $id)
    {
        $dish = Plat::findOrFail($id);

        $request->validate([
            'nom' => 'required|string|unique:plats,nom,' . $id,
            'description' => 'nullable|string',
            'prix' => 'required|numeric',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'disponible' => 'boolean'
        ]);

        $data = $request->only(['nom', 'description', 'prix', 'category_id', 'disponible']);

        if ($request->hasFile('image')) {
            // Supprimer l'ancienne image si elle existe
            if ($dish->image) {
                Storage::disk('public')->delete($dish->image);
            }
            $data['image'] = $request->file('image')->store('plats', 'public');
        }

        $dish->update($data);

        return response()->json($dish, 200);
    }

    // DELETE /dishes/{id}
    public function destroy($id)
    {
        $dish = Plat::findOrFail($id);

        if ($dish->image) {
            Storage::disk('public')->delete($dish->image);
        }

        $dish->delete();

        return response()->json(['message' => 'Plat supprimé'], 200);
    }

    // GET /dishes/search?query=xxx
    public function search(Request $request)
    {
        $query = $request->input('query');

        $dishes = Plat::where('nom', 'like', "%$query%")
                      ->orWhere('description', 'like', "%$query%")
                      ->with('category')
                      ->get();

        return response()->json($dishes, 200);
    }
}
