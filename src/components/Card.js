export default class Card {
  constructor(data, selector, handleCardClick, userData, handleDeleteBtnClick) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteBtnClick = handleDeleteBtnClick;
    this._likes = data.likes || [];
    this._id = data._id;
    this._deletable = data.owner && data.owner._id === userData._userId;
    this._element = document
      .querySelector(this._selector)
      .content
      .querySelector(".element")
      .cloneNode(true);
    this._delBtn = this._element.querySelector(".element__delete");
  }
  generateCard() {
    this._elemImg = this._element.querySelector(".element__pic");
    this._elemImg.src = this._link;
    this._elemImg.alt = this._name;
    this._element.querySelector(".element__title").textContent = this._name;
    this._element.querySelector(".element__like_counter").textContent = this._likes.length;
    this.showDeleteBtn();
    this._setEventListeners();
    return this._element;
  }
  showDeleteBtn() {
    if (this._deletable) {
      this._delBtn.style.display = 'block';
    }
  }
  _setEventListeners() {
    this._elemImg.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
    this._cardLikeBtn = this._element.querySelector(".element__button");
    this._cardLikeBtn.addEventListener('click', this._handleLike);
    this._delBtn.addEventListener('click', () => { this._handleDeleteBtnClick(this) });
  }
  deleteCard = () => {
    this._element.remove();
  }
  _handleLike = () => {
    this._cardLikeBtn.classList.toggle("element__button_active");
  }
  getId() {
    return this._id;
  }
}


