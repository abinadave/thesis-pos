<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\User as User;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    private function insertLog($activity){
        $logController = new \App\Http\Controllers\UserlogController;
        $logController->insertActivity($activity);
    }
    public function authentication() {
        if (Auth::guest()) {
            return redirect('login');
        }elseif(!Auth::guest() && Auth::user()->admin) {
            return view('admin');
        }else {
            $branch = $this->getBranch();
            return view('staff', 
                [
                    'branch_name' => $branch['name']
                ]
            );
        }
    }
    public function getBranch(){
        $model = \App\Branch::findOrFail(Auth::user()->branch_id);
        return $model;
    }
    public function updateStaff(Request $request)
    {
        $this->validate($request, [
            'name'      => 'required|max:100|min:4',
            'branch_id' => 'required',
            'email'     => 'email|required'
        ]);
        $id = $request->input('id');
        $name = $request->input('name');
        $email = $request->input('email');
        $branch = $request->input('branch_id');
        $rs = User::where('id', $id)->update([
            'name' => $name,
            'email' => $email,
            'branch_id' => $branch
        ]);
        return response()->json([
            'updated' => $rs
        ]);
            
    }
    public function deletePermanently($id)
    {
        $rs = User::onlyTrashed()
                ->where('id', $id)
                ->forceDelete();
        if($rs){ 
            $this->insertLog('Staff was deleted permanently with USER ID: ' . $id);
        }
        return response()->json([
            'destroyed' => $rs
        ]);
    }
    public function restoreUser(Request $request){
        $id = $request->input('id');
        $rs = User::onlyTrashed()
                ->where('id', $id)
                ->restore();
        return response()->json([
            'restored' => $rs
        ]);        
    }
    public function getTrashedList(){
        return response()->json([
            'branches' => \App\Branch::all(),
            'trashed'  => User::onlyTrashed()->get()
        ]);
    }
    public function softDelete($uid){
        $user = User::findOrFail($uid);
        $rs = $user->delete();
        if($rs){ 
            $this->insertLog('Staff was moved to TRASHED list, with USER ID: ' . $uid);
        }
        return response()->json([
                'deleted' => $rs
        ]);   
    }
    public function validateAndSave(Request $request){
    	$this->validate($request, [
	        'name'      => 'required|unique:users|max:100|min:4',
	        'branch_id' => 'required',
	        'email'     => 'email|required|unique:users',
	        'password'  => 'required|max:100|min:4|confirmed'
	    ]);
	    return $this->thenSave($request);
    }
    public function thenSave($request){
    	$staff            = new User;
    	$staff->branch_id = $request->input('branch_id');
    	$staff->name      = $request->input('name');
    	$staff->email     = $request->input('email');
    	$staff->password  = bcrypt($request->input('password'));
    	$rs = $staff->save();
        if ($rs) { $this->insertLog('New staff was added with name of ' . $staff->name); }
    	return $staff;
    }
}
