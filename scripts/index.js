const popup = document.querySelector(".popup");
const popupEditProfile = document.querySelector(".popup__edit-profile");
const popupForm = popup.querySelector(".popup__form");
const popupInputName = popup.querySelector(".popup__input_info_name");
const popupInputDescription = popup.querySelector(".popup__input_info_description");
const popupCloseButton = popup.querySelectorAll(".popup__close-button");
const popupCloseButtonEditProfile = popup.querySelector(".popup__close-button_edit-profile");
const popupAddCard = document.querySelector(".popup__add-card");
const popupCloseButtonAddCard = popupAddCard.querySelector(".popup__close-button_add-card");
const popupSaveButtonAddCard = popupAddCard.querySelector(".popup__save-button_add-card");
const popupInputCardName = popupAddCard.querySelector(".popup__input_card_name");
const popupInputCardLink = popupAddCard.querySelector(".popup__input_card_link");
const popupOpenCard = document.querySelector(".popup__open-card");
const popupCloseButtonOpenCard = popupOpenCard.querySelector(".popup__close-button_open-card");
const popupOpenCardImage = popupOpenCard.querySelector(".popup__image");
const popupOpenCardNameImage = popupOpenCard.querySelector(".popup__name-image");
const profile = document.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit-button");
const profileAddButton = profile.querySelector(".profile__add-button");
const profileTitle = profile.querySelector(".profile__title");
const profileSubtitle = profile.querySelector(".profile__subtitle");
const sectionCards = document.querySelector(".elements");
const cardTemplate = document.querySelector("#cardTemplate");


// функция открытия попапа
function openPopup(popupName) {
  popupName.classList.add("popup_opened");
}
profileEditButton.addEventListener("click", function () {
  openPopup(popupEditProfile);
  popupInputName.value = profileTitle.textContent;
  popupInputDescription.value = profileSubtitle.textContent;
});
// функция закрытия попапа
function closePopup(popupName) {
  popupName.classList.remove("popup_opened");
}

popupCloseButtonEditProfile.addEventListener("click", function () {
  closePopup(popupEditProfile);
});

function handleFormSubmit(evt) {
  evt.preventDefault();
  const newAttributeName = popupInputName.value;
  const newAttributeDescription = popupInputDescription.value;
  profileTitle.textContent = newAttributeName;
  profileSubtitle.textContent = newAttributeDescription;
  closePopup(popupEditProfile);
}

popupForm.addEventListener("submit", handleFormSubmit);

// открытие и закрытие popupAddCard
profileAddButton.addEventListener("click", function () {
  openPopup(popupAddCard);
});

popupCloseButtonAddCard.addEventListener("click", function () {
  closePopup(popupAddCard);
});

// массив с карточками добавлеными при загрузке странице
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

 // создание и удаления активной кнопки likeButton
function likeButtonActive(event) {
  const likeButtonTarget = event.target;
  likeButtonTarget.classList.toggle("element__button_active");
}

// функция удаления карточки
function deleteCard(buttonDelete) {
  const buttonDeleteTarget = buttonDelete.target;

  const elementCard = buttonDeleteTarget.closest(".element");
  elementCard.remove();
}


// функция добавления карточек при загрузке
function addCardsOnLoad(textCard, linkImage) {
  const cardContent = cardTemplate.content;
  const cardsElement = cardContent.cloneNode(true);
  const likeButton = cardsElement.querySelector(".element__button");
  const buttonDelete = cardsElement.querySelector(".element__button-delete"); 
  buttonDelete.addEventListener('click', deleteCard);
  const cardImage = cardsElement.querySelector(".element__image");
  cardImage.setAttribute("src", linkImage);
  const cardName = cardsElement.querySelector(".element__paragraph");
  cardName.textContent = textCard;
  
  // функция открытия и закрытия popupOpenCard для карточек добавленных при загрузке
  const cardImageLink = cardImage.getAttribute('src');
  const cardNameText = cardName.textContent;
  cardImage.addEventListener('click', function () {
    openPopup(popupOpenCard);
    popupOpenCardImage.setAttribute('src', cardImageLink)
    popupOpenCardNameImage.textContent = cardNameText;
  })
  popupCloseButtonOpenCard.addEventListener("click", function () {
    closePopup(popupOpenCard);
  })

  likeButton.addEventListener('click', likeButtonActive);
  sectionCards.append(cardsElement);
}



  function downloadFirstCards() {
  initialCards.forEach(function (item) {
    addCardsOnLoad(item.name, item.link);
  });
}

downloadFirstCards();

// функция добавления карточки пользователем
function addUserCard(evt) {
  evt.preventDefault();
  const nameCards = popupInputCardName.value;
  const linkCards = popupInputCardLink.value;
  const cardContent = cardTemplate.content;
  const cardsElement = cardContent.cloneNode(true);
  const likeButton = cardsElement.querySelector(".element__button");
  const buttonDelete = cardsElement.querySelector(".element__button-delete"); 
  
  // функция открытия popupOpenCard для карточек добавленых пользователем
  const cardImage = cardsElement.querySelector(".element__image");
  cardImage.setAttribute("src", linkCards);
  const cardName = cardsElement.querySelector(".element__paragraph");
  cardName.textContent = nameCards;
  const cardImageLink = cardImage.getAttribute('src');
  const cardNameText = cardName.textContent;
  cardImage.addEventListener('click', function () {
    openPopup(popupOpenCard);
    popupOpenCardImage.setAttribute('src', cardImageLink)
    popupOpenCardNameImage.textContent = cardNameText;
  })
  popupCloseButtonOpenCard.addEventListener("click", function () {
    closePopup(popupOpenCard);
  })

  buttonDelete.addEventListener('click', deleteCard);
  cardsElement.querySelector(".element__image").setAttribute("src", linkCards);
  cardsElement.querySelector(".element__paragraph").textContent = nameCards;
  likeButton.addEventListener('click', likeButtonActive);
  sectionCards.prepend(cardsElement);
  closePopup(popupAddCard);
}

popupSaveButtonAddCard.addEventListener("click", addUserCard);











