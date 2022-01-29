import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._caption = document.querySelector(".popup__pic-caption");
    this._image = document.querySelector(".popup__big-picture");
  }
  open({ name, link }) {
    this._image.alt = name;
    this._caption.textContent = name;
    this._image.src = link;
    super.open();
  }
}
