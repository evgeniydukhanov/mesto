export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener('keyup', event => {
      this._handleEscClose(event);
    });
    this.setEventListeners();
  }
  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener('keyup', event => {
      this._handleEscClose(event);
    });
  }
  _handleEscClose(event) {
    if (event.key === "Escape" || event.key === "Esc") {
      this.close();
    }
  }
  setEventListeners() {
    this._overlay = this._popup.querySelector(".popup__overlay");
    this._overlay.addEventListener('click', () => {
      this.close();
    });
    this._closeButton = this._popup.querySelector(".popup__close-button");
    this._closeButton.addEventListener('click', () => {
      this.close();
    })
  }
}


// сделать бинд, чтобы еще снимать слушатель
