<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('category', [App\Http\Controllers\Home\HomeCategoriesController::class,'index']);
Route::get('category/{id}', [App\Http\Controllers\Home\HomeCategoriesController::class,'show']);
Route::get('category/product/{id}', [App\Http\Controllers\Home\HomeCategoriesController::class,'search']);


Route::group([
    'middleware' => 'api',
    'prefix' => 'users'
], function ($router) {
    Route::post('/login', [App\Http\Controllers\Home\HomeAuthController::class, 'login']);
    Route::post('/register', [App\Http\Controllers\Home\HomeAuthController::class, 'register']);
    Route::get('/logout', [App\Http\Controllers\Home\HomeAuthController::class, 'logout']);
    Route::post('/refresh', [App\Http\Controllers\Home\HomeAuthController::class, 'refresh']);
    Route::get('/user-profile', [App\Http\Controllers\Home\HomeAuthController::class, 'userProfile']);
    Route::get('/get-all', [App\Http\Controllers\Home\HomeAuthController::class, 'getAll']);


});


Route::group([
    'middleware' => 'api',
    'prefix' => 'admin'
], function ($router) {
    Route::post('/login', [App\Http\Controllers\Admin\AuthController::class, 'login']);
    Route::post('/register', [App\Http\Controllers\Admin\AuthController::class, 'register']);
    Route::post('/logout', [App\Http\Controllers\Admin\AuthController::class, 'logout']);
    Route::post('/refresh', [App\Http\Controllers\Admin\AuthController::class, 'refresh']);
    Route::get('/user-profile', [App\Http\Controllers\Admin\AuthController::class, 'userProfile']); 
    Route::resource('products', App\Http\Controllers\Admin\ProductsController::class);

   
});




