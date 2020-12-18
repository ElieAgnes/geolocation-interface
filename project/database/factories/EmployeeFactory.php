<?php

namespace Database\Factories;

use App\Models\Companies;
use App\Models\Employee;
use Illuminate\Database\Eloquent\Factories\Factory;

class EmployeeFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Employee::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name(),
            'first_name' => $this->faker->name(),
            'adresse' => $this->faker->address(),
            'phone' => $this->faker->phoneNumber(),
            'company_id'=> Companies::all('id')->random()
        ];
    }
}
