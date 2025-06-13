<?php

use App\Http\Controllers\ClientAdminController;
use App\Http\Controllers\ClientAuthController;
use App\Http\Controllers\ClientGuruController;
use App\Http\Controllers\ClientHomeController;
use App\Http\Controllers\ClientPetugasController;
use App\Http\Controllers\ServerAuthController;
use App\Http\Middleware\AuthAdminMiddleware;
use App\Http\Middleware\AuthGuruMiddleware;
use App\Http\Middleware\AuthPetugasMiddleware;
use Illuminate\Support\Facades\Route;

Route::get('/', [ClientHomeController::class, 'index']);
Route::get('login', [ClientAuthController::class, 'index']);
Route::post('auth', [ServerAuthController::class, 'submit']);

Route::middleware([AuthGuruMiddleware::class])->group(function () {
    Route::get('dashboard-guru', [ClientGuruController::class, 'index']);
});

Route::middleware([AuthPetugasMiddleware::class])->group(function () {
    Route::get('dashboard-petugas', [ClientPetugasController::class, 'index']);
});

Route::middleware([AuthAdminMiddleware::class])->group(function () {
    Route::get('dashboard-admin', [ClientAdminController::class, 'index']);
});

Route::get('s', function() { return session()->all(); });
Route::get('d', function() { session()->flush(); return redirect()->back(); });