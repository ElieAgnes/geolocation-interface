<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'first_name',
        'adresse',
        'phone',
        'company_id',
    ];

    public function company()
    {
        return $this->belongsTo(Companies::class);
    }

    public $timestamps = false;
}
