<?php

namespace App\Http\Controllers;

use App\Models\Inventaris;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ClientGuruController extends Controller
{
    protected $user;

    public function __construct()
    {
        $this->user = session()->get('user');
    }

    public function dashboard()
    {
        $summary = [
            'total_barang_dipinjam' => Transaction::where('user_id', $this->user['user_id'])->count(),
            'total_barang_belum_dikembalikan' => Transaction::where('user_id', $this->user['user_id'])->where('transaction_end', '<', Carbon::now())->where('transaction_status', 0)->count(),
        ];
        dd($summary);
    }

    public function daftar_barang()
    {
        $daftar_barang = Inventaris::getAll();
        dd($daftar_barang);
    }

    public function detail_barang($code)
    {
        $detail_barang = Inventaris::getDetailByCode($code, 'terpinjam');
        dd($detail_barang);
    }
}
