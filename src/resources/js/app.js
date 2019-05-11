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