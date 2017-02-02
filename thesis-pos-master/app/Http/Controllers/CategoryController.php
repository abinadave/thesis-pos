<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Category as Category;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{
    private function insertLog($activity){
        $logController = new \App\Http\Controllers\UserlogController;
        $logController->insertActivity($activity);
    }
    public function update(Request $request){
        $this->validate($request, [
            'name' => 'required|unique:categories|min:3|max:255'
        ]);

        $model = Category::findOrFail($request->input('cat_id'));
        $model->name = $request->input('name');
        $this->insertLog('Category was updated to: '. $model->name . ', with Category ID of: ' . $request->input('cat_id'));
        $rs = $model->save();

        return response()->json(['updated' => $rs]);
    }

    public function delete($id){
        $model = Category::findOrFail($id);
        $rs = $model->delete();
        $this->insertLog('Category was deleted with an ID of: ' . $id);
        return response()->json(['deleted' => $rs]);
    }

	public function fetch(){
		return Category::orderBy('id','desc')->get();
	}

    public function insert(Request $request){
    	$this->validate($request, [
    		'name' => 'required|unique:categories|min:3|max:255'
    	]);
    	$category = new Category;
    	$category->name = $request->input('name');
    	$rs = $category->save();
        if ($rs) {
            $logController = new \App\Http\Controllers\UserlogController;
            $logController->insertActivity('New Item Category was added with name of ' . $category->name);
        }
    	return $category;
    }
}
