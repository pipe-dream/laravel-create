<?php

namespace PipeDream\LaravelCreate\Controllers;

use Illuminate\Routing\Controller as BaseController;
use PipeDream\LaravelCreate\LaravelCreateServiceProvider;

class PipeDreamWebController extends BaseController
{
    public function index()
    {
        LaravelCreateServiceProvider::publishAssets();

        return view('pipe-dream::spa')->with([
            'settings' => [
                'isSandboxed' => env('PIPEDREAM_IS_SANDBOXED', false),
                'appName'     => request()->path(),
                'workbench_data' => json_decode("{}") // not implemented
            ],
        ]);
    }
}
