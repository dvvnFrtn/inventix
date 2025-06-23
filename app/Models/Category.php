<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Str;

class Category extends Model
{
    use HasFactory;
    protected $table = 'category';
    protected $primaryKey = 'category_id';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = [
        'category_id',
        'category_code',
        'category_name',
        'category_desc',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->category_id = (string) Str::uuid();
        });
    }
}
