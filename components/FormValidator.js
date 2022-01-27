export default class FormValidator {
  constructor(config, form) {
    this._form = form;
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
  }
  _showInputError(input, errorMessageText) {
    const errorMessage = this._form.querySelector(`#${input.id}-error`);
    errorMessage.textContent = errorMessageText;
    errorMessage.classList.add(this._errorClass);
    input.classList.add(this._inputErrorClass);
  }
  _hideInputError(input) {
    const errorMessage = this._form.querySelector(`#${input.id}-error`);
    errorMessage.textContent = "";
    errorMessage.classList.remove(this._errorClass);
    input.classList.remove(this._inputErrorClass);
  }
  _hasInvalidInput() {
    return Array.from(this._inputs).some((el) => !el.validity.valid);
  }
  _checkIfInputValid(input) {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage, this._errorClass, this._inputErrorClass);
    } else {
      this._hideInputError(input, this._errorClass, this._inputErrorClass);
    }
  }
  _toggleButtonError() {
    if (this._hasInvalidInput()) {
      this.setButtonDisabled();
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }
  setButtonDisabled() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }
  _setInputListeners() {
    this._toggleButtonError();
    this._inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkIfInputValid(input);
        this._toggleButtonError();
      })
    });
  }
  enableValidation() {
    this._form.addEventListener('submit', (evt) =>
      evt.preventDefault());
    this._inputs = this._form.querySelectorAll(this._inputSelector);
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this._setInputListeners();
  }
}

