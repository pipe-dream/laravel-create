<?php 

Route::get('/skeleton', function() {
    \Ajthinking\Skeleton\SkeletonServiceProvider::publishAssets();
    return view('skeleton::spa')->with([
        "settings" => [
            "isSandboxed" => true
        ]
    ]);
});

Route::prefix('skeleton/api')->group(function () {
    Route::get('/templates', '\Ajthinking\Skeleton\Controllers\SkeletonAPIController@templates');
    Route::post('/build',    '\Ajthinking\Skeleton\Controllers\SkeletonAPIController@build');
});