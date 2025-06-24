<?php

namespace App\Http\Controllers\Inventix;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\InventarisResource;
use App\Http\Resources\KondisiResource;
use App\Models\Category;
use App\Models\Inventaris;
use App\Models\Inventarisd;
use App\Models\Kondisi;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\RedirectResponse;

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

        return Inertia::render('InventoryPage', [
            'inventariss' => InventarisResource::collection(resource: $inventariss),
            'category_options' => CategoryResource::collection(resource: $categories),
        ]);
    }

    public function show(Request $request, string $code)
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

        $inventaris = $query->first();
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

        return Inertia::render('InventoryDetailPage', [
            'inventaris' => InventarisResource::make(resource: $inventaris),
            'condition_options' => KondisiResource::collection(resource: $conditions),
            'status_options' => $statuses,
        ]);
    }

    public function storeUnit(Request $request)
    {
        $validated = $request->validate([
            'inventaris_id' => 'required|uuid|exists:inventaris,inventaris_id',
            'inventarisd_label' => 'nullable|string|max:255',
            'inventarisd_desc' => 'nullable|string|max:500',
            'inventarisd_status' => 'required|string|in:tersedia,terpinjam,tiada',
            'kondisi_id' => 'required|integer|exists:kondisi,kondisi_id',
        ]);

        Inventarisd::create([
            'inventarisd_code' => fake()->unique()->numberBetween(10000, 99999),
            'inventarisd_label' => $validated['inventarisd_label'],
            'inventarisd_desc' => $validated['inventarisd_desc'],
            'inventarisd_status' => $validated['inventarisd_status'],
            'inventaris_id' => $validated['inventaris_id'],
            'kondisi_id' => $validated['kondisi_id'],
        ]);

        return redirect()->back()->with('success', 'Unit barang berhasil ditambahkan.');
    }

    public function updateUnit(Request $request, string $id)
    {
        $validated = $request->validate([
            'inventarisd_label' => 'nullable|string|max:255',
            'inventarisd_desc' => 'nullable|string|max:500',
            'inventarisd_status' => 'required|string|in:tersedia,terpinjam,tiada',
            'kondisi_id' => 'required|integer|exists:kondisi,kondisi_id',
        ]);

        Inventarisd::where('inventarisd_id', $id)->update([
            'inventarisd_label' => $validated['inventarisd_label'],
            'inventarisd_desc' => $validated['inventarisd_desc'],
            'inventarisd_status' => $validated['inventarisd_status'],
            'kondisi_id' => $validated['kondisi_id'],
        ]);

        return redirect()->back()->with('success', 'Unit barang berhasil diperbarui.');
    }

    public function destroyUnit($id)
    {
        $unit = Inventarisd::findOrFail($id);
        $unit->delete();

        return redirect()->back()->with('success', 'Unit barang berhasil dihapus.');
    }
}