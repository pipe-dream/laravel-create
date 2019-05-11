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
    
    <link href="{{ url('vendor/ajthinking/skeleton/css/app.css') }}" rel="stylesheet">
    
</head>
<body>
    <div id="app">
        <app-header></app-header>
        <app-workspace></app-workspace>
        <!-- VIEW ONCE WITH LINKS AND DEMO VIDEO -->
        <!--<app-splash></app-splash>-->
    </div>
    <script type="text/javascript" src="{{ url('vendor/ajthinking/skeleton/js/app.js') }}"></script>
</body>
</html>