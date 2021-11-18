console.log('loaded');

const closeButton = document.querySelector(".popup__close-button")
const editButton = document.querySelector(".profile__edit-button")
const popup = document.querySelector(".popup")
const formElement = document.querySelector(".popup__input")
let nameInput = formElement.querySelector(".popup__input-text_type_name")
let jobInput = formElement.querySelector(".popup__input-text_type_workplace")
let profileName = document.querySelector(".profile__name")
let profileWorkplace = document.querySelector(".profile__workplace")


function openPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileWorkplace.textContent;
  popup.classList.add("popup_opened")
}

function closePopup() {
  popup.classList.remove("popup_opened")
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value
  profileWorkplace.textContent = jobInput.value
  closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);
closeButton.addEventListener('click', closePopup)
editButton.addEventListener('click', openPopup)
