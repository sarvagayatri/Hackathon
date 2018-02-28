export function toCustomArray(object: Object = {}) {
    return Object.keys(object)
        .map(key => object[key]);
}
export function sortObjectsByDate(jsonList){
    return  jsonList.sort(function(a, b) {
        return a.date - b.date;
    });
}