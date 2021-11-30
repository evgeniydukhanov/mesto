const editButton = document.querySelector(".profile__edit-button")
const addButton = document.querySelector(".profile__add-button");
const popup = document.querySelector(".popup");
const popupProfile = document.querySelector(".popup_type_info");
const popupPlace = document.querySelector(".popup_type_place");
const closeProfileButton = popupProfile.querySelector(".popup__close-button")
const closePlaceButton = popupPlace.querySelector(".popup__close-button")
const formElement = document.querySelector(".popup__input");
const nameInput = formElement.querySelector(".popup__input-text_type_name");
const jobInput = formElement.querySelector(".popup__input-text_type_workplace");
const profileName = document.querySelector(".profile__name");
const profileWorkplace = document.querySelector(".profile__workplace");
const cardContainer = document.querySelector(".elements");
const templateEl = document.querySelector(".template__card");
const inputEl = document.querySelector(".popup__input-text_type_placeName");
const inputImg = document.querySelector(".popup__input-text_type_placeLink");
const formElementPlace = document.querySelector(".popup__input_place");
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

function render() {
  const html = initialCards
    .map((item, idx, arr) => {
      return getItem(item);
    });

  cardContainer.append(...html);
}

function getItem(item) {
  const newItem = templateEl.content.cloneNode(true);
  const cardTitle = newItem.querySelector(".element__title");
  const cardPic = newItem.querySelector(".element__pic");
  const likeBtn = newItem.querySelector(".element__button");
  const deleteBtn = newItem.querySelector(".element__delete");
  deleteBtn.addEventListener('click', handleDelete);
  cardTitle.textContent = item.name;
  cardPic.src = item.link;
  cardPic.alt = item.name
  likeBtn.addEventListener('click', like(likeBtn))
  return newItem;
}

function handleDelete(evt) {
  const targetEl = evt.target;
  const listItem = targetEl.closest(".element");
  listItem.remove();
}

function like(likeBtn) {
  likeBtn.addEventListener('click', () => likeBtn.classList.toggle("element__button_active"));
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function openPopupProfile() {
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileWorkplace.textContent;
}

function openPopupPlace() {
  openPopup(popupPlace);
  inputEl.value = '';
  inputImg.value = '';
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

closeProfileButton.addEventListener('click', () => {
  closePopup(popupProfile);
});

closePlaceButton.addEventListener('click', () => {
  closePopup(popupPlace);
});

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value
  profileWorkplace.textContent = jobInput.value
  closePopup(popupProfile);
}

function formSubmitPlace(evt) {
  evt.preventDefault();
  const newCardName = inputEl.value
  const newCardLink = inputImg.value
  const newCard = getItem({ name: newCardName, link: newCardLink, alt: newCardName });
  cardContainer.prepend(newCard);
  closePopup(popupPlace);
}

formElementPlace.addEventListener('submit', formSubmitPlace);
formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', openPopupProfile);
addButton.addEventListener('click', openPopupPlace);



render();



