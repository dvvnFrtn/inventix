<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $table = 'transaction';
    protected $primaryKey = 'transaction_id';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = [
        'transaction_id',
        'transaction_code',
        'transaction_desc',
        'transaction_start',
        'transaction_end',
        'transaction_status',
        'user_id',
        'inventarisd_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    public function inventarisd()
    {
        return $this->belongsTo(Inventarisd::class, 'inventarisd_id', 'inventarisd_id');
    }

    public static function getAllRiwayatByUser($user_id, $status = null)
    {
        $query = self::where('user_id', $user_id)
            ->orderBy('created_at', 'desc')
            ->with(['user', 'inventarisd.inventaris.category']);
    
        // Sub-menu filter
        if ($status === 'sedang') {
            // Barang belum melewati batas waktu
            $query->where('transaction_status', 0)
                  ->where('transaction_end', '>=', Carbon::now());
        } elseif ($status === 'terlambat') {
            // Barang melewati batas waktu
            $query->where('transaction_status', 0)
                  ->where('transaction_end', '<', Carbon::now());
        } elseif ($status === 'selesai') {
            // Barang sudah dikembalikan
            $query->where('transaction_status', 1);
        }
    
        return $query->get()->map(function ($item) {
            return [
                'code' => $item->transaction_code,
                'description' => $item->transaction_desc,
                'start' => $item->transaction_start,
                'end' => $item->transaction_end,
                'status' => $item->transaction_status,
                'due' => self::checkDue($item->transaction_end),
                'barang' => [
                    'category_code' => optional($item->inventarisd->inventaris->category)->category_code,
                    'category_name' => optional($item->inventarisd->inventaris->category)->category_name,
                    'inventaris_code' => optional($item->inventarisd->inventaris)->inventaris_code,
                    'inventaris_name' => optional($item->inventarisd->inventaris)->inventaris_name,
                    'inventarisd_code' => optional($item->inventarisd)->inventarisd_code,
                    'inventarisd_label' => optional($item->inventarisd)->inventarisd_label,
                ]
            ];
        });
    }
    

    private static function checkDue($transaction_end)
    {
        $now = Carbon::now();
        $end = Carbon::parse($transaction_end);
    
        return [
            'status' => $now->greaterThan($end),
            'range' => $now->diffInMinutes($end)
        ];
    }    
}
