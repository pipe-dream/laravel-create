export default class BasePipe {
    constructor(omc) {
        this.omc = omc
    }

    static with(omc) {
        return new this(omc)
    }
        
    name() {
        return this.constructor.name
    }

    horisontalStringList(names, defaultValue) {
        let result = names.map(name => {
            return "'" + name + "'"
        }).join(", ")

        return result ? result : defaultValue
    }
}