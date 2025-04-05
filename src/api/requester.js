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
        if(responce.status === 401){
            throw new Error("Email or password is incorrect!");
        }
        const error = await responce.json(); 
        return error;
    }
    if (method !== 'POST') {
        return result = await responce.json();
    }
    if (url.includes("Login")) {
        return result = await responce.json();
    }

}
export const get = requester.bind(null, 'GET');
export const post = requester.bind(null, 'POST');
export const put = requester.bind(null, 'PUT');
export const del = requester.bind(null, 'DELETE');