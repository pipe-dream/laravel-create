import store from './store.js'
import Vue from 'vue'
import LaravelFileFactory from 'laravel-file-factory'
import { components } from 'core'

Vue.component('app-headerz', components.AppHeaderz)

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