<?php

namespace Ajthinking\Skeleton;

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
    }

    /*
    * Laravels default publish feature is annoying for user
    * Composer has no post-require-hook (to do it after package install)
    * So resorting to do it every new page load
    * Please fix this
    */
    public static function publishAssets() {
        \File::copyDirectory(
            __DIR__ . '/public',
            public_path('vendor/ajthinking/skeleton')
        );
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
