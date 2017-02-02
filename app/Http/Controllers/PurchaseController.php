<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Purchase as Purchase;
use Illuminate\Support\Facades\Auth;

class PurchaseController extends Controller
{
	private function insertLog($activity){
        $logController = new \App\Http\Controllers\UserlogController;
        $logController->insertActivity($activity);
    }

	public function fetchByDatePurchasesAdmin(Request $request){
		/* on admin can access this route */
		$date = $request->input('date');
		$branch = $request->input('branch');
		$purchases = ($branch > 0) ? Purchase::where('branch', $branch)->where('date', 'like', '%'. $date . '%')->get() : Purchase::where('date', 'like', '%'. $date . '%')->get();
		$purchaseIds = $purchases->pluck('id');
		$purchaseItems = \App\PurchaseItem::whereIn('purchase_id', $purchaseIds)->orderBy('id','desc')->get();
		return response()->json([
			'purchases' => $purchases,
			'purchase_items' => $purchaseItems
		]);
	}

	public function fetchByBranch(Request $request){
		$branch= $request->input('id'); 
		$date = $request->input('date');
		$purchases = array();
		if ($date == '0') {
			/*Invalid date */
			$purchases = Purchase::where('branch', $branch)->get();
		}else {
			/*valid date */
			$purchases = Purchase::where('branch', $branch)->where('date', 'like', '%'. $date . '%')->get();
		}
		$purchaseIds = $purchases->pluck('id');
		$purchaseItems = \App\PurchaseItem::whereIn('purchase_id', $purchaseIds)->orderBy('id','desc')->get();
    	return response()->json([
    		'purchases'      => $purchases,
    		'purchase_items' => $purchaseItems,
    		'date' => $date,
    		'branch' => $branch
    	]);
    }
	public function fetchByDate($date){
		$purchases = Purchase::where('date', 'like', '%'.$date.'%')->where('branch', Auth::user()->branch_id)->get();
		$purchaseIds = $purchases->pluck('id');
		return response()->json([
			'purchases' => $purchases,
			'purchase_items' => \App\PurchaseItem::whereIn('purchase_id', $purchaseIds)->orderBy('id','desc')->get()
		]);
	}
    public function insert(Request $request){
    	$this->validate($request, [
	        'amount_received' => 'required|numeric'
	    ]);
	    $purchase = new Purchase;
	    $purchase->date = $request->input('date');
	    $purchase->amount_received = $request->input('amount_received');
	    $purchase->staff = Auth::user()->id;
	    $purchase->branch = Auth::user()->branch_id;
	    $rs = $purchase->save();
	    if($rs){
	    	$this->insertLog('New purchase was added, AMOUNT_RECEIVED: ' . $request->input('amount_received') . ', DATE: ' . $purchase->date . ', BRANCH ID: ' . $purchase->branch);
	    }
	    return $purchase;
    }

}
