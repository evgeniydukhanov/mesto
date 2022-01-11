const bigPic = document.querySelector(".popup__big-picture");
const popupPictureDescribe = document.querySelector(".popup__pic-caption");
const popupPicture = document.querySelector(".popup_type_pic");

export default class Card {
  constructor(data, selector, openPopupHandler) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
    this._openPopupHandler = openPopupHandler;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._selector)
      .content
      .querySelector(".element")
      .cloneNode(true);


    return cardElement;
  }
  generateCard() {
    this._element = this._getTemplate();
    const elemImg = this._element.querySelector(".element__pic");
    elemImg.src = this._link;
    elemImg.alt = this._name;
    this._element.querySelector(".element__title").textContent = this._name;
    this._setEventListeners();
    return this._element;
  }
  _handlePopupPictureClick = () => {
    bigPic.src = this._link;
    bigPic.alt = this._name;
    popupPictureDescribe.textContent = this._name;
    this._openPopupHandler(popupPicture);
  }
  _setEventListeners() {
    const imgEl = this._element.querySelector(".element__pic");
    imgEl.addEventListener('click', this._handlePopupPictureClick);

    const deleteBtn = this._element.querySelector(".element__delete");
    deleteBtn.addEventListener('click', this._handleDelete);

    const cardLikeBtn = this._element.querySelector(".element__button");
    cardLikeBtn.addEventListener('click', this._handleLike);
  }
  _handleDelete = () => {
    this._element.remove();
  }
  _handleLike = () => {
    const cardLikeBtn = this._element.querySelector(".element__button");
    cardLikeBtn.classList.toggle("element__button_active");
  }
}

