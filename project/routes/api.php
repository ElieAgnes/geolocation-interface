<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


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

//Search all company for place markers on map
Route::get('companys', 'companyController@list');

//Search employee by the ID of the company
Route::get('companys/{id}/employees', 'employeController@list');

//Modification info of company
Route::put('companys/{id}', 'companyController@update');

//Delete info of company
Route::delete('companys/{id}', 'companyController@delete');

//Modification info of employee
Route::put('employees/{id}', 'employeController@update');

//Delete info of employee
Route::delete('employees/{id}', 'employeController@delete');
