<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Inventaris>
 */
class InventarisFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'inventaris_code' => $this->faker->unique()->numberBetween(100, 999),
            'inventaris_name' => ucfirst($this->faker->words(2, true)),
            'inventaris_desc' => $this->faker->optional()->sentence(),
            'image_url' => "https://down-id.img.susercontent.com/file/dc0bd15ebc2c4bd249e163c1174a233e",
        ];
    }
}
