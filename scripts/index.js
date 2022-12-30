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
const popupCard = document.querySelector(".popup__open-card");
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
  const elementCard = buttonDelete.target.closest(".element");
  elementCard.remove();
}


// функция добавления содержимого в popupCard 
function openPopupCard(event) {
  openPopup(popupCard);
  const getCard = event.target.closest('.element');
  const cardText = getCard.querySelector('.element__paragraph').textContent;
  
  popupCardNameImage.textContent = cardText;

  const cardImageLink = event.target.getAttribute('src');
  popupCardImage.setAttribute('src', cardImageLink);

}


  popupCloseButtonOpenCard.addEventListener('click', function () {
    closePopup(popupCard);
  })

// функция создания карточки
function createCard(textCard, linkImage) {
  const cardsElement = cardTemplate.cloneNode(true);
  const cardImage = cardsElement.querySelector(".element__image");
  const cardName = cardsElement.querySelector(".element__paragraph");
  cardImage.setAttribute("src", linkImage);
  cardName.textContent = textCard;

  const buttonDelete = cardsElement.querySelector(".element__button-delete");
  buttonDelete.addEventListener('click', deleteCard);

  const likeButton = cardsElement.querySelector(".element__button");
  likeButton.addEventListener('click', likeButtonActive);

  cardImage.addEventListener('click', openPopupCard);

  return cardsElement;
}

popupCloseButtonOpenCard.addEventListener('click', function () {
  closePopup(popupCard);
})


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
  console.log(newCard)
  sectionCards.prepend(newCard);
  closePopup(popupAddCard);
}

popupSaveButtonAddCard.addEventListener('click', addNewCard)












