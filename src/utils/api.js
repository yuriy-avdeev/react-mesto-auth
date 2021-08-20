import { token, urlFetch } from './utils.js';

class Api {
    constructor({ url, headers }) {
        this._url = url;
        this._headers = headers;
    }

    _checkResponse(res) {
        return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`)
    }

    async getUserInfo() {
        const res = await fetch(`${this._url}/users/me`, {
            headers: this._headers
        });
        return this._checkResponse(res);
    }

    async changeLikeCardStatus(id, isLikedCard) {
        if (!isLikedCard) {
            const res = await fetch(`${this._url}/cards/likes/${id}`, {
                method: 'PUT',
                headers: this._headers
            });
            return this._checkResponse(res);
        } else {
            const res = await fetch(`${this._url}/cards/likes/${id}`, {
                method: 'DELETE',
                headers: this._headers
            });
            return this._checkResponse(res);
        }
    }

    getCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers
        })
            .then(this._checkResponse)
    }

    async deleteCard(id) {
        const res = await fetch(`${this._url}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        });
        return this._checkResponse(res);
    }

    setUserInfo({ name, about }) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(this._checkResponse)
    }

    saveNewCard({ name, url }) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: url
            })
        })
            .then(this._checkResponse)
    }

    setNewAvatar(url) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: url,
            })
        })
            .then(this._checkResponse)
    }
}

const api = new Api({         // <=  тут же создал экзмепляр, ниже экспорт
    url: urlFetch,
    headers: {
        authorization: token,
        'Content-Type': 'application/json'
    }
});

export default api;