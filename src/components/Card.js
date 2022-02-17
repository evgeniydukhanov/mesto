export default class Card {
  constructor(data, selector, handleCardClick, userData, handleDeleteBtnClick, handleLikeClick) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteBtnClick = handleDeleteBtnClick;
    this._likes = data.likes || [];
    this._id = data._id;
    this._isLiked = data.likes.some((like) => userData._userId === like._id)
    this._handleLikeClick = handleLikeClick;
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
    if(this._isLiked) {
      this._cardLikeBtn.classList.add("element__button_active");
     }
    return this._element;
  }
  showDeleteBtn() {
    if (this._deletable) {
      this._delBtn.style.display = 'block';
    }
  }
  isLiked(){
    return this._isLiked;
  }
  _setEventListeners() {
    this._elemImg.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
    this._cardLikeBtn = this._element.querySelector(".element__button");
    this._cardLikeBtn.addEventListener('click', this._handleLike);
    this._delBtn.addEventListener('click', () => { this._handleDeleteBtnClick(this) });
    this._cardLikeBtn.addEventListener('click', () => { this._handleLikeClick(this)});
  }
  deleteCard = () => {
    this._element.remove();
  }
  changeLikeBtnColor(){
    if(this._isLiked){
      this._cardLikeBtn.classList.remove("element__button_active");
    }else{
      this._cardLikeBtn.classList.add("element__button_active");
    }
  }
  likeAmount = (response) => {
    this.changeLikeBtnColor();
    this._isLiked = !this._isLiked;
    this._likes = response.likes;
    this._element.querySelector(".element__like_counter").textContent = response.likes.length;
  }
  getId() {
    return this._id;
  }
}


