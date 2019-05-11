<?php 

Route::view('/skeleton', 'skeleton::spa',[
    // "skeleton" => [
    //     "app.css" => file_get_contents(__DIR__ . "/../public/css/app.css"),
    //     "app.js" => file_get_contents(__DIR__ . "/../public/js/app.js"),
    // ]
]);

Route::prefix('skeleton/api')->group(function () {
    Route::get('/templates', '\Ajthinking\Skeleton\Controllers\SkeletonAPIController@templates');
    Route::post('/build',    '\Ajthinking\Skeleton\Controllers\SkeletonAPIController@build');
});