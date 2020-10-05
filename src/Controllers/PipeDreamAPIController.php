<?php

namespace PipeDream\LaravelCreate\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;
use PHPFileManipulator\Facades\PHPFile;
use PHPFileManipulator\Facades\LaravelFile;
use PHPFileManipulator\Support\AST\ASTQueryBuilder;
use PipeDream\LaravelCreate\ProjectFileManager;

class PipeDreamAPIController extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public $t = [];

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

    public function save()
    {
        return collect("Save not implemented yet");
    }

    public function import()
    {
        $t = [];
        PHPFile::in('database/migrations')
            ->where('classExtends', 'Migration')
            ->andWhere('className', 'like', 'Create')
            ->get()
            ->each(fn($file) => $this->t[] = $this->getColumns($file));
        return $this->t;
    }

    public function importFromInformationSchema()
    {
        $sketch = "";
        $tables = Schema::getAllTables();
        $ignoredTables = ['migrations'];
        if (class_exists('Laravel\\Nova\\Resource'))
            $ignoredTables[] = 'action_events';

        $ignoredColumns = [
            'id',
            'created_at',
            'updated_at'
        ];

        foreach ($tables as $key => &$table) {
            $tableName = $table->Tables_in_laravel;
            if (in_array($tableName, $ignoredTables)) {
                unset($tables[$key]);
                continue;
            }
            $sketch .= $tableName . PHP_EOL;
            $columns = Schema::getColumnListing($tableName);
            foreach ($columns as $cKey => &$column) {
                if (in_array($column, $ignoredColumns)) {
                    unset($columns[$cKey]);
                    continue;
                }
                $row = $column;
                $field = DB::table('information_schema.columns')
                    ->where('table_schema', DB::getDatabaseName())
                    ->where('table_name', $tableName)
                    ->where('column_name', $column)
                    ->first();

                $fieldOptions = [
                    'dataType' => $field->DATA_TYPE,
                    'nullable' => $field->IS_NULLABLE === "YES",
                    'unique' => $field->COLUMN_KEY === 'UNI'
                ];

                $sketchArguments = [
                    $fieldOptions['dataType'],
                    ...array_keys(array_filter($fieldOptions, fn($f) => $f === false))
                ];
                $row .= " > " . join(', ', $sketchArguments);
                $sketch .= $row . PHP_EOL;
                $column = [$column => [$fieldOptions]];
            }
            $sketch .= PHP_EOL;
            $table = [$tableName => array_values($columns)];
        }
        return $sketch;
    }

    private function getColumns(\PHPFileManipulator\PHPFile $table)
    {
        $info = [];
        $up = $this->getUpMethod($table);

        $stmts = $this->getUpMethod($table)
            ->args
            ->closure()
            ->stmts
            ->methodCall()
            ->where('var->name', 'table');

        $info[0] = $up->args->value->value->get(); // Table name
        $columns = $stmts->args->value->value->get()->unique();
        $columnsToRemove = ["id", "created_at", "updated_at"];
        $columns = array_diff($columns->toArray(), $columnsToRemove);
        $info[1] = $columns; // columns

        return $info;
    }

    private function getUpMethod($table): ASTQueryBuilder
    {
        return $table
            ->astQuery() // get a ASTQueryBuilder
            ->method()
            ->named('up')
            ->staticCall()
            ->where('class', 'Schema')
            ->named('create');
    }
}
