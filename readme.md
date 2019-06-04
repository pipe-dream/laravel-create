
[![Latest Stable Version](https://img.shields.io/packagist/v/pipe-dream/laravel.svg)](https://packagist.org/packages/pipe-dream/laravel)
[![Total Downloads](https://img.shields.io/packagist/dt/pipe-dream/laravel.svg)](https://packagist.org/packages/pipe-dream/laravel)
[![License](https://img.shields.io/packagist/l/pipe-dream/laravel.svg)](https://packagist.org/packages/pipe-dream/laravel)



<a href="https://www.youtube.com/watch?v=doUlmZdvP1o" target="_blank">
<img src="src/public/img/video_splash_joke.png" title="source: imgur.com" />
</a>
Pipe Dream is a handy tool used to create new web projects really fast. By  giving it a minimum of input in form of a sketch/entity list it will predict your application schema and feed it into a set of pipes. These pipes will generate all the files needed to get started really quick.

At the moment its only available as a Laravel package (PHP), but the plan is to make implementations for other languages/frameworks maybe Express/Rails/Django.

## Installation

```bash
composer require --dev pipe-dream/laravel
```

Thats it, now open your browser and go to `/pipe-dream` and start designing.

## Usage
If you havent already, watch the 2 minute video [here](https://www.youtube.com/watch?v=doUlmZdvP1o).

* List your models and tables in the sketch window. Note the schema automatically created to the right.

<kbd><img src="src/public/img/screenshots/design.png" /></kbd>

* Here are some pointers on the sketch syntax
```js
// use PascalCase for models
Garage
location
capacity

// Separate your entities into chunks
Car
color
user_id // foreign key

// use snake_case model1_model2 to setup a ManyToMany relationship
car_garage 

// use button to add a default user system
User 
name
email
email_verified_at
password
remember_token

// use snake_case to create a table
password_resets
email
token
```

 * Review the files to be created.

<kbd><img src="src/public/img/screenshots/review.png" /></kbd>

* Commit the files to disc.

<kbd><img src="src/public/img/screenshots/build.png" /></kbd>

* You are now ready to migrate and seed. Check out the API with placeholder values at `/api`

<kbd><img src="src/public/img/screenshots/api.png" width="400" /></kbd>

## Alfa disclaimer
This package is still very much in development. Please post issues and send PRs.

## License
MIT