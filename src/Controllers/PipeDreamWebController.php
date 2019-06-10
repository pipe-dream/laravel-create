<?php

namespace PipeDream\Laravel\Controllers;

use Illuminate\Routing\Controller as BaseController;
use PipeDream\Laravel\PipeDreamServiceProvider;

class PipeDreamWebController extends BaseController
{
    public function index()
    {
        PipeDreamServiceProvider::publishAssets();

        return view('pipe-dream::spa')->with([
            'settings' => [
                'isSandboxed' => env('PIPEDREAM_IS_SANDBOXED', false),
                'appName'     => request()->path(),
            ],
        ]);
    }
}
