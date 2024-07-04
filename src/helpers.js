export function getParams(request){
    const url = new URL(request.url);
    const params = new URLSearchParams(url.search);
    const paramObj = {};
    for (const [key, value] of params.entries()) {
        paramObj[key] = value;
    }
    return paramObj;
}