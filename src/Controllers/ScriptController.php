<?php

namespace Ajthinking\Skeleton\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Artisan;

class ScriptController extends BaseController
{
    public function __construct()
    {
        $this->args = json_decode(request()->getContent());
    }

    public function migrateFreshAndSeed() {
        Artisan::call('migrate:fresh --seed');
    }
}