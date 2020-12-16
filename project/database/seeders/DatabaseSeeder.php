<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Companies;
use App\Models\Employee;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
          //  var_dump(Companies::factory());
        Companies::factory()
        ->times(10)
        ->create();
        Employee::factory()
        ->times(20)
        ->create();
    }
}