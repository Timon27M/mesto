import { Card } from "./Card.js";
import {  FormValidator } from "./FormValidator.js";
import { objectSetting } from "./objectSetting.js";
import { initialCards } from "./cards.js"

const popupArray = Array.from(document.querySelectorAll(".popup"));
const popupEditProfile = document.querySelector(".popup_edit-profile");
const popupFormEditProfile = popupEditProfile.querySelector(".popup__form");
const popupInputName = popupEditProfile.querySelector(".popup__input_info_name");
const popupInputDescription = popupEditProfile.querySelector(".popup__input_info_description");
const popupCloseButtonEditProfile = popupEditProfile.querySelector(".popup__close-button_edit-profile");
const popupAddCard = document.querySelector(".popup_add-card");
const popupFormAddCard = popupAddCard.querySelector(".popup__form");
const popupCloseButtonAddCard = popupAddCard.querySelector(".popup__close-button_add-card");
const popupInputCardName = popupAddCard.querySelector(".popup__input_card_name");
const popupInputCardLink = popupAddCard.querySelector(".popup__input_card_link");
const popupCard = document.querySelector(".popup_open-card");
const popupCloseButtonOpenCard = popupCard.querySelector(".popup__close-button_open-card");
const popupCardImage = popupCard.querySelector(".popup__image");
const popupCardNameImage = popupCard.querySelector(".popup__name-image");
const profile = document.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit-button");
const profileAddButton = profile.querySelector(".profile__add-button");
const profileTitle = profile.querySelector(".profile__title");
const profileSubtitle = profile.querySelector(".profile__subtitle");
const sectionCards = document.querySelector(".elements");

// функция закрытия попапа при нажатие на 'Escape'
function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

// слушатель для закрытие попапа при клике в пустоту
popupArray.forEach(function (popupItem) {
  popupItem.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("popup")) {
      closePopup(popupItem);
    }
  });
});

// функция открытия попапа
function openPopup(popupName) {
  popupName.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEsc);
}

// функция закрытия попапа
function closePopup(popupName) {
  popupName.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEsc);
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = popupInputName.value;
  profileSubtitle.textContent = popupInputDescription.value;
  closePopup(popupEditProfile);
}


// функция добавления карточки пользователем
function addNewCard(evt) {
  evt.preventDefault();
  const nameCards = popupInputCardName.value;
  const linkCards = popupInputCardLink.value;
  const objCard = {
    name: nameCards, 
    link: linkCards,
  }
  const newCard = new Card(objCard, '.cardTemplate').generateCard();
  sectionCards.prepend(newCard);
  closePopup(popupAddCard);
  popupInputCardName.value = "";
  popupInputCardLink.value = "";
}

// функция добавления содержимого в popupCard
function openPopupCard(event) {
  const getCard = event.target.closest(".element");
  const cardText = getCard.querySelector(".element__paragraph").textContent;

  popupCardNameImage.textContent = cardText;

  const cardImageLink = event.target.getAttribute("src");
  popupCardImage.setAttribute("src", cardImageLink);
  popupCardImage.setAttribute("alt", `Картинка ${cardText}`);

  openPopup(popupCard);
}


popupCloseButtonEditProfile.addEventListener("click", function () {
  closePopup(popupEditProfile);
});

// добавление валидации форм попапа редактирования профиля
const formValidatorProfile = new FormValidator(objectSetting, popupFormEditProfile);
formValidatorProfile.enableValidation();

// функция открытие попапа редактирования профиля
function openPopupProfile() {
  openPopup(popupEditProfile);
  formValidatorProfile.resetActiveError();
  popupInputName.value = profileTitle.textContent;
  popupInputDescription.value = profileSubtitle.textContent;
}

profileEditButton.addEventListener("click", openPopupProfile);


popupFormEditProfile.addEventListener("submit", handleFormSubmit);

// добавление фалидации форм для попапа добавления карточек
const formValidatoAddCard = new FormValidator(objectSetting, popupFormAddCard);
formValidatoAddCard.enableValidation();

// функция открытия попапа добавления карточек
function openPopupAddCard() {
  openPopup(popupAddCard);
  formValidatoAddCard.resetActiveError();
  popupInputCardName.value = "";
  popupInputCardLink.value = "";
}
// открытие и закрытие popupAddCard
profileAddButton.addEventListener("click", openPopupAddCard);

popupCloseButtonAddCard.addEventListener("click", function () {
  closePopup(popupAddCard);
});

popupFormAddCard.addEventListener("submit", addNewCard);

popupCloseButtonOpenCard.addEventListener("click", function () {
  closePopup(popupCard);
});


// создание перввых карточек при загрузке
initialCards.forEach((item) => {
  const card = new Card(item, '.cardTemplate', openPopupCard);

  const cardElement = card.generateCard();

  sectionCards.append(cardElement);
})

export { openPopupCard }
