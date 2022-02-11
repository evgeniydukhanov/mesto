export default class Card {
  constructor(data, selector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._likes = data.likes;
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
    this._elemImg = this._element.querySelector(".element__pic");
    this._elemImg.src = this._link;
    this._elemImg.alt = this._name;
    this._element.querySelector(".element__title").textContent = this._name;
    this._element.querySelector(".element__like_counter").textContent = this._likes.length;
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._elemImg.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    this._deleteBtn = this._element.querySelector(".element__delete");
    this._deleteBtn.addEventListener('click', this._handleDelete);

    this._cardLikeBtn = this._element.querySelector(".element__button");
    this._cardLikeBtn.addEventListener('click', this._handleLike);
  }
  _handleDelete = () => {
    this._element.remove();
  }
  _handleLike = () => {
    this._cardLikeBtn.classList.toggle("element__button_active");
  }
}


