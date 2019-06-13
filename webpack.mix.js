const mix = require('laravel-mix');

require('laravel-mix-tailwind');
require('laravel-mix-purgecss');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('src/resources/js/app.js', 'src/public/js')
   .postCss('src/resources/css/app.css', 'src/public/css')
   .tailwind()
   .purgeCss();

/* while developing make sure public/vendor/pipe-dream/laravel is fresh */
mix.copy('src/public/css/app.css', '../../../public/vendor/pipe-dream/laravel/css/app.css')
mix.copy('src/public/js/app.js', '../../../public/vendor/pipe-dream/laravel/js/app.js')

if (mix.inProduction()) {
  mix.version();
}
