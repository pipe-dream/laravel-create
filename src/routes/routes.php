<?php

/* GUI */
Route::get('/pipe-dream', '\PipeDream\Laravel\Controllers\PipeDreamWebController@index');

/* API */
Route::prefix('pipe-dream/api')->group(function () {
    Route::post('/build', '\PipeDream\Laravel\Controllers\PipeDreamAPIController@build');
});
