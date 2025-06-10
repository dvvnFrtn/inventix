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
        Schema::create('inventarisd', function (Blueprint $table) {
            $table->string('inventarisd_id', 20)->primary();
            $table->integer('inventarisd_code')->unique(); // 5 digit
            $table->string('inventarisd_label', 255)->nullable();
            $table->string('inventarisd_desc', 500)->nullable();

            $table->string('inventarisd_status', 50);
                // Status :
                // = tersedia
                // = terpinjam
                // = tiada

            $table->string('inventaris_id', 20);
            $table->integer('kondisi_id');

            $table->timestamps();

            $table->foreign('inventaris_id')->references('inventaris_id')->on('inventaris');
            $table->foreign('kondisi_id')->references('kondisi_id')->on('kondisi');
        });

        DB::table('inventarisd')->insert([
            'inventarisd_id' => 'a85e684b48cce52ec70c',
            'inventarisd_code' => 70242,
            'inventarisd_label' => 'Kapur tulis Sarjana warna putih 50 batang',
            'inventarisd_desc' => 'Tersisa 20 batang.',
            'inventarisd_status' => 'terpinjam',
            'inventaris_id'  => 'p5283e487f67592ce91e',
            'kondisi_id' => 3,
        ]);

        DB::table('inventarisd')->insert([
            'inventarisd_id' => 'c4825286c587a7694b52',
            'inventarisd_code' => 433032,
            'inventarisd_label' => 'Kapur tulis Sarjana warna putih 50 batang',
            'inventarisd_desc' => null,
            'inventarisd_status' => 'tersedia',
            'inventaris_id'  => 'p5283e487f67592ce91e',
            'kondisi_id' => 1,
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventarisd');
    }
};
