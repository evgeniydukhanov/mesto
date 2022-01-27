import {initialCards} from "../utils/constants.js";
import { config } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const popupProfile = document.querySelector(".popup_type_info");
const popupPlace = document.querySelector(".popup_type_place");
const profileForm = popupProfile.querySelector(".popup__input");
const nameInput = profileForm.querySelector(".popup__input-text_type_name");
const jobInput = profileForm.querySelector(".popup__input-text_type_workplace");
const profileName = document.querySelector(".profile__name");
const profileWorkplace = document.querySelector(".profile__workplace");
const cardsContainer = document.querySelector(".elements");
const placeForm = popupPlace.querySelector(".popup__input_place");
const inputEl = placeForm.querySelector(".popup__input-text_type_placeName");
const inputImg = placeForm.querySelector(".popup__input-text_type_placeLink");

function openPopupPlace() {
  popupPlaceClass.open();
  placeFormValidation.enableValidation();
}

function openPopupProfile() {
  if (nameInput.value === "" && jobInput.value === "") {
    nameInput.value = userData.getUserInfo().name;
    jobInput.value = userData.getUserInfo().workplace;
  }

  popupProfileClass.open();
  profileFormValidation.enableValidation();
}

function handleProfileFormSubmit() {
  userData.setUserInfo({
    name: nameInput.value,
    workplace: jobInput.value
  });
  popupProfileClass.close();
}

function handlePlaceFormSubmit() {
  const inputs = {
    name: inputEl.value,
    link: inputImg.value,
  };

  const newCard = createCard(inputs);
  cardsContainer.prepend(newCard);
  inputEl.value = "";
  inputImg.value = "";
  placeFormValidation.setButtonDisabled();
  popupPlaceClass.close();
}

editButton.addEventListener('click', openPopupProfile);
addButton.addEventListener('click', openPopupPlace);

function createCard(data) {
  const card = new Card(data, '#cardTemplate', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

function handleCardClick(name, link) {
  const popupWithImage = new PopupWithImage(".popup_type_pic");
  popupWithImage.open({ name, link });
}

const userData = new UserInfo({ nameSelector: profileName, workplaceSelector: profileWorkplace })
const popupPlaceClass = new PopupWithForm('.popup_type_place', handlePlaceFormSubmit);
const popupProfileClass = new PopupWithForm('.popup_type_info', handleProfileFormSubmit)
const placeFormValidation = new FormValidator(config, placeForm);
const profileFormValidation = new FormValidator(config, profileForm);

const cards = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item);
    cards.addItem(card);
  },
},
  cardsContainer);
cards.renderItems();
