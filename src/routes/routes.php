<?php

Route::get('/pipe-dream', '\PipeDream\Laravel\Controllers\PipeDreamWebController@index');
Route::get('/pipe-dream/test', function () {
    return \Artisan::call('dump-autoload');
});

Route::prefix('pipe-dream/api')->group(function () {
    Route::post('/build', '\PipeDream\Laravel\Controllers\PipeDreamAPIController@build');
    Route::get('/scripts', '\PipeDream\Laravel\Controllers\PipeDreamAPIController@scripts');
    Route::get('/templates', '\PipeDream\Laravel\Controllers\PipeDreamAPIController@templates');
});
