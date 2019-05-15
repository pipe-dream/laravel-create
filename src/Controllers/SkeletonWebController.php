<?php

namespace Ajthinking\Skeleton\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Ajthinking\Skeleton\SkeletonServiceProvider;

class SkeletonWebController extends BaseController
{
    public function index()
    {
        SkeletonServiceProvider::publishAssets();

        return view('skeleton::spa')->with([
            "settings" => [
                "isSandboxed" => env('SKELETON_IS_SANDBOXED', true),
                "revertHistory" => env('SKELETON_REVERT_HISTORY', true),
            ]
        ]);        
    }
}