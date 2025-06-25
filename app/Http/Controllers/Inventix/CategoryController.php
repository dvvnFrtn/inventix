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
}
