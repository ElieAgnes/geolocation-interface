<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Companies extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'adresse',
        'phone',
        'latitude',
        'longitude'
    ];

    public function employee()
    {
        return $this->hasMany(Employee::class);
    }
    public $timestamps = false;
}
