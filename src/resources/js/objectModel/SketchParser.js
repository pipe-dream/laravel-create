import Segment from './Segment'

export default class SketchParser {
    constructor(text) {
        this.text = text
    }

    static makeWithText(text) {
        return new SketchParser(text)
    }

    static parse(text) {
        return this.makeWithText(text).clean()
    }

    clean() {
        this.text = this.text
            // remove comments
            .replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, "")        
            // trim preciding line space
            .replace(/[^\S\r\n]/gm,"")        
            // trim trailing line space
            .replace(/[\t]+$/gm,"")        
            // trim preciding newlines
            .replace(/^\n+/,"")
            // trim trailing newlines
            .replace(/\n+$/, "")
            // remove exessive newlines
            .replace(/\n\s+\n/, ___DOUBLE_LINE_BREAK___)
        return this;
    }

    /* returns an array with items of type Segment */
    segment() {
        return !this.text ? [] : this.text.split(/\n\s*\n/).map((chunk) => Segment.fromText(chunk))
    }        
}
