
function request(method, uri, body, accessToken, callerHandles401 = false) {
    return new Promise((resolve, reject) => {
        const options = {
            method: method
        };

        if (method === "POST" || method === "PUT") {
            options.headers = {
                "Content-Type": "application/json"
            };
            options.body = JSON.stringify(body || {});
        }

        if (accessToken) {
            options.headers = {
                ...options.headers,
                "Authorization": accessToken
            };
        }

        fetch(uri, options).then(response => {
            // Handle a session expiring in the central http function.
            // Most of the time We don't need to handle this error in each situation that we use 
            // http.js because we always want to take the same action (i.e redirect to /login).
            if (response.status === 401 && !callerHandles401) {
                // TODO replace with the proper browse history API
                window.location.href = `${window.location.origin}${process.env.PUBLIC_URL}/login/`;
                reject(response);
                return;
            }

            if (!response.ok) {
                reject(response);
                return;
            }

            const contentType = response.headers.get("content-type");
            if (contentType.includes('application/json')) {
                try {
                    return response.json();
                } catch (error) {
                    console.error("Error parsing response to JSON", error);
                    reject(response);
                    return {};
                }
            }

            if (contentType.includes('text/html') || contentType.includes('text/plain')) {
                try {
                    return response.text();
                } catch (error) {
                    console.error("Error parsing text/HTML response", error);
                    reject(response);
                    return "";
                }
            }
        }).then(parsedResponse => {
            resolve(parsedResponse);
        });
    });
}

export default class http {
    static get(uri, accessToken, callerHandles401) {
        return request("GET", uri, null, accessToken, callerHandles401);
    }

    static post(uri, body, callerHandles401) {
        return request("POST", uri, body, null, callerHandles401);
    }
}