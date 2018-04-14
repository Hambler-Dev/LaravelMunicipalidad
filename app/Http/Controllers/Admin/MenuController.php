<?php

namespace Municipalidad\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Municipalidad\Http\Controllers\Controller;
use Municipalidad\Menu;
use Illuminate\Support\Facades\Redirect;
use Municipalidad\Http\Requests\MenuFormRequest;
use DB;

class MenuController extends Controller{
    
    public function __construct(){

    }

    public function index(Request $request){
        if($request){
            $query = trim($request->get('searchText'));
            $menu = DB::table('tb_menu')->where('tb_menu_name','%','%'.$query.'%')
            ->paginate(7);
            return view('admin.municipalidad.index',['menu'=>$menu,'searchText'=>$query]);
        }
    }

    public function create(){
        return view('admin.municipalidad.create');
    }

    public function store(){
        
    }

    public function show(){
        
    }

    public function edit(){
        
    }

    public function update(){
        
    }

    public function destroy(){
        
    }
}
