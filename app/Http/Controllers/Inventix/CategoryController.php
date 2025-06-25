<?php

namespace App\Http\Controllers\Inventix;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::all();

        return Inertia::render('CategoryPage', [
            'categories' => CategoryResource::collection($categories),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_name' => 'required|string',
            'category_desc' => 'nullable|string',
        ]);

        Category::create([
            'category_code' => fake()->unique()->numberBetween(100, 999),
            'category_name' => $validated['category_name'],
            'category_desc' => $validated['category_desc'],
        ]);

        return redirect()->back()->with('success', 'Kategori berhasil ditambahkan');
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'category_name' => 'required|string',
            'category_desc' => 'nullable|string',
        ]);

        Category::where('category_id', $id)
            ->update([
                'category_name' => $validated['category_name'],
                'category_desc' => $validated['category_desc'],
            ]);

        return redirect()->back()->with('success', 'Kategori berhasil diperbarui');
    }

    public function destroy(string $id)
    {

    }
}
