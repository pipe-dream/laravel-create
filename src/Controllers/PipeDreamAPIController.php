<?php

namespace PipeDream\LaravelCreate\Controllers;

use Artisan;
use File;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use PipeDream\LaravelCreate\ProjectFileManager;

class PipeDreamAPIController extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function __construct()
    {
        $this->args = json_decode(request()->getContent());
    }

    public function build()
    {
        // Setup project - sandboxed or regular
        $this->setupProjectEnvironment();

        // Optionally reverse the previous design iteration
        // This is useful to remove previous mistakes and timestamp conflicts
        // $this->args->reverseHistory ? $this->project->reverseHistory() : null;

        // Write the files generated
        $this->project->write($this->args->reviewFiles);

        // If there are user/password_reset tables already present
        $this->project->deleteDuplicateDefaultMigrations($this->args->reviewFiles);        

        // Save the changes we made
        // $this->project->persistHistory();

        // Ensure migrations are autoloaded
        exec('cd .. && composer dumpautoload');
        // whats wrong with this package command??!!
        //Artisan::call('dump-autoload');

        return response([
            'message' => 'Successfully stored files!',
        ], 200);
    }

    private function setupProjectEnvironment()
    {
        $this->project = ProjectFileManager::make(
            env('PIPEDREAM_IS_SANDBOXED')
        );
    }

    private function pathToFileName($path)
    {
        return substr($path, strrpos($path, '/') + 1);
    }
}