<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Branch as Branch;
use DB;

class BranchController extends Controller
{
	private function insertLog($activity){
        $logController = new \App\Http\Controllers\UserlogController;
        $logController->insertActivity($activity);
    }
    
	public function update(Request $request){
		$branch = Branch::findOrFail($request->input('id'));
		$branch->name = $request->input('name');
		$branch->code = $request->input('code');
		$rs = $branch->save();
		if($rs){
			$this->insertLog('Branch was edited, Branch name: ' . $branch->name . ', Branch code: ' . $branch->code);
		}
		return response()->json([
			'updated' => $rs
		]);
	}

	public function delete($id){
		$branch = Branch::findOrFail($id);
		$rs = $branch->delete();
		if($rs){
			$this->insertLog('Branch was deleted permanently: ' . $branch->name . ', Branch code: ' . $branch->code);
		}
		return response()->json([
			'deleted' => $rs
		]);
	}

	public function fetch(){
		return Branch::orderBy('id','desc')->get();
	}

    public function insert(Request $request){
    	$this->validate($request, [
	        'name' => 'required|unique:branches|max:255|min:3',
	        'code' => 'required|unique:branches|max:255|min:3'
	    ]);
    	$branch = new Branch;
    	$branch->name = $request->input('name');
    	$branch->code = $request->input('code');
    	$rs = $branch->save();
    	if ($rs) {
    		$this->insertLog('New branch was added, Branch code: ' . $branch->code . ',  Branch name: ' .$branch->name);
    	}
    	return $branch;
    }
}
