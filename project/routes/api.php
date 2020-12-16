<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CompaniesController;
use App\Http\Controllers\EmployeeController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//The syntaxe was be change since 8.0

//Search all companies for place markers on map ✅
Route::get('companies', [CompaniesController::class, 'index']);

//Search employee by the ID of the company  ✅
Route::get('companies/{id}/employees', [EmployeeController::class, 'show']);

//Modification info of company
Route::put('companies/{id}', [CompaniesController::class, 'update']);

//Delete info of company ✅
Route::delete('companies/{id}', [CompaniesController::class, 'destroy']);

//Modification info of employee
Route::put('employees/{id}', [EmployeeController::class, 'update']);

//Delete info of employee ✅
Route::delete('employees/{id}', [EmployeeController::class, 'destroy']);
