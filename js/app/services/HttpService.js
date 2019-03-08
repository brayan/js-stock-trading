export default class HttpService {

    static get(url) {
        return fetch(url)
            .then(response => HttpService.handleErrors(response))
            .then(response => response.json());
    }

    static post(url, data) {
        return fetch(url, {
            headers: { "Content-type": "application/json" },
            method: "post",
            body: JSON.stringify(data)
        }).then(response => HttpService.handleErrors(response));
    }

    static handleErrors(response) {
        if (response.ok) {
            return response;
        } else {
            throw new Error(response.statusText);
        }
    }

}