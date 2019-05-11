export default class Attribute {
    constructor(properties) {
        Object.keys(properties).map((key) => {
            this[key] = properties[key]
        })
    }

    serialize() {
        return Object.keys(this).filter(key => key != "parent").reduce((result, key) => {
            return {
                ... result,
                [key]: this[key]
            }
        }, {})
    }
}