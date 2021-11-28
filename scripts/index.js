const closeButton = document.querySelectorAll(".popup__close-button")
const editButton = document.querySelector(".profile__edit-button")
const addButton = document.querySelector(".profile__add-button")
const popup = document.querySelector(".popup_type_info")
const popupAdd = document.querySelector(".popup_type_place")
const formElement = document.querySelector(".popup__input")
const nameInput = formElement.querySelector(".popup__input-text_type_name")
const jobInput = formElement.querySelector(".popup__input-text_type_workplace")
const profileName = document.querySelector(".profile__name")
const profileWorkplace = document.querySelector(".profile__workplace")
const sectionElements = document.querySelector(".elements")
const elementCards = [
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

elementCards.forEach(function (cardElement) {
  const elementCard = document.querySelector(".element__card").content.cloneNode(true);
  const elementPic = elementCard.querySelector(".element__pic")
  elementPic.src = cardElement.link
  elementPic.alt = cardElement.name
  const elementBtn = elementCard.querySelector(".element__button")
  elementBtn.addEventListener('click', like)
  const elementHeading = elementCard.querySelector(".element__title")
  elementHeading.textContent = cardElement.name;
  sectionElements.append(elementCard);
})

function like(event) {
  event.target.classList.toggle("element__button_active")
}

function openPopup(event) {
  nameInput.value = profileName.textContent;
  jobInput.value = profileWorkplace.textContent;
  if (event.target.classList.contains("profile__add-button")) {
    popupAdd.classList.add("popup_opened")
  } else {
    popup.classList.add("popup_opened")
  }
}

function closePopup() {
  popup.classList.remove("popup_opened")
  popupAdd.classList.remove("popup_opened")
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value
  profileWorkplace.textContent = jobInput.value
  closePopup();
}



formElement.addEventListener('submit', formSubmitHandler);
closeButton.forEach(function (button) {
button.addEventListener('click', closePopup)
})
editButton.addEventListener('click', openPopup)
addButton.addEventListener('click', openPopup)

