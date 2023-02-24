import  Card  from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { objectSetting } from "./objectSetting.js";
import { initialCards } from "./cards.js";
import  Section  from "./Section.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";



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
// function closeByEsc(evt) {
//   if (evt.key === "Escape") {
//     const openedPopup = document.querySelector(".popup_opened");
//     closePopup(openedPopup);
//   }
// }

// слушатель для закрытие попапа при клике в пустоту
// popupArray.forEach(function (popupItem) {
//   popupItem.addEventListener("click", function (evt) {
//     if (evt.target.classList.contains("popup")) {
//       closePopup(popupItem);
//     }
//   });
// });

// функция открытия попапа
// function openPopup(popupName) {
//   popupName.classList.add("popup_opened");
//   // document.addEventListener("keydown", closeByEsc);
// }

// // функция открытие попапа редактирования профиля
// function openPopupProfile() {
//   openPopup(popupEditProfile);
//   formValidatorProfile.resetActiveError();
//   popupInputName.value = profileTitle.textContent;
//   popupInputDescription.value = profileSubtitle.textContent;
// }

// profileEditButton.addEventListener("click", openPopupProfile);

// функция открытия попапа добавления карточек
// function openPopupAddCard() {
//   openPopup(popupAddCard);
//   formValidatoAddCard.resetActiveError();
//   popupInputCardName.value = "";
//   popupInputCardLink.value = "";
// }
// открытие и закрытие popupAddCard
// profileAddButton.addEventListener("click", () => {
//   openPopup(popupAddCard);
// });

// функция закрытия попапа
// function closePopup(popupName) {
//   popupName.classList.remove("popup_opened");
//   document.removeEventListener("keydown", closeByEsc);
// }

// function handleFormSubmitProfile(evt) {
//   evt.preventDefault();
//   profileTitle.textContent = popupInputName.value;
//   profileSubtitle.textContent = popupInputDescription.value;
//   // closePopup(popupEditProfile);
// }


// функция добавления карточки пользователем
// function addNewCard() {
//   const objCard = {
//     name: popupInputCardName.value, 
//     link: popupInputCardLink.value,
//   }

//   const newCard = new Card({ data: objCard, 
//      handleCardClick: () => {const popupWithImage = new PopupWithImage('.popup_open-card', { name: objCard.name, link: objCard.link });
    
//      popupWithImage.setEventListeners()
//      popupWithImage.open()}} , '.cardTemplate')

//      const cardElement = newCard.generateCard()
//      sectionCards.prepend(cardElement)
// }

// popupFormAddCard.addEventListener("submit", addNewCard);
// функция добавления содержимого в popupCard
// function openPopupCard(event) {
//   const getCard = event.target.closest(".element");
//   const cardText = getCard.querySelector(".element__paragraph").textContent;

//   popupCardNameImage.textContent = cardText;

//   const cardImageLink = event.target.getAttribute("src");
//   popupCardImage.setAttribute("src", cardImageLink);
//   popupCardImage.setAttribute("alt", `Картинка ${cardText}`);

//   openPopup(popupCard);
// }


// popupCloseButtonEditProfile.addEventListener("click", function () {
//   closePopup(popupEditProfile);
// });

// добавление валидации форм попапа редактирования профиля
const formValidatorProfile = new FormValidator(objectSetting, popupFormEditProfile);
formValidatorProfile.enableValidation();



// popupFormEditProfile.addEventListener("submit", handleFormSubmitProfile);

// добавление Валидации форм для попапа добавления карточек
const formValidatoAddCard = new FormValidator(objectSetting, popupFormAddCard);
formValidatoAddCard.enableValidation();

// функция открытия попапа добавления карточек
// function openPopupAddCard() {
//   openPopup(popupAddCard);
//   formValidatoAddCard.resetActiveError();
//   popupInputCardName.value = "";
//   popupInputCardLink.value = "";
// }
// открытие и закрытие popupAddCard
// profileAddButton.addEventListener("click", openPopupAddCard);

// popupCloseButtonAddCard.addEventListener("click", function () {
//   closePopup(popupAddCard);
// });


// popupCloseButtonOpenCard.addEventListener("click", function () {
//   closePopup(popupCard);
// });


// создание перввых карточек при загрузке
const firstCards = new Section({ items: initialCards,
  renderer: (item) => {
    const card = new Card({ name: item.name, link: item.link, 
      handleCardClick:() => {const popupWithImage = new PopupWithImage('.popup_open-card', { name: item.name, link: item.link });
    
     popupWithImage.setEventListeners()
     popupWithImage.open();
    }}, '.cardTemplate');
    
    const cardElement = card.generateCard();

    firstCards.addItem(cardElement);
  }
  }, ".elements");

  firstCards.renderItems();



  // const popupFunc = new Popup('.popup_edit-profile');
  // popupFunc.setEventListeners();


  // попап Профиля
  const popupProfileWithForm = new PopupWithForm({ selector: '.popup_edit-profile',
  callback: (array) => {


    const userInfo = new UserInfo({ nameSelector: '.profile__title', descriptionSelector: '.profile__subtitle' });
    userInfo.setUserInfo({name: array[0], description: array[1]}); 
    popupProfileWithForm.close();
  }
    })
    popupProfileWithForm.setEventListeners();


    profileEditButton.addEventListener('click', () => { 
      formValidatorProfile.resetActiveError();

      const userInfo = new UserInfo({ nameSelector: '.profile__title', descriptionSelector: '.profile__subtitle' });
      popupInputName.value = userInfo.getUserInfo().name;
      popupInputDescription.value = userInfo.getUserInfo().description;

      popupProfileWithForm.open();
    })

// функция добавления карточки пользователем
      // function addNewCard(array) {
      
      //   const newCard = new Card({ data: array, 
      //      handleCardClick: () => {const popupWithImage = new PopupWithImage('.popup_open-card', { name: array[0], link: array[1] });
          
      //      popupWithImage.setEventListeners()
      //      popupWithImage.open()}} , '.cardTemplate')
      
      //      const cardElement = newCard.generateCard()
      //      sectionCards.prepend(cardElement)
      // }


          // попап добавления карточек
  const popupAddCardsWithForm = new PopupWithForm({ selector: ".popup_add-card",
  callback: (array) => { 

    const newCard = new Card({ name: array[0], link: array[1], 
      handleCardClick: () => {const popupWithImage = new PopupWithImage('.popup_open-card', { name: array[0], link: array[1] });
     
      popupWithImage.setEventListeners()
      popupWithImage.open()}} , '.cardTemplate')
 
      const cardElement = newCard.generateCard()
      sectionCards.prepend(cardElement);


    popupAddCardsWithForm.close();
  }
    }) 
    popupAddCardsWithForm.setEventListeners();

    profileAddButton.addEventListener('click', () => {
      formValidatoAddCard.resetActiveError();
      popupAddCardsWithForm.open();
    })
      