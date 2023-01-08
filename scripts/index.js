const popup = document.querySelector(".popup");
// const popupContainer = popup.querySelector(".popup__container");
const popupEditProfile = document.querySelector(".popup_edit-profile");
const popupForm = popup.querySelector(".popup__form");
const popupInputName = popup.querySelector(".popup__input_info_name");
const popupInputDescription = popup.querySelector(".popup__input_info_description");
const popupCloseButton = popup.querySelectorAll(".popup__close-button");
const popupCloseButtonEditProfile = popup.querySelector(".popup__close-button_edit-profile");
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

  function arr() {
  const popupArray = Array.from(document.querySelectorAll(".popup"));
  popupArray.forEach(function (popupArrayItem) {
    console.log(popupArrayItem);
    if (popupArrayItem.classList.contains('popup_opened')) {
      document.addEventListener('keydown', function (evt) {
        if (evt.key === 'escape') {
          closePopup(popupArrayItem);
        }
      })
    }
  });
  };

  console.log(arr());

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

function cancelPropagation(evt) {
  evt.stopPropagation();
}


function getArrayPopup() {
  const popupArray = Array.from(document.querySelectorAll(".popup"));

  popupArray.forEach(function (popupArrayItem) {
    const popupContainerArrayItem = popupArrayItem.querySelector(".popup__container");
    popupContainerArrayItem.addEventListener('click', cancelPropagation);
    popupArrayItem.addEventListener('click', function () {
      closePopup(popupArrayItem)
    });
  })
}
console.log(getArrayPopup());

// функция открытия попапа
function openPopup(popupName) {
  popupName.classList.add("popup_opened");
}

// функция закрытия попапа
function closePopup(popupName) {
  popupName.classList.remove("popup_opened");
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  const newAttributeName = popupInputName.value;
  const newAttributeDescription = popupInputDescription.value;
  profileTitle.textContent = newAttributeName;
  profileSubtitle.textContent = newAttributeDescription;
  closePopup(popupEditProfile);
}

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

popupCloseButtonEditProfile.addEventListener("click", function () {
  closePopup(popupEditProfile);
});

profileEditButton.addEventListener("click", function () {
  openPopup(popupEditProfile);
  popupInputName.value = profileTitle.textContent;
  popupInputDescription.value = profileSubtitle.textContent;
});

popupForm.addEventListener("submit", handleFormSubmit);

// открытие и закрытие popupAddCard
profileAddButton.addEventListener("click", function () {
  openPopup(popupAddCard);
});

popupCloseButtonAddCard.addEventListener("click", function () {
  closePopup(popupAddCard);
});

popupSaveButtonAddCard.addEventListener("click", addNewCard);

popupCloseButtonOpenCard.addEventListener("click", function () {
  closePopup(popupCard);
});


