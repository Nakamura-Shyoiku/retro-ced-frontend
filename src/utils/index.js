export function urlWithParams(urlString, params={}) {
    let url = new URL(urlString);
    let searchParams = new URLSearchParams();
    
    Object.keys(params).forEach((key) => {
        searchParams.append(key, params[key] || '');
    });
    url.search = searchParams.toString();

    return url.toString();
}

export function spacesToCommas(str) {
    return str.split(' ').join(',');
}

const removeEmptyProperty = (obj) =>  {
    return Object.entries(obj).reduce((a,[k,v]) => (v ? (a[k]=v, a) : a), {})
}

export { removeEmptyProperty }