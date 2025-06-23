<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Str;

class Inventaris extends Model
{
    use HasFactory;
    protected $table = 'inventaris';
    protected $primaryKey = 'inventaris_id';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = [
        'inventaris_id',
        'inventaris_code',
        'inventaris_name',
        'inventaris_desc',
        'category_id',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->inventaris_id = (string) Str::uuid();
        });
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'category_id');
    }

    public function inventarisd(): HasMany
    {
        return $this->hasMany(Inventarisd::class, 'inventaris_id');
    }

    public function scopeWithSummary($query)
    {
        return $query->withCount([
            'inventarisd as count_tersedia' => fn($q) => $q->where('inventarisd_status', 'tersedia'),
            'inventarisd as count_terpinjam' => fn($q) => $q->where('inventarisd_status', 'terpinjam'),
            'inventarisd as count_tiada' => fn($q) => $q->where('inventarisd_status', 'tiada'),
        ]);
    }

    public static function getAll()
    {
        return self::with(['category'])
            ->withCount([
                'inventarisd as count_tersedia' => function ($query) {
                    $query->where('inventarisd_status', 'tersedia');
                },
                'inventarisd as count_terpinjam' => function ($query) {
                    $query->where('inventarisd_status', 'terpinjam');
                },
                'inventarisd as count_tiada' => function ($query) {
                    $query->where('inventarisd_status', 'tiada');
                },
            ])
            ->get()
            ->map(function ($item) {
                return [
                    'category_code' => optional($item->category)->category_code,
                    'inventaris_code' => $item->inventaris_code,
                    'category' => optional($item->category)->category_name,
                    'inventaris' => $item->inventaris_name,
                    'count_tersedia' => $item->count_tersedia,
                    'count_terpinjam' => $item->count_terpinjam,
                    'count_tiada' => $item->count_tiada,
                ];
            });
    }

    public static function getDetailByCode($code, $status = null, $kondisi = null)
    {
        $data = self::where('inventaris_code', $code)
            ->with(['category'])
            ->withCount([
                'inventarisd as count_tersedia' => function ($query) {
                    $query->where('inventarisd_status', 'tersedia');
                },
                'inventarisd as count_terpinjam' => function ($query) {
                    $query->where('inventarisd_status', 'terpinjam');
                },
                'inventarisd as count_tiada' => function ($query) {
                    $query->where('inventarisd_status', 'tiada');
                },
            ])
            ->with(['inventarisd.kondisi'])
            ->first();

        if (!$data) {
            return null;
        }

        return [
            'category_code' => optional($data->category)->category_code,
            'inventaris_code' => $data->inventaris_code,
            'category' => optional($data->category)->category_name,
            'inventaris' => $data->inventaris_name,
            'count_tersedia' => $data->count_tersedia,
            'count_terpinjam' => $data->count_terpinjam,
            'count_tiada' => $data->count_tiada,

            'daftar' => $data->inventarisd
                ->when($status !== null, function ($collection) use ($status) {
                    return $collection->filter(function ($item) use ($status) {
                        return $item->inventarisd_status === $status;
                    });
                })
                ->when($kondisi !== null, function ($collection) use ($kondisi) {
                    return $collection->filter(function ($item) use ($kondisi) {
                        return $item->kondisi_id === $kondisi;
                    });
                })
                ->map(function ($item) {
                    return [
                        'code' => $item->inventarisd_code,
                        'label' => $item->inventarisd_label,
                        'desc' => $item->inventarisd_desc,
                        'status' => $item->inventarisd_status,
                        'kondisi_id' => optional($item->kondisi)->kondisi_id,
                        'kondisi' => optional($item->kondisi)->kondisi_name,
                    ];
                }),
        ];
    }

}
