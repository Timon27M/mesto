import '../pages/index.css';

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
  sectionCards,
} from '../utils/constans.js'


// добавление валидации форм попапа редактирования профиля
const formValidatorProfile = new FormValidator(objectSetting, popupFormEditProfile);
formValidatorProfile.enableValidation();

// добавление Валидации форм для попапа добавления карточек
const formValidatoAddCard = new FormValidator(objectSetting, popupFormAddCard);
formValidatoAddCard.enableValidation();


// попап Профиля
const popupProfileWithForm = new PopupWithForm({
  selector: ".popup_edit-profile",
  callback: (array) => {
    const userInfo = new UserInfo({
      nameSelector: ".profile__title",
      descriptionSelector: ".profile__subtitle",
    });
    userInfo.setUserInfo({ name: array[0], description: array[1] });
    popupProfileWithForm.close();
  },
});
popupProfileWithForm.setEventListeners();

profileEditButton.addEventListener("click", () => {
  formValidatorProfile.resetActiveError();

  const userInfo = new UserInfo({
    nameSelector: ".profile__title",
    descriptionSelector: ".profile__subtitle",
  });
  popupInputName.value = userInfo.getUserInfo().name;
  popupInputDescription.value = userInfo.getUserInfo().description;

  popupProfileWithForm.open();
});


// создание первых карточек при загрузке
const firstCards = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(
        {
          name: item.name,
          link: item.link,
          handleCardClick: () => {
            const popupWithImage = new PopupWithImage(".popup_open-card", {
              name: item.name,
              link: item.link,
            });

            popupWithImage.setEventListeners();
            popupWithImage.open();
          },
        },
        ".cardTemplate"
      );

      const cardElement = card.generateCard();

      firstCards.addItem(cardElement);
    },
  },
  ".elements"
);

firstCards.renderItems();


// попап добавления карточек
const popupAddCardsWithForm = new PopupWithForm({
  selector: ".popup_add-card",
  callback: (array) => {
    const newCard = new Card(
      {
        name: array[0],
        link: array[1],
        handleCardClick: () => {
          const popupWithImage = new PopupWithImage(".popup_open-card", {
            name: array[0],
            link: array[1],
          });

          popupWithImage.setEventListeners();
          popupWithImage.open();
        },
      },
      ".cardTemplate"
    );

    const cardElement = newCard.generateCard();
    sectionCards.prepend(cardElement);

    popupAddCardsWithForm.close();
  },
});
popupAddCardsWithForm.setEventListeners();

profileAddButton.addEventListener("click", () => {
  formValidatoAddCard.resetActiveError();
  popupAddCardsWithForm.open();
});
