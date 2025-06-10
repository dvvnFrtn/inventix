<?php

use App\Http\Controllers\ClientAuthController;
use App\Http\Controllers\ClientGuruController;
use App\Http\Controllers\ClientHomeController;
use App\Http\Controllers\ServerAuthController;
use App\Http\Middleware\AuthGuruMiddleware;
use Illuminate\Support\Facades\Route;

Route::get('/', [ClientHomeController::class, 'index']);
Route::get('login', [ClientAuthController::class, 'index']);
Route::post('auth', [ServerAuthController::class, 'submit']);

Route::middleware([AuthGuruMiddleware::class])->group(function () {
    Route::get('dashboard-guru', [ClientGuruController::class, 'index']);
});