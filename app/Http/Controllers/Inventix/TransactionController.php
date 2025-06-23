<?php

namespace App\Http\Controllers\Inventix;

use App\Http\Controllers\Controller;
use App\Http\Resources\TransactionResource;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Response;

class TransactionController extends Controller
{
    public function index()
    {
        $transactions = Transaction::with('user')
            ->with('inventarisd.inventaris')
            ->get();

        return Response::json(
            [
                'transactions' => TransactionResource::collection($transactions),
            ]
        );
    }
}
