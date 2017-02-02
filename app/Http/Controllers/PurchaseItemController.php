<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\PurchaseItem as PurchaseItem;

class PurchaseItemController extends Controller
{
    private function insertLog($activity){
        $logController = new \App\Http\Controllers\UserlogController;
        $logController->insertActivity($activity);
    }

    public function saveAll(Request $request){
    	$items = $request->input('items');
    	$savedItems = array();
    	foreach ($items as $key => $item) {
    		$pi = new PurchaseItem;
    		$pi->purchase_id = $request->input('purchase_id');
    		$pi->product_id = $item['id'];
    		$pi->qty = $item['qty'];
            $pi->old_price = $item['selling_price'];
    		$rs = $pi->save();
            if ($rs) {
                $this->deductItem($item);
               array_push($savedItems, $pi);
            }
    	}
    	return $savedItems;
    }

    public function deductItem($pi){
        $totalBalance = $pi['running_balance'] - $pi['qty'];
        $item = \App\Item::findOrFail($pi['id']);
        $this->insertLog('Item was purchased, qty: ' . $pi['qty']);
        $item->running_balance = $totalBalance;
        $item->save();
    }
}
