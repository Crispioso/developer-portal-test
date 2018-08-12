import http from "./http";
import Auth from "./auth";

export default class API {
    
    static getURL() {
        return "https://guarded-thicket-22918.herokuapp.com";
    }

    static getApplications() {
        return http.get(`${this.getURL()}/apps`, Auth.getAccessToken());
    }

    static getApplicationsUsers(applicationID, limit, offset) {
        let URL = `${this.getURL()}/apps/${applicationID}/users`;

        if (limit && offset) {
            URL += `?limit=${limit}&offset=${offset}`;
        } else if (limit) {
            URL += `?limit=${limit}`;
        } else if (offset) {
            URL += `?offset=${offset}`;
        }

        return http.get(URL, Auth.getAccessToken());
    }
}