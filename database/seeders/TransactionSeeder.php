<?php

namespace Database\Seeders;

use App\Models\Inventarisd;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();
        $inventarisds = Inventarisd::all();

        foreach ($users as $user) {
            Transaction::factory()
                ->count(2)
                ->create([
                    'user_id' => $user->user_id,
                    'inventarisd_id' => $inventarisds->random()->inventarisd_id
                ]);
        }
    }
}
