<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notif extends Model
{
    use HasFactory;
    protected $table = 'notif';
    protected $primaryKey = 'notif_id';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = [
        'notif_id',
        'notif_status',
        'notif_category',
        'notif_content',
        'notif_redirect',
    ];
}
