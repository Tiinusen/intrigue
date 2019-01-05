export function ArrayToObject(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }
    let newObj = {};
    if (!(obj instanceof Array)) {
        for (var key in obj) {
            newObj[key] = ArrayToObject(obj[key]);
        }
        return newObj;
    }
    for (let i = 0; i < obj.length; i++) {
        let item = obj[i];
        if (['string', 'object'].indexOf(typeof item) === -1) {
            continue;
        }
        switch (typeof item) {
            case "string":
                newObj[item] = {};
                break;
            case "object":
                tObj = ArrayToObject(item);
                for (var key in tObj) {
                    newObj[key] = tObj[key];
                }
                break;
        }


    }
    return newObj;
}