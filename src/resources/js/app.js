import Vue from 'vue'
import Vuex from 'vuex'
import PipeDream from 'core'
import { PipeDreamVueTools } from 'core'
import LaravelFileFactory from 'laravel-file-factory';

/* setup Vue to use Vuex and Pipe Dream components */
Vue.use(Vuex)
Vue.use(PipeDreamVueTools)
Vue.config.debug = true
window.Vue = Vue

/* Create Pipe Dream default store
 * Attach it to window to make it accessible inside core and file factories */
window.store = new Vuex.Store(
    new PipeDream({
        fileFactories: [
            LaravelFileFactory
        ]
    }).defaultStore
)

/* Let's go */
new Vue({
    el: '#app',
    store
})