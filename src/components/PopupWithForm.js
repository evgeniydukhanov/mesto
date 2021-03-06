import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__input");
    this._inputList = this._popup.querySelectorAll(".popup__input-text");
    this._submitBtn = this._popup.querySelector(".popup__save-button")
  }
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }
  _handleSubmit = (evt) => {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._handleSubmit);
  }
  showLoading(isLoading, buttonText = "Сохранение") {
    this._submitBtn.disable = isLoading;
    this._submitBtn.textContent = buttonText
  }
  close() {
    super.close();
    this._form.reset();
  }
}
