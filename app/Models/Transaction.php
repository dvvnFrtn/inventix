<?php

namespace App\Models;

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
}
