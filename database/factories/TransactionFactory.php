<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'transaction_code' => $this->faker->unique()->numberBetween(100000, 999999), // 6 digit unik
            'transaction_desc' => $this->faker->optional()->sentence(),
            'transaction_start' => $this->faker->dateTimeBetween('-1 month', 'now'),
            'transaction_end' => $this->faker->dateTimeBetween('now', '+1 month'),
            'transaction_status' => $this->faker->randomElement([0, 1]),
        ];
    }
}
