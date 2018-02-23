export function toCustomArray(object: Object = {}) {
    return Object.keys(object)
        .map(key => object[key]);
}