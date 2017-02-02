<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use Illuminate\Support\Facades\Auth;

class FetcherController extends Controller
{
	public function logManagement(){
		return response()->json([
			'users' => \App\User::all(),
			'userlogs' => \App\Userlog::orderBy('id','desc')->get()
		]);
	}

	public function countItemsByBGtype($type){
		return response()->json([
			'count' => \App\Item::where('bg_type', $type)->count()
		]);
	}

	public function fetchExpirationManagement(){
		return response()->json([
			'alert_expiration' => \App\AlertExpiration::orderBy('id','desc')->take(1)->get(),
			'item_expirations' => \App\ItemExpiration::orderBy('id','desc')->get(),
			'items' => \App\Item::all(),
			'receiving_items' => \App\ReceivingItem::all(),
			'receiving_forms' => \App\ReceivingForm::all()
		]);
	}

	public function fetchPurchasesAdmin(){
		return response()->json([
			'branches' => \App\Branch::orderBy('name')->get(),
			'items'           => \App\Item::all(),
			'purchase_items' => \App\PurchaseItem::orderBy('id','desc')->get(),
			'purchases'  => \App\Purchase::all(),
			'purchase_forms' => \App\Purchase::all()
		]);
	}

	public function fetchPurchasesStaff(){
		$purchases = \App\Purchase::where('branch', Auth::user()->branch_id)->get();
		$pluckedPurchaseIds = $purchases->pluck('id');
		$purchaseItems = \App\PurchaseItem::whereIn('purchase_id', $pluckedPurchaseIds)->orderBy('id','desc')->get();
		return response()->json([
			'items'           => \App\Item::where('branch', Auth::user()->branch_id)->get(),
			'purchases'  => $purchases,
			'purchase_items' => $purchaseItems
		]);
	}

	public function receiveItemManagement(){
		return response()->json([
			'items'           => \App\Item::all(),
			'receiving_forms' => \App\ReceivingForm::orderBy('id','desc')->get(),
			'receiving_items'  => \App\ReceivingItem::orderBy('id','desc')->get()
		]);
	}

	public function branchManagement(){
		return response()->json([
			'staffs' => \App\User::where('admin', 0)->orderBy('id','desc')->get(),
			'items' => \App\Item::all()
		]);
	}

	public function trahsedProductManagement(){
		return response()->json([
			'branches' => \App\Branch::all(),
			'categories' => \App\Category::all(),
			'items' => \App\Item::onlyTrashed()->get()
		]);
	}

	public function productManagement(){
		return response()->json([
			'branches' => \App\Branch::all(),
			'categories' => \App\Category::all(),
			'items' => \App\Item::orderBy('id','desc')->get()
		]);
	}
    public function staffManagement(){
    	return response()
	     ->json([
	     	'users' => \App\User::where('admin', 0)->orderBy('id','desc')->get(),
	     	'branches' => \App\Branch::all()
	     ]);
    }

}
