console.log('loaded');

const closeButton = document.querySelector(".popup__close-button");
const editButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");


function open() {

  document.getElementById("name").value = document.querySelector(".profile__name").textContent;
  document.getElementById("workplace").value = document.querySelector(".profile__workplace").textContent;

  popup.classList.add("popup_opened");
}

function close() {
  popup.classList.remove("popup_opened");
}

if (editButton) {
  editButton.addEventListener('click', open);
}

closeButton.addEventListener('click', close);


let formElement = document.querySelector(".popup__input");

let nameInput = document.querySelector(".popup__input-name");

let jobInput = document.querySelector(".popup__input-workplace");


function formSubmitHandler(evt) {
  evt.preventDefault();

  let name = document.getElementById("name").value;
  let workplace = document.getElementById("workplace").value;
  let profileNameElement = document.querySelector(".profile__name");
  let profileWorkplace = document.querySelector(".profile__workplace");

  profileNameElement.textContent = name;
  profileWorkplace.textContent = workplace;

  close();
}

formElement.addEventListener('submit', formSubmitHandler);




// заготовка под лайк на следующую ПР.
/*const likeBtn = document.querySelector(".element__button");


function like() {
  likeBtn.classList.toggle("element__button_active");
}

likeBtn.addEventListener('click', like);*/
