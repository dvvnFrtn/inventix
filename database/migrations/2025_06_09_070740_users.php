<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->string('user_id', 20)->primary();
            $table->string('user_email', 255);
            $table->string('user_pass', 255);
            $table->string('user_fullname', 255);
            $table->string('user_role', 20);
            $table->timestamps();
        });

        DB::table('users')->insert([
            [
                'user_id' => '88bfda0a0a98a4639ed3',
                'user_email' => 'admin@inventix.com',
                'user_pass' => Hash::make('password'),
                'user_fullname' => 'Admin',
                'user_role' => 'admin',
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
