<?php

/* GUI */
Route::get('/pipe-dream', '\PipeDream\LaravelCreate\Controllers\PipeDreamWebController@index');

/* API */
Route::post('pipe-dream/api/build', '\PipeDream\LaravelCreate\Controllers\PipeDreamAPIController@build');
Route::patch('pipe-dream/api/save', '\PipeDream\LaravelCreate\Controllers\PipeDreamAPIController@save');
Route::get('pipe-dream/api/import', '\PipeDream\LaravelCreate\Controllers\PipeDreamAPIController@import');
Route::get('pipe-dream/api/importFromInformationSchema', '\PipeDream\LaravelCreate\Controllers\PipeDreamAPIController@importFromInformationSchema');
