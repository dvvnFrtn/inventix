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
        Schema::create('inventaris', function (Blueprint $table) {
            $table->string('inventaris_id', 20)->primary();
            $table->integer('inventaris_code')->unique(); // 3 digit
            $table->string('inventaris_name', 20);
            $table->string('inventaris_desc', 500)->nullable();
            $table->string('category_id', 20);
            $table->timestamps();

            $table->foreign('category_id')->references('category_id')->on('category');
        });

        DB::table('inventaris')->insert([
            'inventaris_id' => 'p5283e487f67592ce91e',
            'inventaris_code' => 560,          
            'inventaris_name' => 'Kapur Barus',
            'inventaris_desc' => null,
            'category_id' => 'u3718383fe1dddec7e32',  
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('inventaris')->insert([
            'inventaris_id' => '7f23ff50330e2e83c89f',
            'inventaris_code' => 221,          
            'inventaris_name' => 'Proyektor',
            'inventaris_desc' => null,
            'category_id' => 'u3718383fe1dddec7e32',  
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('inventaris')->insert([
            'inventaris_id' => 'ef01db8153b083c132fb',
            'inventaris_code' => 908,          
            'inventaris_name' => 'Sapu',
            'inventaris_desc' => null,
            'category_id' => 'fe8e280726d3139f7541',  
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventaris');
    }
};
