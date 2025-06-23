<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inventarisd extends Model
{
    protected $table = 'inventarisd';
    protected $primaryKey = 'inventarisd_id';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = [
        'inventarisd_id',
        'inventarisd_code',
        'inventarisd_label',
        'inventarisd_desc',
        'inventarisd_status',
        'inventaris_id',
        'kondisi_id',
    ];

    public function inventaris()
    {
        return $this->belongsTo(Inventaris::class, 'inventaris_id', 'inventaris_id');
    }

    public function kondisi()
    {
        return $this->belongsTo(Kondisi::class, 'kondisi_id', 'kondisi_id');
    }
}
