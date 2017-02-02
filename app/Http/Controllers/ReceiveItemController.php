<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\ReceivingItem as ReceivingItem;
class ReceiveItemController extends Controller
{
    public function saveAll(Request $request){
        $itemController = new \App\Http\Controllers\ItemController;
    	$rid = $request->input('rid');
    	$items = $request->input('items');
    	$savedItems = array();
    	foreach ($items as $key => $item) {
    		array_push($savedItems, $this->saveItem($item, $rid, $itemController));
            
    	}
    	return response()->json([
    		'saved_items' => $savedItems
    	]);
    }

    public function saveItemExpiration($item, $rid){
        if(isset($item['expiry_date'])){
            $model = new \App\ItemExpiration;
            $model->product_id = $item['id'];
            $model->expiry_date = $item['expiry_date'];
            $model->rid = $rid;
            $model->save();
        }
    }

    public function saveItem($item, $rid, $itemController){
    	$receivingItem = new ReceivingItem;
    	$receivingItem->rid = $rid;
    	$receivingItem->pid = $item['id'];
    	$receivingItem->qty = $item['qty'];
    	$rs = $receivingItem->save();
        if ($rs) {
            $this->saveItemExpiration($item, $rid);
            $itemController->addStock($item);
            return $receivingItem;
        }
    	
    }
}
