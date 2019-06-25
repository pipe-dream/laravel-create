<?php

namespace PipeDream\Laravel\Controllers;

use Artisan;
use File;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use PipeDream\Laravel\ProjectFileManager;

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
        $this->args->reverseHistory ? $this->project->reverseHistory() : null;

        // Write the files generated
        $this->project->write($this->args->reviewFiles);

        // We wont need them
        $this->deleteDefaultMigrations();

        // Save the changes we made
        $this->project->persistHistory();

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
            $this->args->isSandboxed
        );
    }

    private function deleteDefaultMigrations()
    {
        $this->project->delete(json_decode('
            [
                {
                    "path": "database/migrations/2014_10_12_000000_create_users_table.php"
                },
                {
                    "path": "database/migrations/2014_10_12_100000_create_password_resets_table.php"
                }
            ]
        '));
    }

    private function pathToFileName($path)
    {
        return substr($path, strrpos($path, '/') + 1);
    }
}
