export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _checkStatus(res) {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getInitialCards() {
        return fetch(this._baseUrl + '/cards', {
            method: 'GET',
            headers: this._headers
        }
        )
        .then(this._checkStatus)

    }

}