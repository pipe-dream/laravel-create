<?php

namespace Skeleton;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Collection;

class SkeletonServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->loadRoutesFrom(__DIR__.'/routes/routes.php');
        $this->loadViewsFrom(__DIR__.'/resources/views', 'skeleton');
        $this->registerStorages();

        $this->publishes([
            __DIR__ . '/public' => public_path('vendor/ajthinking/skeleton'),
        ], 'public');
    }
    
    private function registerStorages()
    {
        $this->app['config']["filesystems.disks.self"] = [
            'driver' => 'local',
            'root' => base_path(),
        ];

        $this->app['config']["filesystems.disks.skeleton"] = [
            'driver' => 'local',
            'root' => storage_path('skeleton'),
        ];
        
        $this->app['config']["filesystems.disks.skeleton.sandbox"] = [
            'driver' => 'local',
            'root' => storage_path('skeleton/sandbox'),
        ];        
    }
}
