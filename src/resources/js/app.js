import store from './store'
import Vue from 'vue'
import LaravelFileFactory from 'laravel-file-factory'

console.log(
    "now",
    LaravelFileFactory.templates()
)


window.Vue = Vue

require('./bootstrap/extendArray')
require('./bootstrap/assignConstants')
require('./bootstrap/registerVueDirectives')
require('./bootstrap/registerVueComponents')

/* Lets go! */
const app = new Vue({
    el: '#app',
    store
})