import F from '@utilities/Formatter'

export default class Segment {
    constructor(chunk) {
        let parts = chunk.split('\n')
        this.name = parts[0]
        this.attributes = parts.slice(1)
        this.softdeletes = this.attributes[0] === "softdeletes"
        if(this.softdeletes)
            this.attributes = parts.slice(2)
    }

    static fromText(chunk) {
        return new this(chunk)
    }

    hasModel() {
        // a Model is indicated by capital first letter
        return this.name[0] == this.name[0].toUpperCase()
    }

    hasUserModel() {
        return this.name == "User"
    }
}
