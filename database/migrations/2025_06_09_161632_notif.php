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
        Schema::create('notif', function (Blueprint $table) {
            $table->string('notif_id', 20)->primary();
            // TODO: relation with users
            $table->integer('notif_status');
            // 
            // 1 = terlihat
            // 0 = belum
            $table->string('notif_category', 2);
            // 
            // a1 = announcement
            // b1 = sukses meminjam
            // b2 = h-1 hari
            // c1 = deadline
            // d1 = h+1 
            // d2 = h+1 minggu
            // d3 = h+ kelipatan 1 minggu
            $table->string('notif_content', 300);
            $table->string('notif_redirect', 255);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notif');
    }
};
