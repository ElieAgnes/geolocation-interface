<?php

namespace App\Http\Controllers;

use App\Models\Companies;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CompaniesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Companies::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Companies  $Companies
     * @return \Illuminate\Http\Response
     */
    public function show(Companies $Companies)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Companies  $Companies
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    { 
        DB::table('companies')
        ->where('id', $id)
        ->update(
            ['name' => $request['name'],
            'adresse' => $request['adresse'],
            'phone' => $request['phone'],
            'latitude' => $request['latitude'],
            'longitude' => $request['longitude'],
            ]);
            
            return response()->json([
                'success' => 'update done'
            ], 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Companies  $Companies
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Companies::find($id)->delete();
        Employee::where('id_company',$id)->delete();
    }
}
