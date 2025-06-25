<?php

namespace App\Http\Controllers\Inventix;

use App\Http\Controllers\Controller;
use App\Http\Resources\TransactionResource;
use App\Models\Inventarisd;
use App\Models\Transaction;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Response;

class TransactionController extends Controller
{
    public function index()
    {
        $auth = session()->get('user');
        $role = $auth['user_role'];

        $query = Transaction::with('user')
            ->with('inventarisd.inventaris');

        if ($role === 'guru') {
            $query->where('user_id', $auth['user_id']);
        }

        $transactions = $query->get();

        return Inertia::render(
            'TransactionPage',
            [
                'transactions' => TransactionResource::collection($transactions),
            ],
        );
    }

    public function show(string $id)
    {
        $transaction = Transaction::where('transaction_id', $id)
            ->with('user')
            ->with('inventarisd.inventaris');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'transaction_desc' => 'nullable|string|max:500',
            'transaction_start' => 'required|date',
            'transaction_end' => 'required|date|after_or_equal:transaction_start',
            'user_id' => 'required|exists:users,user_id',
            'inventarisd_id' => 'required|exists:inventarisd,inventarisd_id',
        ]);

        $peminjam = User::where('user_id', $validated['user_id'])->first();

        if ($peminjam->user_role !== 'guru') {
            return redirect()->back()->with('error', 'Peminjam harus user dengan tipe role guru');
        }

        do {
            $code = random_int(100000, 999999);
        } while (Transaction::where('transaction_code', $code)->exists());

        $validated['transaction_start'] = Carbon::parse($validated['transaction_start'])->format('Y-m-d');
        $validated['transaction_end'] = Carbon::parse($validated['transaction_end'])->format('Y-m-d');

        $transaction = Transaction::create([
            'transaction_code' => $code,
            'transaction_desc' => $validated['transaction_desc'] ?? null,
            'transaction_start' => $validated['transaction_start'],
            'transaction_end' => $validated['transaction_end'],
            'transaction_status' => 0,
            'user_id' => $validated['user_id'],
            'inventarisd_id' => $validated['inventarisd_id'],
        ]);

        Inventarisd::where('inventarisd_id', $validated['inventarisd_id'])
            ->update(
                [
                    'inventarisd_status' => 'terpinjam',
                ],
            );

        return redirect()->back()->with('success', 'Transaksi peminjaman berhasil ditambahkan.');
    }

    public function returnTransaction(string $id)
    {
        Transaction::where('transaction_id', $id)
            ->update([
                'transaction_status' => 1,
            ]);

        return redirect()->back()->with('success', 'Transaksi peminjaman berhasil dikembalikan.');
    }
}
