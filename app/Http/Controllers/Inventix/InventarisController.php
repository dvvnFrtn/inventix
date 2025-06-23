<?php

namespace App\Http\Controllers\Inventix;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\InventarisResource;
use App\Http\Resources\KondisiResource;
use App\Models\Category;
use App\Models\Inventaris;
use App\Models\Kondisi;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Response;

class InventarisController extends Controller
{
    public function index(Request $request)
    {
        $query = Inventaris::with(relations: 'category')
            ->withSummary();

        if ($request->filled(key: 'category')) {
            $query->whereHas(relation: 'category', callback: function ($query) use ($request): void {
                $query->where(column: 'category_code', operator: $request->category);
            });
        }

        $inventariss = $query->orderBy(column: 'created_at')
            ->get();

        $categories = Category::all();

        return Response::json([
            'inventariss' => InventarisResource::collection(resource: $inventariss),
            'category_options' => CategoryResource::collection(resource: $categories),
        ]);
    }

    public function show(Request $request, string $code): JsonResponse
    {
        $query = Inventaris::where(column: 'inventaris_code', operator: $code)
            ->with(relations: 'category')
            ->with(relations: [
                'inventarisd' => function ($query) use ($request): void {
                    $query->orderBy('created_at')->with('kondisi');

                    if ($request->filled(key: 'condition')) {
                        $query->where(column: 'kondisi_id', operator: $request->condition);
                    }

                    if ($request->filled(key: 'status')) {
                        $query->where(column: 'inventarisd_status', operator: $request->status);
                    }
                }
            ])
            ->withSummary();

        $inventaris = $query->get();
        $conditions = Kondisi::all();
        $statuses = [
            [
                'id' => 1,
                'name' => 'tersedia'
            ],
            [
                'id' => 2,
                'name' => 'terpinjam'
            ],
            [
                'id' => 3,
                'name' => 'tiada'
            ],
        ];

        return Response::json([
            'inventaris' => InventarisResource::collection(resource: $inventaris),
            'condition_options' => KondisiResource::collection(resource: $conditions),
            'status_options' => $statuses,
        ]);
    }
}