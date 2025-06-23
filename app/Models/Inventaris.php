<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inventaris extends Model
{
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
}
