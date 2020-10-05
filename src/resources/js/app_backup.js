import Vue from 'vue'
import Vuex from 'vuex'
import {PipeDream} from '@pipe-dream/core'
import {Schema} from '@pipe-dream/core';
import {PipeDreamVueTools} from '@pipe-dream/core'
/* imports will be automatically added */
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
            /* file factories will be automatically added */
        ],
        ...window.__ENV__
    }).defaultStore
)

window.PipeDream = {
    Schema
}

/* Let's go */
new Vue({
    el: '#app',
    store,
    mounted(){
        store.dispatch('compileSchema', Schema.refresh());
    }
})
