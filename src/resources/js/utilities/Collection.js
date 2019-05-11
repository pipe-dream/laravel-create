import collect from 'collect.js'; 

collect().macro("mapWithRemaining", function(callback) {
    let keys = Object.keys(this.items)
    let items = this.items.map((item, key) => {
        let remaining = [...this.items]
        remaining.splice(
            remaining.indexOf(item), 1
        )
        
        return callback(item, remaining)
    })

    return collect(items)
})

export default collect;
