<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Item extends Model
{
	use SoftDeletes;
    protected $table = 'items';
    protected $primaryKey = 'id';
    protected $dates = ['deleted_at'];
}
