<?php

namespace Database\Factories;

use Hash;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $roles = ['petugas', 'guru'];
        return [
            'user_email' => $this->faker->unique()->safeEmail(),
            'user_pass' => Hash::make('password'), // password default untuk testing
            'user_fullname' => $this->faker->name(),
            'user_role' => $this->faker->randomElement($roles),
        ];
    }
}
