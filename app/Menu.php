<?php

namespace Municipalidad;

use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    protected $table = 'tb_menu';
    protected $primaryKey = 'tb_menu_id';
    public  $timestamps = false;

    protected $fillable = [
        'tb_menu_name',
        'tb_menu_ubica'
    ];

    protected $guarded =[];
}
