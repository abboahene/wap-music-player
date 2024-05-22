const httpGet = async (url, headers = {}) => {
    const userToken =  sessionStorage.getItem("user-token");
    if(!userToken) return showPage("login");

    headers['Authorization'] = userToken;

    const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                ...headers
            }
        });
        const result = await response.json();
        return result;
}

const httpPost = async (url, body, headers = {}) => {
    const userToken =  sessionStorage.getItem("user-token");
    if(!userToken) return showPage("login");

    headers['Authorization'] = userToken;

    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-type': 'application/json',
            ...headers
        }
    });
    const result = await response.json();
    return result;
    
}

const httpPut = async (url, body, headers = {}) => {
    const userToken =  sessionStorage.getItem("user-token");
    if(!userToken) return showPage("login");

    headers['Authorization'] = userToken;

    const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'Content-type': 'application/json',
            ...headers
        }
    });
    const result = await response.json();
    return result;
    
}