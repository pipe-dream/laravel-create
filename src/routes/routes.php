<?php 

Route::get('/skeleton', '\Ajthinking\Skeleton\Controllers\SkeletonWebController@index');

Route::prefix('skeleton/api')->group(function () {
    Route::get('/templates', '\Ajthinking\Skeleton\Controllers\SkeletonAPIController@templates');
    Route::post('/build',    '\Ajthinking\Skeleton\Controllers\SkeletonAPIController@build');
});