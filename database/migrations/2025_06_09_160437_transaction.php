<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transaction', function (Blueprint $table) {
            $table->string('transaction_id', 20)->primary();
            $table->integer('transaction_code')->unique();
            $table->string('transaction_desc', 500)->nullable();
            $table->date('transaction_start');
            $table->date('transaction_end');
            $table->integer('transaction_status'); // 0: belum terkembalikan 1: terkembalikan
            $table->string('user_id', 20);
            $table->string('inventarisd_id', 20);
            $table->timestamps();

            $table->foreign('user_id')->references('user_id')->on('users');
            $table->foreign('inventarisd_id')->references('inventarisd_id')->on('inventarisd');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaction');
    }
};
