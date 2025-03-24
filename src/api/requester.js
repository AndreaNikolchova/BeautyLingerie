export default async function requester(method, url, data) {
    const options = {};
    if (method !== 'GET') {
        options.method = method;
    }
    if (data) {
        options.headers = {
            'Content-Type': 'application/json',
        };
        options.body = JSON.stringify(data);
    }

    const responce = await fetch(url, options);
    let result = {};
    if (!responce.ok) {
       if(responce.status!==401){
           result = await responce.json();
           throw result;
       }
    }
    if (!url.includes("/Customer/Add")) {
        result = await responce.json();
    }

    return result;

}
export const get = requester.bind(null, 'GET');
export const post = requester.bind(null, 'POST');
export const put = requester.bind(null, 'PUT');
export const del = requester.bind(null, 'DELETE');