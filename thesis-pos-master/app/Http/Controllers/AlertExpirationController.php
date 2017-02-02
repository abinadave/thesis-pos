<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\AlertExpiration as AlertExpiration;
class AlertExpirationController extends Controller
{
    public function insert(Request $request){
    	$this->validate($request, [
	        'days' => 'required'
	    ]);
    	$alert = new AlertExpiration;
    	$alert->days = $request->input('days');
    	$alert->save();
    	return $alert;
    }
}
