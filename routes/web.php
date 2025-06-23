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
use Inertia\Inertia;

Route::get('/auth', function () {
    return Inertia::render('Auth/AuthPage');
});

Route::get('/admin/dashboard', function () {
    return Inertia::render('Admin/DashboardPage');
});
Route::get('/admin/transactions', function () {
    return Inertia::render('Admin/TransactionPage');
});

Route::get('/admin/inventories', function () {
    return Inertia::render('Admin/InventoryPage');
});

Route::get('/', [ClientHomeController::class, 'index']);
Route::get('/login', [ClientAuthController::class, 'index']);
Route::post('auth', [ServerAuthController::class, 'submit']);
Route::get('logout', function () {
    session()->flush();
});

Route::middleware([AuthGuruMiddleware::class])->group(function () {
    Route::get('dashboard-guru', [ClientGuruController::class, 'dashboard']);
    Route::get('guru/daftar-barang', [ClientGuruController::class, 'daftar_barang']);
    Route::get('guru/detail-barang/{slug}', [ClientGuruController::class, 'detail_barang']);
    Route::get('guru/riwayat', [ClientGuruController::class, 'riwayat']);
});

Route::middleware([AuthPetugasMiddleware::class])->group(function () {
    Route::get('dashboard-petugas', [ClientPetugasController::class, 'index']);
});

Route::middleware([AuthAdminMiddleware::class])->group(function () {
    Route::get('dashboard-admin', [ClientAdminController::class, 'index']);
});

Route::get('s', function () {
    return session()->all();
});
Route::get('d', function () {
    session()->flush();
    return redirect()->back();
});

Route::get('dd', [ClientGuruController::class, 'dashboard']);