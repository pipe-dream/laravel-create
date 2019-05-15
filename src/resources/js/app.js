Array.prototype.mapWithRemaining = function(callback) {
    let items = this.map((item, key) => {
        let remaining = [...this]
        remaining.splice(
            remaining.indexOf(item), 1
        )
        
        return callback(item, remaining)
    })

    return items
}

Array.prototype.first = function() {
    return this.length ? this[0] : null;
}

Array.prototype.sortByPath = function() {
    return this.sort((v1,v2) => {
        let p1 = v1.split("/")
        let p2 = v2.split("/")
        
        for(let i=0; i<Math.min(p1.length, p2.length); i++) {
            if(p1[i] < p2[i] && p1.length > i+1 ) {
                return -1
            }
        }
        return 1
    })
}

let values = [
    "app/Car.php",
    "app/Garage.php",
    "app/Http/Controllers/CarAPIController.php",
    "app/Http/Controllers/CarController.php",
    "app/Http/Controllers/GarageAPIController.php",
    "app/Http/Controllers/GarageController.php",
    "app/Http/Controllers/UserAPIController.php",
    "app/Http/Controllers/UserController.php",
    "app/User.php",
    "database/factories/CarFactory.php",
    "database/factories/GarageFactory.php",
    "database/factories/UserFactory.php",
    "database/migrations/2019_05_15_190200_create_users_table.php",
    "database/migrations/2019_05_15_190201_create_password_resets_table.php",
    "database/migrations/2019_05_15_190202_create_garages_table.php",
    "database/migrations/2019_05_15_190203_create_cars_table.php",
    "database/migrations/2019_05_15_190204_create_car_garage_table.php",
    "database/seeds/CarSeeder.php",
    "database/seeds/DatabaseSeeder.php",
    "database/seeds/GarageSeeder.php",
    "database/seeds/UserSeeder.php",
    "routes/api.php",
    ".env"
]

let V = ["a", "c", "b"]

console.log(values.sortByPath())

// omg why??
const LINE_BREAK = "\n"
window.___SINGLE_LINE_BREAK___ = LINE_BREAK
window.___DOUBLE_LINE_BREAK___ = LINE_BREAK.repeat(2)

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
import store from './store'

Vue.directive('focus', {
    // When the bound element is inserted into the DOM...
    inserted: function (el) {
      // Focus the element
      el.focus()
    }
  })

// Register all vue components
const files = require.context('./', true, /\.vue$/i);
files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

const app = new Vue({
    el: '#app',
    store
});