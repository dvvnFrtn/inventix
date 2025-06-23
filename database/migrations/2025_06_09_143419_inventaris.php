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
        Schema::create('inventaris', function (Blueprint $table) {
            $table->uuid('inventaris_id')->primary();
            $table->integer('inventaris_code')->unique(); // 3 digit
            $table->string('inventaris_name', 255);
            $table->string('inventaris_desc', 500)->nullable();
            $table->uuid('category_id');
            $table->timestamps();

            $table->foreign('category_id')->references('category_id')->on('category');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventaris');
    }
};
