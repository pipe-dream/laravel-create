Array.prototype.mapWithRemaining = function(callback) {
    let items = this.map((item, key) => {
        let remaining = [...this]
        remaining.splice(
            remaining.indexOf(item), 1
        )
        
        return callback(item, remaining)
    })

    return items
}

Array.prototype.first = function() {
    return this.length ? this[0] : null;
}

Array.prototype.sortByPath = function() {
    let pathSorter = (first,second) => {
        let firstParts = first.split("/")
        let secondParts = second.split("/")
    
        for(let i=0; i<Math.min(firstParts.length, secondParts.length); i++) {
            let FIRST_PART_IS_FOLDER = firstParts.length > i + 1
            let SECOND_PART_IS_FOLDER = secondParts.length > i + 1
    
            // Folders always has precedence
            if(FIRST_PART_IS_FOLDER && !SECOND_PART_IS_FOLDER) return -1;        
            if(!FIRST_PART_IS_FOLDER && SECOND_PART_IS_FOLDER) return 1;        
    
            // Between equals (files or folders) use alfabetic
            if(firstParts[i] < secondParts[i]) return -1;
            if(firstParts[i] > secondParts[i]) return 1;
        }
        
        // Default
        return 0
    }

    return this.sort(pathSorter);
}