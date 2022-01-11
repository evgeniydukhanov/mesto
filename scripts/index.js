import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const popup = document.querySelector(".popup");
const popupProfile = document.querySelector(".popup_type_info");
const popupPlace = document.querySelector(".popup_type_place");
const popupPicture = document.querySelector(".popup_type_pic");
const closeProfileButton = popupProfile.querySelector(".popup__close-button");
const closePlaceButton = popupPlace.querySelector(".popup__close-button");
const closePictureButton = popupPicture.querySelector(".popup__close-button");
const formElement = document.querySelector(".popup__input");
const nameInput = formElement.querySelector(".popup__input-text_type_name");
const jobInput = formElement.querySelector(".popup__input-text_type_workplace");
const profileName = document.querySelector(".profile__name");
const profileWorkplace = document.querySelector(".profile__workplace");
const cardsContainer = document.querySelector(".elements");
// const templateEl = document.querySelector(".template__card");
const inputEl = document.querySelector(".popup__input-text_type_placeName");
const inputImg = document.querySelector(".popup__input-text_type_placeLink");
const formElementPlace = document.querySelector(".popup__input_place");
const popupOverlay = popup.querySelector(".popup__overlay");
const popupPlaceOverlay = popupPlace.querySelector(".popup__overlay");
const popupPicOverlay = popupPicture.querySelector(".popup__overlay");
const placeSubmitButton = popupPlace.querySelector(".popup__save-button");
// const bigPicture = popupPicture.querySelector(".popup__big-picture")
// const bigPictureCaption = popupPicture.querySelector(".popup__pic-caption");
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
  formSelector : '.popup__input',
  inputSelector : '.popup__input-text',
  submitButtonSelector : '.popup__save-button',
  inactiveButtonClass : 'popup__save-button_disabled',
  inputErrorClass : 'popup__input-text_error',
  errorClass : 'error_visible'
};
// function getItem(item) {
//   const newItem = templateEl.content.cloneNode(true);
//   const cardTitle = newItem.querySelector(".element__title");
//   const cardPic = newItem.querySelector(".element__pic");
//   const likeBtn = newItem.querySelector(".element__button");
//   const deleteBtn = newItem.querySelector(".element__delete");
//   deleteBtn.addEventListener('click', handleDelete);
//   cardTitle.textContent = item.name;
//   cardPic.src = item.link;
//   cardPic.alt = item.name
//   likeBtn.addEventListener('click', like(likeBtn));
//   cardPic.addEventListener('click', handlePopupImg);

//   return newItem;
// }

// function render() {
//   const html = initialCards
//     .map((item) => {
//       return getItem(item);
//     });

//   cardsContainer.append(...html);
// }

// function handleDelete(evt) {
//   const targetEl = evt.target;
//   const listItem = targetEl.closest(".element");
//   listItem.remove();
// }

// function like(likeBtn) {
//   likeBtn.addEventListener('click', () => likeBtn.classList.toggle("element__button_active"));
// }

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
}

function openPopupPlace() {
  placeSubmitButton.classList.add('popup__save-button_disabled');
  placeSubmitButton.setAttribute('disabled', 'disabled');
  openPopup(popupPlace);
}


// function handlePopupImg(evt) {
//   const targetImg = evt.target;
//   const elementImg = targetImg.closest(".element");

//   bigPictureCaption.textContent = elementImg.textContent;
//   bigPicture.src = elementImg.querySelector(".element__pic").src;
//   bigPicture.alt = elementImg.textContent;
//   openPopup(popupPicture);
// }

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keyup", handleEsc)
}

function submitHandlerform(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileWorkplace.textContent = jobInput.value;
  closePopup(popupProfile);
}

// function submitPlaceform(evt) {
//   evt.preventDefault();
//   const newCardName = inputEl.value
//   const newCardLink = inputImg.value
//   const newCard = getItem({ name: newCardName, link: newCardLink, alt: newCardName });
//   cardsContainer.prepend(newCard);
//   inputEl.value = "";
//   inputImg.value = "";
//   closePopup(popupPlace);
// }
function submitPlaceform(evt) {
  evt.preventDefault();
  const inputs = {
    name: inputEl.value,
    link: inputImg.value,
  };

  const newCard = createCard(inputs);
  cardsContainer.prepend(newCard);
  inputEl.value = "";
  inputImg.value = "";
  closePopup(popupPlace);
}

function handleEsc(event) {
  if (event.key === "Escape" || event.key === "Esc") {
    const activePopup = document.querySelector(".popup_opened");
    closePopup(activePopup);
  }
}

popupOverlay.addEventListener('click', () => {
  closePopup(popupProfile);
});

popupPlaceOverlay.addEventListener('click', () => {
  closePopup(popupPlace);
});

popupPicOverlay.addEventListener('click', () => {
  closePopup(popupPicture);
});

closeProfileButton.addEventListener('click', () => {
  closePopup(popupProfile);
});

closePlaceButton.addEventListener('click', () => {
  closePopup(popupPlace);
});

closePictureButton.addEventListener('click', () => {
  closePopup(popupPicture);
});

formElementPlace.addEventListener('submit', submitPlaceform);
formElement.addEventListener('submit', submitHandlerform);
editButton.addEventListener('click', openPopupProfile);
addButton.addEventListener('click', openPopupPlace);


// render();


function createCard(data) {
  const card = new Card(data, '#cardTemplate', openPopup);
  const cardElement = card.generateCard();
  return cardElement;
}

initialCards.forEach((item) => {
  const card = createCard(item);
  cardsContainer.append(card);
});


formElement.addEventListener('submit', submitHandlerform);
formElementPlace.addEventListener('submit', submitPlaceform);

const PlaceFormValidation =
  new FormValidator(config, formElementPlace);
PlaceFormValidation.enableValidation();

const profileFormValidation =
  new FormValidator(config, formElement);
profileFormValidation.enableValidation();
