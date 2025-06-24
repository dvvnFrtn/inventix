<?php

namespace Database\Seeders;

use App\Models\Inventaris;
use App\Models\Inventarisd;
use App\Models\Kondisi;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InventarisDSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $inventariss = Inventaris::all();

        foreach ($inventariss as $inventaris) {
            Inventarisd::factory()
                ->count(5)
                ->create([
                    'inventaris_id' => $inventaris->inventaris_id,
                ]);
        }
    }
}
