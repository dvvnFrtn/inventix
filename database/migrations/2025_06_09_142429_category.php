<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('category', function (Blueprint $table) {
            $table->string('category_id', 20)->primary();
            $table->integer('category_code')->unique(); // 3 digit
            $table->string('category_name', 255);
            $table->string('category_desc', 500)->nullable();
            $table->timestamps();
        });

        DB::table('category')->insert([
            'category_id' => '24fcfd4b1b7530e3853c',            
            'category_code' => 111,
            'category_name' => 'Tidak ada',
            'category_desc' => 'Inventaris-inventaris yang tidak berkategori.',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('category')->insert([
            'category_id' => 'fe8e280726d3139f7541',
            'category_code' => 319,
            'category_name' => 'Kebersihan',
            'category_desc' => 'Inventaris yang menunjang kebersihan.',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('category')->insert([
            'category_id' => 'u3718383fe1dddec7e32',            
            'category_code' => 649,
            'category_name' => 'Kelas',
            'category_desc' => 'Inventaris yang menunjang kegiatan belajar-mengajar.',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('category');
    }
};
