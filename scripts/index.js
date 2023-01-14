const popupArray = Array.from(document.querySelectorAll(".popup"));
const popupEditProfile = document.querySelector(".popup_edit-profile");
const popupForm = popupEditProfile.querySelector(".popup__form");
const popupInputArray = Array.from(document.querySelector(".popup__input"));
const popupInputName = popupEditProfile.querySelector(".popup__input_info_name");
const popupInputDescription = popupEditProfile.querySelector(".popup__input_info_description");
const popupCloseButton = popupEditProfile.querySelectorAll(".popup__close-button");
const popupCloseButtonEditProfile = popupEditProfile.querySelector(".popup__close-button_edit-profile");
const popupAddCard = document.querySelector(".popup_add-card");
const popupCloseButtonAddCard = popupAddCard.querySelector(".popup__close-button_add-card");
const popupSaveButtonAddCard = popupAddCard.querySelector(".popup__save-button_add-card");
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
const cardTemplate = document.querySelector("#cardTemplate").content;


// функция закрытия попапа при нажатие на 'Escape'
function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// слушатель для закрытие попапа при клике в пустоту
popupArray.forEach(function (popupItem) {
  popupItem.addEventListener('click', function (evt) {
     if (evt.target.classList.contains('popup')) {
      closePopup(popupItem);
     }
  })
})


// функция открытия попапа
function openPopup(popupName) {
  popupName.classList.add("popup_opened");
  document.addEventListener('keydown', closeByEsc);
}

// функция закрытия попапа
function closePopup(popupName) {
  popupName.classList.remove("popup_opened");
  document.removeEventListener('keydown', closeByEsc);
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = popupInputName.value;
  profileSubtitle.textContent = popupInputDescription.value;
  closePopup(popupEditProfile);
}

// создание и удаления активной кнопки likeButton
function likeButtonActive(event) {
  event.target.classList.toggle("element__button_active");
}

// функция удаления карточки
function deleteCard(evt) {
  const elementCard = evt.target.closest(".element");
  elementCard.remove();
}

// функция создания карточки
function createCard(textCard, linkImage) {
  const cardsElement = cardTemplate.querySelector(".element").cloneNode(true);
  const cardName = cardsElement.querySelector(".element__paragraph");
  const cardImage = cardsElement.querySelector(".element__image");
  cardImage.setAttribute("src", linkImage);
  cardName.textContent = textCard;

  cardImage.setAttribute("alt", `Картинка ${cardName.textContent}`);

  const buttonDelete = cardsElement.querySelector(".element__button-delete");
  buttonDelete.addEventListener("click", deleteCard);

  const likeButton = cardsElement.querySelector(".element__button");
  likeButton.addEventListener("click", likeButtonActive);

  cardImage.addEventListener("click", openPopupCard);

  return cardsElement;
}

popupCloseButtonOpenCard.addEventListener("click", function () {
  closePopup(popupCard);
});

// функция добавления карточки при загруке
function downloadFirstCards() {
  initialCards.forEach(function (item) {
    const cardHTML = createCard(item.name, item.link);
    sectionCards.append(cardHTML);
  });
}

downloadFirstCards();

// функция добавления карточки пользователем
function addNewCard(evt) {
  evt.preventDefault();
  const nameCards = popupInputCardName.value;
  const linkCards = popupInputCardLink.value;
  const newCard = createCard(nameCards, linkCards);
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


function checkStatusButton(popupElement, settings) {
  const form = popupElement.querySelector('.popup__form');
  const inputArray = Array.from(form.querySelectorAll('.popup__input'));
  const buttonElement = form.querySelector('.popup__save-button');
  
  inputArray.forEach(function (inputElement) {
    hideInputError(form, inputElement, settings);
  })
  
  toggleButtonState(inputArray, buttonElement, settings);
}

//  вызов функции валидации форм
enableValidation(objectSetting);


popupCloseButtonEditProfile.addEventListener("click", function () {
  closePopup(popupEditProfile);
});

profileEditButton.addEventListener("click", function () {
  openPopup(popupEditProfile);
  popupInputName.value = profileTitle.textContent;
  popupInputDescription.value = profileSubtitle.textContent;
  checkStatusButton(popupEditProfile, objectSetting);
});

popupForm.addEventListener("submit", handleFormSubmit);

// открытие и закрытие popupAddCard
profileAddButton.addEventListener("click", function () {
  openPopup(popupAddCard);
  checkStatusButton(popupAddCard, objectSetting);
});

popupCloseButtonAddCard.addEventListener("click", function () {
  closePopup(popupAddCard);
});

popupSaveButtonAddCard.addEventListener("click", addNewCard);

popupCloseButtonOpenCard.addEventListener("click", function () {
  closePopup(popupCard);
});





