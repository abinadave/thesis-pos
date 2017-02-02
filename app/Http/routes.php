<?php
/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/
Route::group(['middleware' => 'web'], function(){
	Route::get('/', 'UserController@authentication');
	Route::auth();
	Route::get('/home', 'HomeController@index');
	Route::get('api/branch', 'BranchController@fetch');
	Route::delete('api/branch/{id}', 'BranchController@delete');
	Route::post('api/branch', 'BranchController@insert');
	Route::put('api/branch', 'BranchController@update');
	Route::get('api/staff_management', 'FetcherController@staffManagement');
	Route::delete('api/user/{id}', 'UserController@softDelete')->middleware('isAdmin');
	Route::get('api/branch/trashed', 'UserController@getTrashedList')->middleware('isAdmin');
	Route::put('api/user/trashed', 'UserController@restoreUser');
	Route::post('api/user', 'UserController@validateAndSave');
	Route::post('api/category', 'CategoryController@insert')->middleware('isAdmin');
	Route::get('api/category', 'CategoryController@fetch');
	Route::delete('api/category/{id}', 'CategoryController@delete')->middleware('isAdmin');
	Route::put('api/category', 'CategoryController@update')->middleware('isAdmin');
	Route::post('api/item', 'ItemController@insert')->middleware('isAdmin');
	Route::get('api/item', 'ItemController@fetch');
	Route::get('api/item/branch/{id}', 'ItemController@fetchWhereBranchOf');
	Route::get('api/item/category/{id}', 'ItemController@fetchWhereCatOf');
	Route::get('api/product_management', 'FetcherController@productManagement')->middleware('isAdmin');
	Route::delete('api/item/{id}', 'ItemController@delete')->middleware('isAdmin');
	Route::get('api/trashed_product_management', 'FetcherController@trahsedProductManagement')->middleware('isAdmin');
	Route::put('api/item/trashed/restore', 'ItemController@restoreItem')->middleware('isAdmin');
	Route::delete('api/item/trashed/{id}', 'ItemController@permanentlyDelete')->middleware('isAdmin');
	Route::put('api/item', 'ItemController@updateItem')->middleware('isAdmin');
	Route::get('api/branch_management', 'FetcherController@branchManagement')->middleware('isAdmin');
	Route::delete('api/staff/trashed/{id}', 'UserController@deletePermanently')->middleware('isAdmin');
	Route::put('api/staff', 'UserController@updateStaff')->middleware('isAdmin');
	Route::get('api/receiving_form/max_id', 'ReceiveFormController@getMaxId');
	Route::post('api/receiving_form', 'ReceiveFormController@insert')->middleware('isAdmin');
	Route::post('api/receiving_item', 'ReceiveItemController@saveAll')->middleware('isAdmin');
	Route::get('api/receive_item_management', 'FetcherController@receiveItemManagement')->middleware('isAdmin');
	Route::post('api/purchase', 'PurchaseController@insert');
	Route::post('api/purchase_item', 'PurchaseItemController@saveAll');
	Route::get('api/fetch_purchases_staff', 'FetcherController@fetchPurchasesStaff');
	Route::get('api/purchase/date/staff/{date}', 'PurchaseController@fetchByDate');
	Route::get('api/fetch_purchases_admin', 'FetcherController@fetchPurchasesAdmin')->middleware('isAdmin');
	Route::post('api/fetch_purchases_by_branch', 'PurchaseController@fetchByBranch')->middleware('isAdmin');
	Route::post('api/fetch_purchases_by_date', 'PurchaseController@fetchByDatePurchasesAdmin')->middleware('isAdmin');
	Route::post('api/alert_expiration', 'AlertExpirationController@insert')->middleware('isAdmin');
	Route::get('api/fetch_expiration_management', 'FetcherController@fetchExpirationManagement');
	Route::post('api/receiving_form/between_dates', 'ReceiveFormController@filterByDate');
	Route::get('product/generic', 'ItemController@getGenericItems');
	Route::get('product/branded', 'ItemController@getBrandedItems');
	Route::get('item/count/{type}', 'FetcherController@countItemsByBGtype');
	Route::get('log_management', 'FetcherController@logManagement');
});


