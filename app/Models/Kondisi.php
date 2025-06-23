<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kondisi extends Model
{
    use HasFactory;
    protected $table = 'kondisi';
    protected $primaryKey = 'kondisi_id';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = [
        'kondisi_id',
        'kondisi_name',
    ];
}
