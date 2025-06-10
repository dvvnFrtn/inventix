<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('kondisi', function (Blueprint $table) {
            $table->integer('kondisi_id')->primary();
            $table->string('kondisi_name', 75);
        });

        DB::table('kondisi')->insert([
            'kondisi_id' => 1,
            'kondisi_name' => 'sangat baik',
        ]);

        DB::table('kondisi')->insert([
            'kondisi_id' => 2,
            'kondisi_name' => 'baik',
        ]);

        DB::table('kondisi')->insert([
            'kondisi_id' => 3,
            'kondisi_name' => 'biasa',
        ]);

        DB::table('kondisi')->insert([
            'kondisi_id' => 4,
            'kondisi_name' => 'sedikit cacat',
        ]);

        DB::table('kondisi')->insert([
            'kondisi_id' => 5,
            'kondisi_name' => 'cacat',
        ]);

        DB::table('kondisi')->insert([
            'kondisi_id' => 6,
            'kondisi_name' => 'rusak',
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kondisi');
    }
};
