<?php

namespace PipeDream\LaravelCreate\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Console\Helper\ProgressBar;
use Symfony\Component\Process\Process;

class PipeDreamBuild extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'pipedream:build';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Rebuild PipeDream from source files';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        $this->info("Rebuilding PipeDream...");

        $appJSPath = __DIR__ . "/../resources/js/app.js";
        $app = file_get_contents($appJSPath);
        $nodeModules = base_path() . DIRECTORY_SEPARATOR . "node_modules";

        $level1 = Collect(glob($nodeModules . DIRECTORY_SEPARATOR . "*/package.json"));
        $level2 = Collect(glob($nodeModules . DIRECTORY_SEPARATOR . "*/*/package.json"));
        $modules = $level1->merge($level2);

        $this->info("\nDiscovering PipeDream packages");
        $bar = $this->output->createProgressBar();
        $bar->start();

        $pipeDreamModules = [];
        $master = [];
        foreach ($modules as $module) {
            $bar->advance();
            $p = json_decode(file_get_contents($module), true);
            if (!array_key_exists('PipeDream', $p)) continue;
            if (array_key_exists('PipeDreamMaster', $p) && $p['PipeDreamMaster'] === true) {
                $master[rtrim($module, "/package.json")] = $p["PipeDream"];
                continue;
            }
            $pipeDreamModules[rtrim($module, "/package.json")] = $p["PipeDream"];
        }

        $pipeDreamModules = array_merge($master, $pipeDreamModules);

        $bar->finish();
        $this->info("\n");
        if (count($pipeDreamModules) === 0) {
            $this->error("No PipeDream modules found!");
            return;
        }
        foreach ($pipeDreamModules as $pipeDreamModule) {
            $this->info("Discovered package: " . $pipeDreamModule);
        }
        $overwritten = str_replace("/* file factories will be automatically added */", implode(", ", $pipeDreamModules), $app);
        array_walk($pipeDreamModules, function (&$v, $path) {
            $v = 'import {' . $v . '} from "' . str_replace('\\', '/', $path) . '"';
        });
        $overwritten = str_replace("/* imports will be automatically added */", implode(";\n", $pipeDreamModules), $overwritten);

        file_put_contents($appJSPath, $overwritten);

        $this->info("Compiling...");
        if(!exec("npm run dev --prefix " . __DIR__ . '/../../')){
            $this->warning("Something went wrong when compiling.");
        }
        $this->info("PipeDream was built successfully, go build something awesome!");
        // set app.js back to the template for the next update
        file_put_contents($appJSPath, $app);
    }
}
