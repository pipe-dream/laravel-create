<?php

/* GUI */
Route::get('/pipe-dream', '\PipeDream\LaravelCreate\Controllers\PipeDreamWebController@index');

/* API */
Route::post('pipe-dream/api/build', '\PipeDream\LaravelCreate\Controllers\PipeDreamAPIController@build');
Route::patch('pipe-dream/api/save', '\PipeDream\LaravelCreate\Controllers\PipeDreamAPIController@save');
