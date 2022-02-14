import './index.css';
import { config } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupDelete from '../components/PopupDelete.js';

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const popupProfile = document.querySelector(".popup_type_info");
const popupPlace = document.querySelector(".popup_type_place");
const profileForm = popupProfile.querySelector(".popup__input");
const nameInput = profileForm.querySelector(".popup__input-text_type_name");
const jobInput = profileForm.querySelector(".popup__input-text_type_workplace");
const placeForm = popupPlace.querySelector(".popup__input_place");

const popupDelete = new PopupDelete(".popup_type_element");
popupDelete.setEventListeners();

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
  const card = new Card(data, '#cardTemplate', handleCardClick, userData);
  const cardElement = card.generateCard();

  return cardElement;
}

function handleCardClick(name, link) {
  popupWithImage.open({ name, link });
}

const popupWithImage = new PopupWithImage(".popup_type_pic");
const userData = new UserInfo({ nameSelector: ".profile__name", workplaceSelector: ".profile__workplace", avatarSelector: ".profile__avatar" })
const placeFormValidation = new FormValidator(config, placeForm);
const profileFormValidation = new FormValidator(config, profileForm);
const popupProfileClass = new PopupWithForm({
  popupSelector: '.popup_type_info',
  handleFormSubmit: ({ name, about, avatar }) => {
    userData.setUserInfo({ name, about, avatar });
    api.patchUserInfo({ name, about });
    popupProfileClass.close();
  }
});

const popupPlaceClass = new PopupWithForm({
  popupSelector: '.popup_type_place',
  handleFormSubmit: ({ placeName, placeLink }) => {
    api.addCard({ name: placeName, link: placeLink })
      .then(card => {
        const newCard = createCard(card);
        cardList.prependItem(newCard);
        popupPlaceClass.close();
      })
  }
});

const cardList = new Section({
  renderer: (item) => {
    return createCard(item)
  },
},
  ".elements")
  ;

const api = new Api({
  address: 'https://mesto.nomoreparties.co/v1/cohort-35/',
  token: '529554a2-647f-490d-a484-0555ee80cbf1'
})


placeFormValidation.enableValidation();
profileFormValidation.enableValidation();

popupProfileClass.setEventListeners();
popupPlaceClass.setEventListeners();
popupWithImage.setEventListeners();

Promise.all([api.getUserInfo(), api.getCards()])
  .then(([newUserData, cards]) => {
    userData.setUserInfo(newUserData);
    cardList.renderItems(cards);
  })
  .catch((err) =>
    console.log(`${err}`)
  );

