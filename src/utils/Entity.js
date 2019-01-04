export function Copy(destination, source = null, fields = null){
    if(typeof destination === 'undefined' || destination === null){
        return;
    }
    if(fields === null){
        if(source !== null){
            fields = Object.keys(source);
        }else{
            fields = Object.keys(destination);
        }
    }
    fields.forEach((field) => {
        if(typeof destination[field] === 'undefined'){
            destination[field] = null;
        }
        if(typeof source === 'undefined' || source === null || typeof source[field] === 'undefined'){
            return;
        }
        destination[field] = source[field];
    });
}

export function IsEmpty(obj) {
    return typeof obj === 'undefined' || obj === null || (typeof obj === 'string' && obj.trim().length === 0);
}