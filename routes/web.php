<?php

use App\Http\Controllers\ClientAdminController;
use App\Http\Controllers\ClientAuthController;
use App\Http\Controllers\ClientGuruController;
use App\Http\Controllers\ClientHomeController;
use App\Http\Controllers\ClientPetugasController;
use App\Http\Controllers\Inventix\InventarisController;
use App\Http\Controllers\Inventix\TransactionController;
use App\Http\Controllers\Inventix\UserController;
use App\Http\Controllers\ServerAuthController;
use App\Http\Middleware\AuthAdminMiddleware;
use App\Http\Middleware\AuthGuruMiddleware;
use App\Http\Middleware\AuthMiddleware;
use App\Http\Middleware\AuthPetugasMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::prefix('inventaris')->group(function () {
    Route::get('/', [InventarisController::class, 'index']);
    Route::post('/', [InventarisController::class, 'store']);
    Route::get('/{code}', [InventarisController::class, 'show']);
    Route::put('/{code}', [InventarisController::class, 'update']);
    Route::delete('/{code}', [InventarisController::class, 'destroy']);
    Route::post('/storeUnit', [InventarisController::class, 'storeUnit']);
    Route::delete('/destroyUnit/{id}', [InventarisController::class, 'destroyUnit']);
    Route::put('/updateUnit/{id}', [InventarisController::class, 'updateUnit']);
});

Route::prefix('users')->middleware([AuthMiddleware::class])->group(function () {
    Route::get('/', [UserController::class, 'index']);
    Route::get('/{id}', [UserController::class, 'show']);
    Route::post('/', [UserController::class, 'store']);
    Route::put('/{id}', [UserController::class, 'update']);
    Route::delete('/{id}', [UserController::class, 'destroy']);
});

Route::prefix('transactions')->middleware([AuthMiddleware::class])->group(function () {
    Route::get('/', [TransactionController::class, 'index']);
    Route::post('/', [TransactionController::class, 'store']);
    Route::post('/{id}/return', [TransactionController::class, 'returnTransaction']);
});

Route::get('/dashboard', function () {
    return Inertia::render('DashboardPage');
})->middleware([AuthMiddleware::class]);

Route::get('/auth', function () {
    return Inertia::render('Auth/AuthPage');
});

Route::post('/auth', [ServerAuthController::class, 'submit']);
Route::get('logout', function () {
    session()->flush();
});

Route::get('s', function () {
    return session()->all();
});
Route::get('d', function () {
    session()->flush();
    return redirect()->back();
});