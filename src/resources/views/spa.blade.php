<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Styles (avoid using Laravels publish feature) -->
    
    <link href="{{ url('vendor/pipe-dream/laravel-create/css/app.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">
    <script>
        window.__ENV__ = {!! json_encode($settings) !!}
        
    </script>
</head>
<body>
    <div id="app">
        <app-header></app-header>
        <app-workspace></app-workspace>
    </div>
    <script type="text/javascript" src="{{ url('vendor/pipe-dream/laravel-create/js/app.js') }}"></script>
    <!-- import __GITHUB_DUMP__  -->
    <script type="text/javascript" src="{{ url('vendor/pipe-dream/laravel-create/data/github.js') }}"></script>
</body>
</html>