import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";

const popups = document.querySelectorAll('.popup')
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
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const config = {
  formSelector: '.popup__input',
  inputSelector: '.popup__input-text',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input-text_error',
  errorClass: 'error_visible'
};

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keyup", handleEsc)
}

function openPopupProfile() {
  if (nameInput.value === "" && jobInput.value === "") {
    nameInput.value = profileName.textContent;
    jobInput.value = profileWorkplace.textContent;
  }
  openPopup(popupProfile);
  profileFormValidation.enableValidation();
}

function openPopupPlace() {
  openPopup(popupPlace);
  placeFormValidation.enableValidation();
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keyup", handleEsc)
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileWorkplace.textContent = jobInput.value;
  closePopup(popupProfile);
}

function handlePlaceFormSubmit(evt) {
  evt.preventDefault();
  const inputs = {
    name: inputEl.value,
    link: inputImg.value,
  };

  const newCard = createCard(inputs);
  cardsContainer.prepend(newCard);
  inputEl.value = "";
  inputImg.value = "";
  placeFormValidation.setButtonDisabled();
  closePopup(popupPlace);
}

function handleEsc(event) {
  if (event.key === "Escape" || event.key === "Esc") {
    const activePopup = document.querySelector(".popup_opened");
    closePopup(activePopup);
  }
}

// popups.forEach((popup) => {
//   popup.addEventListener('click', (evt) => {
//     if (evt.target.classList.contains('popup__close-button')) {
//       closePopup(popup);
//     }
//     if (evt.target.classList.contains('popup__overlay')) {
//       closePopup(popup);
//     }
//   })
// });

placeForm.addEventListener('submit', handlePlaceFormSubmit);
profileForm.addEventListener('submit', handleProfileFormSubmit);
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


const placeFormValidation =
  new FormValidator(config, placeForm);
// placeFormValidation.enableValidation();

const profileFormValidation =
  new FormValidator(config, profileForm);
// profileFormValidation.enableValidation();

const cards = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item);
    cards.addItem(card);
  },
},
  cardsContainer);
cards.renderItems();

