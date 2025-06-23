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
        'inventaris_id',
        'kondisi_id',
    ];  
}
