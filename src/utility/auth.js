import http from './http';
import API from './api';

export default class Auth  {

    static isAuthenticated() {
        return new Promise(async (resolve, reject) => {
            const accessToken = this.getAccessToken();
            if (!accessToken) {
                resolve(false);
                return;
            }

            await http.get(API.getURL(), accessToken).catch(error => {
                if (error.status === 401) {
                    resolve(false);
                    return;
                }
                console.error("Error trying to check for valid session", error);
                reject();
            });

            resolve(true);
        });
    }

    static login(email, password, expiry = "30m") {
        const body = {
            email,
            password
        };

        return new Promise(async (resolve, reject) => {
            const response = await http.post(`${API.getURL()}/login`, body, true).catch(error => {
                if (error.status === 401) {
                    reject("Incorrect password provided");
                    return "";
                }
                reject("Unexpected error trying to login");
                console.error("Unexpected error trying to login", error);
                return "";
            });
            resolve(response.accessToken);
        });
    }

    static logout(email) {

    }

    static setAccessToken(accessToken) {
        localStorage.setItem("accessToken", accessToken);
    }

    static getAccessToken() {
        return localStorage.getItem("accessToken");
    }
}