
[![Latest Stable Version](https://img.shields.io/packagist/v/pipe-dream/laravel.svg)](https://packagist.org/packages/pipe-dream/laravel)
[![Total Downloads](https://img.shields.io/packagist/dt/pipe-dream/laravel.svg)](https://packagist.org/packages/pipe-dream/laravel)
[![License](https://img.shields.io/packagist/l/pipe-dream/laravel.svg)](https://packagist.org/packages/pipe-dream/laravel)



<a href="https://www.youtube.com/watch?v=doUlmZdvP1o" target="_blank">
<img src="src/public/img/video_splash_joke.png" title="source: imgur.com" />
</a>
Pipe Dream lets you build web applications from minimal input. By using a concept of a sketch, an application schema is generated and feed through a set of pipes to create all the files needed.

## Installation

```bash
composer require --dev pipe-dream/laravel
```

Thats it, now open your browser and go to `/pipe-dream` and start designing.

## Usage
If you havent already, watch the 2 minute video [here](https://www.youtube.com/watch?v=doUlmZdvP1o).

* List your models and tables in the sketch window. Note the schema automatically created to the right.

<kbd><img src="src/public/img/screenshots/design.png" /></kbd>

 * Review the files to be created.

<kbd><img src="src/public/img/screenshots/review.png" /></kbd>

* Commit the files to disc.

<kbd><img src="src/public/img/screenshots/build.png" /></kbd>

* You are now ready to migrate and seed. Check out the API with placeholder values at `/api`

<kbd><img src="src/public/img/screenshots/api.png" width="400" /></kbd>

## Alfa disclaimer
This package is still in development. Please post issues and send PRs.

## License
MIT