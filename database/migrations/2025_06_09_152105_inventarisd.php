<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('inventarisd', function (Blueprint $table) {
            $table->uuid('inventarisd_id')->primary();
            $table->integer('inventarisd_code')->unique(); // 5 digit
            $table->string('inventarisd_label', 255)->nullable();
            $table->string('inventarisd_desc', 500)->nullable();

            $table->string('inventarisd_status', 50);
            // Status :
            // = tersedia
            // = terpinjam
            // = tiada

            $table->uuid('inventaris_id');
            $table->integer('kondisi_id');

            $table->timestamps();

            $table->foreign('inventaris_id')->references('inventaris_id')->on('inventaris')->cascadeOnDelete();
            $table->foreign('kondisi_id')->references('kondisi_id')->on('kondisi');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventarisd');
    }
};
