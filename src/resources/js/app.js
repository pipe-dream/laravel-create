import Vue from 'vue'
import Vuex from 'vuex'
import {PipeDream} from '@pipe-dream/core/dist'
import {PipeDreamVueTools} from '@pipe-dream/core/dist'
import LaravelFileFactory from '@pipe-dream/laravel-file-factory';
import LaravelNovaFileFactory from '../../../../../../../nova-file-factory/src/laravel-nova-file-factory';

console.log(PipeDreamVueTools)

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
            LaravelFileFactory,
            LaravelNovaFileFactory,
        ],
        ...window.__ENV__
    }).defaultStore
)

/* Let's go */
new Vue({
    el: '#app',
    store
})
