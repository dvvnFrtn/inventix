<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Inventaris;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InventarisSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = Category::all();
        foreach ($categories as $category) {
            Inventaris::factory()
                ->count(3)
                ->create([
                    'category_id' => $category->category_id
                ]);
        }
    }
}
