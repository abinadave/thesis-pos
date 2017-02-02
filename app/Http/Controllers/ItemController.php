<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use App\Item as Item;
use Illuminate\Support\Facades\Auth;

class ItemController extends Controller
{
    private function insertLog($activity){
        $logController = new \App\Http\Controllers\UserlogController;
        $logController->insertActivity($activity);
    }
    public function getBrandedItems(){
        return response()->json([
            'categories'    => \App\Category::orderBy('name','asc')->get(),
            'branches'      => \App\Branch::all(),
            'branded_items' => \App\Item::where('bg_type', 'branded')->orderBy('id','desc')->get()
        ]);
    }

    public function getGenericItems(){
        return response()->json([
            'categories'    => \App\Category::orderBy('name','asc')->get(),
            'branches'      => \App\Branch::all(),
            'generic_items' => \App\Item::where('bg_type','generic')->orderBy('id','desc')->get()
        ]);
    }

    public function addStock($model){
        $item = Item::findOrFail($model['id']);
        $newQty = $item->running_balance + $model['qty'];
        $item->running_balance = $newQty;
        $this->insertLog('Item: ' . $model['name'] . ' added some stocks: ' . $model['qty']);
        $item->save();
    }

    public function updateItem(Request $request){
        $item = Item::findOrFail($request->input('id'));
        $item->name = $request->input('name');
        $item->branch = $request->input('branch');
        $item->category = $request->input('category');
        $item->purchase_price = $request->input('purchase_price');
        $item->selling_price = $request->input('selling_price');
        $item->reorder_point = $request->input('reorder_point');
        $item->additional_description = $request->input('additional_description');
        $rs = $item->save();
        if($rs){
            $this->insertLog('Product was updated/edited with ITEM ID: ' . $item->id);
        }
        return response()->json([
            'updated' => $rs
        ]);
    }

    public function permanentlyDelete($id){
        $rs = Item::onlyTrashed()
                ->where('id', $id)
                ->forceDelete();
        if($rs){
            $this->insertLog('Product was permanently removed with ITEM ID: ' . $id);
        }
        return response()->json([
            'destroyed' => $rs
        ]);
    }

    public function restoreItem(Request $request){
        $id = $request->input('id');
        $rs = Item::onlyTrashed()
                ->where('id', $id)
                ->restore();
        if($rs){
            $this->insertLog('Product was RESTORED from the TRASH LIST with ITEM ID: ' . $id);
        }
        return response()->json([
            'restored' => $rs
        ]);
    }

    public function delete($id){
        $item = Item::findOrFail($id);
        $this->insertLog('Product was moved to TRASHED list with ITEM ID: ' . $id);
        return response()->json([
            'deleted' => $item->delete()
        ]);
    }

    public function fetchWhereCatOf($cid){
        if (Auth::user()->admin) {
            if ($cid == 0) {
                return $this->fetch();
            }else {
                return Item::where('category', $cid)->get();       
            }
        }else {
            if ($cid == 0) {
                return Item::where('branch', Auth::user()->branch_id)->orderBy('id', 'desc')->get();
            }else {
                return Item::where('branch', Auth::user()->branch_id)->where('category', $cid)->get();       
            }
        }
        
    }

    public function fetchWhereBranchOf($bid){
        if ($bid == 0) {
            return $this->fetch();
        }else {
            return Item::where('branch', $bid)->get();            
        }
    }

    public function fetch(){
        if (Auth::user()->admin) {
            return Item::orderBy('id','desc')->get();
        }else {
            return Item::where('branch', Auth::user()->branch_id)->get();
        }
    }

    public function insert(Request $request){
    	$this->validate($request, [
    		'name'           => 'required|unique:items',
    		'category'       => 'required|numeric',
            'branch'         => 'required|numeric',
    		'purchase_price' => 'required|numeric',
    		'selling_price'  => 'required|numeric',
    		'reorder_point'  => 'required|numeric',
            'unit'           => 'required',
            'bg_type'        => 'required'
    	]);
    	return $this->thenSave($request);
    }

    private function thenSave($request){
    	$item = new Item;
    	$item->name = $request->input('name');
    	$item->category = $request->input('category');
    	$item->purchase_price = $request->input('purchase_price');
    	$item->selling_price = $request->input('selling_price');
    	$item->reorder_point = $request->input('reorder_point');
        $item->unit = $request->input('unit');
    	$item->additional_description = $request->input('additional_description');
    	$item->branch = $request->input('branch');
        $item->bg_type = $request->input('bg_type');
    	$rs = $item->save();
        if ($rs) {
            $this->insertLog('New item was added with ITEM NAME: ' . $item->name . ' to BRANCH: ' . $item->branch . ' and CATEGORY: ' . $item->category);
        }
    	return $item;
    }
}
