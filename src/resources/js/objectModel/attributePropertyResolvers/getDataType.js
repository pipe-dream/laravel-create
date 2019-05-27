//import dataTypeGithubDump from '../../../../../data/dataTypeGithubDump.js'

/* local helper class assisting getDataType() function */
class DataTypeResolver {
    constructor(name) {
        this.name = name
    }

    overridden(name) {
        // Handle overridden line starting with $
        if(name.charAt(0) == "$") {
            // Save for future reference?
            return name;
        }
    
        // Load previous override rules
        var overrided = {}; 
        if(overrided.hasOwnProperty(name)) {
            return overrided[name];
        }
    
        return false;        
    }
    
    reserved(name) {
        var reservedNames = {
            "id": "bigIncrements",
            "timestamps": "timestamps",
            "rememberToken": "rememberToken",
            "timestamps()": "timestamps",
            "email": "string",
        }
        if(reservedNames.hasOwnProperty(name)) {
            return reservedNames[name];
        }
    
        return false;        
    }
    
    ruled(name) {
        var matchedRuleKey = Object.keys(this.rules()).find((rule) => (new RegExp(rule)).test(name));
        if(typeof matchedRuleKey !== "undefined") {
            return this.rules()[matchedRuleKey](name);
        }
    
        return false;
    }
    
    default(name) {
        return "string"
    }

    github(name) {
        return name in __GITHUB_DUMP__ ? __GITHUB_DUMP__[name] : false
    }
    
    rules() { 
        return {
            // One to Many explicit
            "_id$": function(name) {
                return "unsignedInteger"
            },            
            // Time columns
            "(time|date|_at)$": function(name) {
                return "timestamp";
            },
            // Boolean
            "^(has_|is_|got_)": function(name) {
                return "boolean";
            },
        };                        
    }    
}

/* exporting getDataType() */
export default function(name) {
    let resolver = new DataTypeResolver(name)
    return [
        //resolver.overridden(name), // not implemented
        resolver.reserved(name),
        resolver.ruled(name),
        resolver.github(name),
        resolver.default(name)
    ].find((filter) => filter);
}