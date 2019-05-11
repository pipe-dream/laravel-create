import pluralize from 'pluralize'
let changeCase = require('change-case') // How to use import instead?

export default class Formatter {
    static pluralize(word) {
        return pluralize(word)
    }

    static snakeCase(word) {
        return changeCase.snake(word)
    }

    static camelCase(word) {
        return changeCase.camel(word)
    }

    static pascalCase(word) {
        return changeCase.pascal(word)
    }
    
    static singleQuotePad(word) {
        return "'" + word + "'"
    }
}