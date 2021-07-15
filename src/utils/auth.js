import { urlAuth } from "./utils";

class Auth {
    constructor({ url }) {
        this._url = url;
    }

    _checkResponse(res) {
        return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
    }

    async register({ password, email }) {
        const res = await fetch(`${this._url}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                password: password,
                email: email
            })
        });
        return this._checkResponse(res);
    }

    async authorize({ password, email }) {
        const res = await fetch(`${this._url}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: password,
                email: email
            })
        });
        return this._checkResponse(res);
    }

    async checkToken() {
        const res = await fetch(`${this._url}/users/me`, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return this._checkResponse(res);
    }
}

const auth = new Auth({
    url: urlAuth
});

export default auth;