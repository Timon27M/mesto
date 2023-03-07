import '../pages/index.css';

import Api from '../components/Api.js';

import Card from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { objectSetting } from "./objectSetting.js";
import { initialCards } from "./cards.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

import {  
  popupFormEditProfile,
  popupInputName,
  popupInputDescription,
  popupFormAddCard,
  profileEditButton,
  profileAddButton,
} from '../utils/constans.js'

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-61',
  headers: {
    authorization: '85ee4dcc-2dd3-4827-a094-52d29fa5c5eb',
    'Content-Type': 'application/json'
  }
})
console.log(api.getProfileInfo())




// добавление валидации форм попапа редактирования профиля
const formValidatorProfile = new FormValidator(objectSetting, popupFormEditProfile);
formValidatorProfile.enableValidation();

// добавление Валидации форм для попапа добавления карточек
const formValidatoAddCard = new FormValidator(objectSetting, popupFormAddCard);
formValidatoAddCard.enableValidation();

// создание класса UserInfo
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__subtitle",
});


// попап профиля
const popupProfileWithForm = new PopupWithForm({ selector: '.popup_edit-profile',
  callback: (obj) => {
    userInfo.setUserInfo({name: obj.popupName, description: obj.popupDescription});
    popupProfileWithForm.close();
    formValidatorProfile.resetActiveError();
  }
    });
    popupProfileWithForm.setEventListeners();


    // обработчик кнопки открытия попапа редактирования профиля
  profileEditButton.addEventListener("click", () => {

    
    const dataProfile = userInfo.getUserInfo();
    popupInputName.value = dataProfile.name;
    popupInputDescription.value = dataProfile.description;
    popupProfileWithForm.open();
    formValidatorProfile.resetActiveError();
});


const popupWithImage = new PopupWithImage(".popup_open-card");
popupWithImage.setEventListeners();


// функция создания карточки
const createCard = (obj) => {
  const newCard = new Card(
    {
      name: obj.name,
      link: obj.link,
      handleCardClick: () => {
        popupWithImage.open({name: obj.name, link: obj.link});
      },
    },
    ".cardTemplate"
    );
    return newCard;
  }

// создание первых карточек при загрузке
const addCards = new Section(
  {
    // items: initialCards,
    renderer: (item) => {
      const card = createCard(item);

      const cardElement = card.generateCard();

      addCards.addItem(cardElement);
    },
  },
  ".elements"
);

// addCards.renderItems();

// загрузка первых карточек с сервера
api.getInitialCards()
.then((cards) => {
  addCards.renderItems(cards)
})



// попап добавления карточек
const popupAddCardsWithForm = new PopupWithForm({
  selector: ".popup_add-card",
  callback: (obj) => {
  const cardElement = createCard(obj).generateCard();

  addCards.addItem(cardElement);
  popupAddCardsWithForm.close();
  formValidatoAddCard.resetActiveError();

  },
});

popupAddCardsWithForm.setEventListeners();

profileAddButton.addEventListener("click", () => {
  popupAddCardsWithForm.open();
  formValidatoAddCard.resetActiveError();
});

