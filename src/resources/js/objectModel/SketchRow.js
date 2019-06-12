const ARGS_START_MARKER = ">"
const ARGS_DELIMITER = ","

export default class SketchRow {
    constructor(raw) {
        let parts = raw.split(ARGS_START_MARKER)

        this.name = parts[0]
        this.args = parts.slice(1)
            .join()
            .split(ARGS_DELIMITER)
            .filter(arg => arg.trim())
            .map(arg => arg.trim())
    }
}