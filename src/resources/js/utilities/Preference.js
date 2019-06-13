import Config from '../Config'
const mergeJSON = require('deepmerge')
import store from '../store'

export default class Preference {
    static has(path) {
        return !(this.get(path) instanceof Error)
    }

    static get(path) {
        try {
            return path.reduce((data, key) => {
                if(typeof data === 'object' && key in data) return data[key];
                throw new ReferenceError("No such key combination")
            }, store.getters.preferences)

        } catch(ReferenceError) {
            return ReferenceError
        }
    }
}