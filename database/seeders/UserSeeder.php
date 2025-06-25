<?php

namespace Database\Seeders;

use App\Models\User;
use Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->count(10)->create();
        User::create(
            [
                'user_email' => 'achemd@inventix.com',
                'user_pass' => Hash::make('password'),
                'user_fullname' => 'Achemd Hibatillah',
                'user_role' => 'admin',
            ],
        );
    }
}
