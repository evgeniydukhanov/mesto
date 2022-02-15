export default class Api {
  constructor({ address, token }) {
    this._address = address;
    this._token = token;
  }
  _handleResponse = (response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка ${response.status}`);
  }
  getCards() {
    return fetch(`${this._address}/cards`, {
      headers: {
        authorization: this._token
      }
    }).then(this._handleResponse)
  }
  getUserInfo() {
    return fetch(`${this._address}/users/me`, {
      headers: {
        authorization: this._token
      }
    }).then(this._handleResponse)
  }
  patchUserInfo({ name, about }) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    }).then(this._handleResponse)
  }
  addCard({ name, link }) {
    return fetch(`${this._address}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    }).then(this._handleResponse)
  }
  deleteCard(_id) {
    return fetch(`${this._address}/cards/${_id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
      .then(this._handleResponse)
  }
}
