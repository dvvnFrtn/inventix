<?php

namespace Database\Factories;

use App\Models\Kondisi;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Inventarisd>
 */
class InventarisdFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $statusOptions = ['tersedia', 'terpinjam', 'tiada'];
        return [
            'inventarisd_code' => $this->faker->unique()->numberBetween(10000, 99999),
            'inventarisd_label' => ucfirst($this->faker->optional()->words(3, true)),
            'inventarisd_desc' => $this->faker->optional()->sentence(),
            'inventarisd_status' => $this->faker->randomElement($statusOptions),
            'kondisi_id' => Kondisi::inRandomOrder()->first()->kondisi_id
        ];
    }
}
