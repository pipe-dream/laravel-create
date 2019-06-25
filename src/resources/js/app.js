import store from './store.js'
import Vue from 'vue'
import { PipeDreamVueTools } from 'core'

window.Vue = Vue
Vue.use(PipeDreamVueTools)

/* Lets go! */
const app = new Vue({
    el: '#app',
    store
})