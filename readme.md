
[![Latest Stable Version](https://img.shields.io/packagist/v/pipe-dream/laravel.svg)](https://packagist.org/packages/pipe-dream/laravel)
[![Total Downloads](https://img.shields.io/packagist/dt/pipe-dream/laravel.svg)](https://packagist.org/packages/pipe-dream/laravel)
[![License](https://img.shields.io/packagist/l/pipe-dream/laravel.svg)](https://packagist.org/packages/pipe-dream/laravel)


Create new web projects really fast. By  giving Pipe Dream a minimum of input in form of a sketch/entity list it will predict your application schema and feed it into a set of pipes. These pipes will generate all the files needed to get started really quick.

<a href="https://www.youtube.com/watch?v=doUlmZdvP1o" target="_blank">
<img src="src/public/img/video_splash_joke.png" width="600" />
</a>

## Installation

```bash
composer require --dev pipe-dream/laravel
```

Thats it, now open your browser and go to `/pipe-dream` and start designing.

## Usage
If you havent already, [watch the 2 minute video](https://www.youtube.com/watch?v=doUlmZdvP1o).

* List your models and tables in the sketch window. Note the schema is created in real-time and is being displayed on the right side of the screen.

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

 * Review the list of files that are going to be created.

<kbd><img src="src/public/img/screenshots/review.png" /></kbd>

* Commit the files to disk.

<kbd><img src="src/public/img/screenshots/build.png" /></kbd>

* You are now ready to migrate and seed. Go ahead and check out the API (at `/api`), that contains placeholder values 

<kbd><img src="src/public/img/screenshots/api.png" width="400" /></kbd>

## Development roadmap
This package is still very much in development. Below is a rough plan for the future.

### Alpha ( < v0.1.0 )
* The main goal of the alpha is to act as a proof of concept specifically for Laravel applications.
* Bug fixes will continiue until the alpha is stable.
* New features will be added only if the work required is reasonable.
* Complex new features or non critical bug fixes might be postponed to the Beta version.

### Beta ( v0.1.0 )
* Most of the Javascript will be extracted to its own repository ( pipe-dream/core ) in order to easily enable support for multiple FileFactories in separate repos (Maybe ExpressFileFactory, DjangoFileFactory or others). This repo (pipe-dream/laravel) will then extend that core with logic, rules, data etc specific only for Laravel.
* Backend and frontend interfaces/API specifications are supplied to make it clear what other implementations need to conform to.

### Version 1 ( v1.0.0 )
* When the beta is stable we will bump it up to v1.0.0

### Help us out
Help us out by simply trying this package. Feel free to post issues if you have a question, find a bug, have some idea for improvement or if you just want to share your experience. PRs are more than welcome, you dont need to be a pro.
Start by looking at this [Trello board](https://trello.com/b/R11mhfdy/pipe-dream) listing all the stuff that needs to get done.

## License
MIT

## Stay tuned!
Follow me on twitter: [@ajthinking](https://twitter.com/ajthinking)

<a href="https://www.patreon.com/ajthinking" >Help me continue this work | Patreon</a>
