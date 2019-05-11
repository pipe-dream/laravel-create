function iterate(obj, stack, callback) {
    for (var property in obj) {
        if (obj.hasOwnProperty(property)) {
            if (typeof obj[property] == "object") {
                iterate(obj[property], [...stack, property], callback);
            } else {
                callback([...stack, property], obj[property])
            }
        }
    }
}

export default iterate