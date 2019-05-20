<?php 

Route::get('/skeleton', '\Ajthinking\Skeleton\Controllers\SkeletonWebController@index');

Route::prefix('skeleton/api')->group(function () {
    Route::post('/build',    '\Ajthinking\Skeleton\Controllers\SkeletonAPIController@build');
    Route::get('/scripts', '\Ajthinking\Skeleton\Controllers\SkeletonAPIController@scripts');
    Route::get('/templates', '\Ajthinking\Skeleton\Controllers\SkeletonAPIController@templates');
    
});