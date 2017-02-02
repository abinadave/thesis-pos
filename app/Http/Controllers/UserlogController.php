<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Userlog as Userlog;
use Illuminate\Support\Facades\Auth;

class UserlogController extends Controller
{
    public function insertActivity($activity){
    	$log = new Userlog;
    	$log->activity = $activity;
    	$log->user_id = Auth::user()->id;
    	$log->save();
    }
}
