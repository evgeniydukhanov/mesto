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
}

