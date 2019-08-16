<?php

/* GUI */
Route::get('/pipe-dream', '\PipeDream\LaravelCreate\Controllers\PipeDreamWebController@index');

/* API */
Route::prefix('pipe-dream/api')->group(function () {
    Route::post('/build', '\PipeDream\LaravelCreate\Controllers\PipeDreamAPIController@build');
    Route::patch('/save', function() {
        return collect("Save not implemented yet");
    });
});
