import './index.css';
import { initialCards } from "../utils/constants.js";
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
const placeForm = popupPlace.querySelector(".popup__input_place");

function openPopupPlace() {
  popupPlaceClass.open();
  placeFormValidation.setButtonDisabled();
}

function openPopupProfile() {
  if (nameInput.value === "" && jobInput.value === "") {
    nameInput.value = userData.getUserInfo().name;
    jobInput.value = userData.getUserInfo().workplace;
  }

  popupProfileClass.open();
}

editButton.addEventListener('click', openPopupProfile);
addButton.addEventListener('click', openPopupPlace);

function createCard(data) {
  const card = new Card(data, '#cardTemplate', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

function handleCardClick(name, link) {
  popupWithImage.open({ name, link });
}

const popupWithImage = new PopupWithImage(".popup_type_pic");
const userData = new UserInfo({ nameSelector: ".profile__name", workplaceSelector: ".profile__workplace" })
const placeFormValidation = new FormValidator(config, placeForm);
const profileFormValidation = new FormValidator(config, profileForm);
const popupProfileClass = new PopupWithForm({
  popupSelector: '.popup_type_info',
  handleFormSubmit: ({ name, workplace }) => {
    userData.setUserInfo({ name, workplace });
    popupProfileClass.close();
  }
});

const popupPlaceClass = new PopupWithForm({
  popupSelector: '.popup_type_place',
  handleFormSubmit: ({ placeName, placeLink }) => {
    const newCard = createCard({ name: placeName, link: placeLink });
    cards.prependItem(newCard);
    popupPlaceClass.close();
  }
});

const cards = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item);
    cards.addItem(card);
  },
},
  ".elements");
cards.renderItems();

placeFormValidation.enableValidation();
profileFormValidation.enableValidation();

popupProfileClass.setEventListeners();
popupPlaceClass.setEventListeners();
popupWithImage.setEventListeners();