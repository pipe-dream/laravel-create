import Vue from 'vue'
import Vuex from 'vuex'
import PipeDream from 'core'
import LaravelFileFactory from 'laravel-file-factory';

Vue.use(Vuex)
Vue.config.debug = true

export default new Vuex.Store(
    new PipeDream({
        fileFactory: LaravelFileFactory
    }).defaultStore
)