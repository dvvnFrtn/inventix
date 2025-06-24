<?php

namespace App\Http\Controllers\Inventix;

use App\Http\Controllers\Controller;
use App\Http\Resources\TransactionResource;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Response;

class TransactionController extends Controller
{
    public function index()
    {
        $transactions = Transaction::with('user')
            ->with('inventarisd.inventaris')
            ->get();

        return Inertia::render(
            'TransactionPage',
            [
                'transactions' => TransactionResource::collection($transactions),
            ]
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'transaction_desc' => 'nullable|string|max:500',
            'transaction_start' => 'required|date',
            'transaction_end' => 'required|date|after_or_equal:transaction_start',
            'transaction_status' => 'required|in:0,1', // 0: belum kembali, 1: sudah kembali
            'user_id' => 'required|exists:users,user_id',
            'inventarisd_id' => 'required|exists:inventarisd,inventarisd_id',
        ]);

        do {
            $code = random_int(100000, 999999);
        } while (Transaction::where('transaction_code', $code)->exists());

        $transaction = Transaction::create([
            'transaction_code' => $code,
            'transaction_desc' => $validated['transaction_desc'] ?? null,
            'transaction_start' => $validated['transaction_start'],
            'transaction_end' => $validated['transaction_end'],
            'transaction_status' => $validated['transaction_status'],
            'user_id' => $validated['user_id'],
            'inventarisd_id' => $validated['inventarisd_id'],
        ]);

        return redirect()->back()->with('success', 'Transaksi peminjaman berhasil ditambahkan.');
    }
}
