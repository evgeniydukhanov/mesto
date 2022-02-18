import './index.css';
import { config } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';


const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const popupProfile = document.querySelector(".popup_type_info");
const popupPlace = document.querySelector(".popup_type_place");
const profileForm = popupProfile.querySelector(".popup__input");
const popupAvatar = document.querySelector(".popup_type_avatar");
const avatarForm = popupAvatar.querySelector(".popup__input");
const nameInput = profileForm.querySelector(".popup__input-text_type_name");
const jobInput = profileForm.querySelector(".popup__input-text_type_workplace");
const placeForm = popupPlace.querySelector(".popup__input_place");
const avatarBtn = document.querySelector(".profile__avatar");



function openPopupPlace() {
  popupPlaceClass.open();
  placeFormValidation.setButtonDisabled();
}

function openPopupProfile() {
  if (nameInput.value === "" && jobInput.value === "") {
    nameInput.value = userData.getUserInfo().name;
    jobInput.value = userData.getUserInfo().about;
  }

  popupProfileClass.open();
}

editButton.addEventListener('click', openPopupProfile);
addButton.addEventListener('click', openPopupPlace);

function createCard(data) {
  const card = new Card(data, '#cardTemplate', handleCardClick, userData, handleDeleteBtnClick, handleLikeClick);
  const cardElement = card.generateCard();

  return cardElement;
}

const popupDelete = new PopupWithConfirmation(".popup_type_element");
function handleDeleteBtnClick(card) {
  popupDelete.open();
  popupDelete.setSubmitAction(() => {
    api.deleteCard(card.getId())
      .then(() => {
        card.deleteCard();
        popupDelete.close();
      })
      .catch(err => console.log(`Карточка не удалилась ${err}`))
  })
}

function handleLikeClick(card) {
  if (card.isLiked()) {
    api.deleteLike(card.getId())
      .then((newLikes) => {
        card.likeAmount(newLikes);
      })
      .catch((err) =>
        console.log(`${err}`)
      );
  } else {
    api.putLike(card.getId())
      .then((newLikes) => {
        card.likeAmount(newLikes);
      })
      .catch((err) =>
        console.log(`${err}`)
      );
  }
}

function handleCardClick(name, link) {
  popupWithImage.open({ name, link });
}
avatarBtn.addEventListener("click", () => {
  popupAvatarClass.open();
  avatarFormValidation.setButtonDisabled();
})

const popupWithImage = new PopupWithImage(".popup_type_pic");
const userData = new UserInfo({ nameSelector: ".profile__name", workplaceSelector: ".profile__workplace", avatarSelector: ".profile__avatar" })
const placeFormValidation = new FormValidator(config, placeForm);
const profileFormValidation = new FormValidator(config, profileForm);
const avatarFormValidation = new FormValidator(config, avatarForm)
const popupAvatarClass = new PopupWithForm({
  popupSelector: '.popup_type_avatar',
  handleFormSubmit: ({ avatar }) => {
    popupAvatarClass.showLoading(true);
    api.patchAvatar(avatar)
      .then((data) => {
        userData.setUserInfo(data);
        popupAvatarClass.close();
      })
      .catch((err) =>
        console.log(`${err}`)
      )
      .finally(() => {
        popupAvatarClass.showLoading(false, 'Сохранить')
      })
  }
});
const popupProfileClass = new PopupWithForm({
  popupSelector: '.popup_type_info',
  handleFormSubmit: ({ name, about }) => {
    popupProfileClass.showLoading(true);
    api.patchUserInfo({ name, about })
      .then((data) => {
        userData.setUserInfo(data);
        popupProfileClass.close();
      })
      .catch((err) =>
        console.log(`${err}`)
      )
      .finally(() => {
        popupProfileClass.showLoading(false, 'Сохранить')
      })
  }
});
const popupPlaceClass = new PopupWithForm({
  popupSelector: '.popup_type_place',
  handleFormSubmit: ({ placeName, placeLink }) => {
    popupPlaceClass.showLoading(true);
    api.addCard({ name: placeName, link: placeLink })
      .then(card => {
        const newCard = createCard(card);
        cardList.prependItem(newCard);
        popupPlaceClass.close();
      })
      .catch((err) =>
        console.log(`${err}`))
      .finally(() => {
        popupProfileClass.showLoading(false, 'Cоздать')
      })
  }
});

const cardList = new Section({
  renderer: (item) => {
    return createCard(item)
  },
},
  ".elements");

const api = new Api({
  address: 'https://mesto.nomoreparties.co/v1/cohort-35/',
  token: '529554a2-647f-490d-a484-0555ee80cbf1'
})



avatarFormValidation.enableValidation();
placeFormValidation.enableValidation();
profileFormValidation.enableValidation();

popupDelete.setEventListeners();
popupProfileClass.setEventListeners();
popupPlaceClass.setEventListeners();
popupWithImage.setEventListeners();
popupAvatarClass.setEventListeners();

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([newUserData, cards]) => {
    userData.setUserInfo(newUserData);
    cardList.renderItems(cards);
  })
  .catch((err) =>
    console.log(`${err}`)
  );

