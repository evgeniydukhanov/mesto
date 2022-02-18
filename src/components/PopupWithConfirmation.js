import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector(".delete-form");
  }
  setSubmitAction(actionFunc) {
    this._handleSubmitCallback = actionFunc;
  }
  setEventListeners(){
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitCallback();
    });
  }
}

