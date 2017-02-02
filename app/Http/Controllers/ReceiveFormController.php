<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\ReceivingForm as ReceivingForm;
use DB;
use Illuminate\Support\Facades\Auth;

class ReceiveFormController extends Controller
{
    public function filterByDate(Request $request){
        $date_from = $request->input('date_from');
        $date_to = $request->input('date_to');
        return ReceivingForm::whereBetween('date', [$date_from, $date_to])->orderBy('id','DESC')->get();
    }
    public function getMaxId(){
    	$rows = DB::table('receiving_forms')->count();
    	$maxId = 0;
    	if ($rows > 0) {
    		$maxId = DB::table('receiving_forms')->max('id');
    	}else {
    		$maxId = 0;
    	}
        ++$maxId;
    	return response()->json([
            'max_id' => $maxId
        ]);
    }
    public function insert(Request $request){
        $this->validate($request, [
            'supplier'     => 'required',
            'verified_by'  => 'required',
            'date'         => 'required'
        ]);
        return $this->thenSave($request);
    }
    private function thenSave($request){
        $form = new ReceivingForm;
        $form->date = $request->input('date');
        $form->supplier = $request->input('supplier');
        $form->verified_by = $request->input('verified_by');
        $form->person = Auth::user()->id;
        $form->save();
        return $form;
    }

}
