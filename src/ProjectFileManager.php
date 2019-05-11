<?php

namespace Skeleton;

use stdClass;
use Storage;
use File;

class ProjectFileManager {
    public function __construct($isSandboxed)
    {
        $this->isSandboxed = $isSandboxed;
        if($this->isSandboxed) $this->setupSandboxProject();            
        $this->history = [];
    }

    public static function make($isSandboxed)
    {
        return new self($isSandboxed);
    }

    public function write($files)
    {
        $this->recordCurrentStateFor($files);

        collect($files)->each(function($file) {
            $this->storage()->put($file->path, $file->content);
        });        
    }

    public function delete($files)
    {
        $this->recordCurrentStateFor($files);

        collect($files)->each(function($file) {
            $this->storage()->delete($file->path);
        });        
    }    

    public function reverseHistory()
    {
        collect($this->loadHistory())->each(function($content, $path) {
            if($content == null) {
                return $this->storage()->delete($path);
            }
            
            $this->storage()->put($path, $content);
        });
    }

    public function persistHistory()
    {
        $this->storage()->put(
            'skeleton-history.json',
            json_encode($this->history)
        );
    }

    /*********** PRIVATE ************************************************** */
    private function setupSandboxProject()
    {
        app()['config']["filesystems.disks.skeleton_sandbox_project"] = [
            'driver' => 'local',
            'root' => storage_path("skeleton/sandbox/test-project"),
        ]; 
        
        if(!Storage::disk('skeleton')->exists('sandbox/test-project')) {
            File::copyDirectory(
                storage_path('skeleton/laravel-including-vendors'),
                storage_path("skeleton/sandbox/test-project")
            );
        }
    }

    private function loadHistory()
    {
        return $this->storage()->has('skeleton-history.json') ?
        json_decode($this->storage()->get('skeleton-history.json')) : [];
    }

    private function storage()
    {
        return Storage::disk(
            $this->isSandboxed ? "skeleton_sandbox_project" : 'self'
        );
    }

    private function recordCurrentStateFor($files)
    {
        collect($files)->each(function($file) {
            $this->history[$file->path] = 
                $this->storage()->has($file->path) ?
                $this->storage()->get($file->path) :
                null;
        });
    }
}