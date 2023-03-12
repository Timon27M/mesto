import '../pages/index.css';

import Api from '../components/Api.js';

import Card from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { objectSetting } from "./objectSetting.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

import PopupDeleteCard from '../components/PopupDeleteCard.js';

import {  
  popupFormEditProfile,
  popupInputName,
  popupInputDescription,
  popupFormAddCard,
  profileEditButton,
  profileAddButton,
  profileAvatarButton,
  profileTitle,
  profileSubtitle,
  profileAvatarImage,
  popupFormAvatar,
} from '../utils/constans.js'

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-61',
  headers: {
    authorization: '85ee4dcc-2dd3-4827-a094-52d29fa5c5eb',
    'Content-Type': 'application/json'
  }
})

let userId;

// загрузка данных профиля при открытии страницы
api.getProfileInfo()
.then((data) => {
  profileTitle.textContent = data.name;
  profileSubtitle.textContent = data.about;
  profileAvatarImage.src = data.avatar;
})
.catch((err) => {
  console.log(err); // выведем ошибку в консоль
})

// добавление валидации форм попапа редактирования профиля
const formValidatorProfile = new FormValidator(objectSetting, popupFormEditProfile);
formValidatorProfile.enableValidation();

// добавление Валидации форм для попапа добавления карточек
const formValidatorAddCard = new FormValidator(objectSetting, popupFormAddCard);
formValidatorAddCard.enableValidation();

// добавление Валидации форм для попапа изменения аватара
const formValidatorAvatar = new FormValidator(objectSetting, popupFormAvatar);
formValidatorAvatar.enableValidation();

const popupDeleteCard = new PopupDeleteCard({selector: '.popup_delete-card'});
popupDeleteCard.setEventListeners();


// создание класса UserInfo
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__subtitle",
  avatarSelector: ".profile__avatar-image"
});


// создание попапа изменения аввтара
const popupAvatarWithForm = new PopupWithForm({selector: '.popup_avatar',
    callback: (obj) => {
      popupAvatarWithForm.setLoading(true, 'Сохранить');
      api.setUserAvatar(obj)
      .then((res) => {
        userInfo.setUserAvatar(res);
        popupAvatarWithForm.close();
        formValidatorAvatar.resetActiveError();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => {
        popupAvatarWithForm.setLoading(false, 'Сохранить');
      })
    }
  })

  popupAvatarWithForm.setEventListeners();

profileAvatarButton.addEventListener('click', () => {
  popupAvatarWithForm.open()
})


// попап профиля
const popupProfileWithForm = new PopupWithForm({ selector: '.popup_edit-profile',
  callback: (obj) => {
    popupProfileWithForm.setLoading(true, 'Сохранить')
    api.setUserInfo(obj)
    .then((res) => {
    userInfo.setUserInfo(res);
    popupProfileWithForm.close();
    formValidatorProfile.resetActiveError();
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  })
  .finally(() => {
    popupProfileWithForm.setLoading(false, 'Сохранить');
  })
    }});
    popupProfileWithForm.setEventListeners();


    // обработчик кнопки открытия попапа редактирования профиля
  profileEditButton.addEventListener("click", () => {
    api.getProfileInfo()
    .then((data) => {
      popupInputName.value = data.name;
      popupInputDescription.value = data.about;
      popupProfileWithForm.open();
      formValidatorProfile.resetActiveError();
    }
    )
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
});

// создание попапа с картинкой
const popupWithImage = new PopupWithImage(".popup_open-card");
popupWithImage.setEventListeners();

// функция создания карточки
const createCard = (obj) => {
  const newCard = new Card(
    {
      data: obj,
      handleCardClick: () => {
        popupWithImage.open({name: obj.name, link: obj.link});
      }, 
      handleCardDelete: () => {
        popupDeleteCard.open();
        popupDeleteCard.setSubmit(() => {
          popupDeleteCard.setLoading(true, 'Да');
          api.deleteCardApi(obj._id)
          .then(() => {
            newCard.deleteCard();
          })
          .catch((err) => {
            console.log(err); // выведем ошибку в консоль
          })
          .finally(() => {
            popupDeleteCard.setLoading(false, 'Да');
          })
          
        })
      },
      handleLikeClick: () => {
        card.handleLikeCard()
      }
    },
    userId,
    api,
    ".cardTemplate"
    );
    return newCard;
  }

// создание первых карточек при загрузке
const addCards = new Section(
  {
    renderer: (item) => {
      const card = createCard(item);

      const cardElement = card.generateCard();

      addCards.addItem(cardElement);
    },
  },
  ".elements"
);


// попап добавления карточек
const popupAddCardsWithForm = new PopupWithForm({
  selector: ".popup_add-card",
  callback: (obj) => {
    popupAddCardsWithForm.setLoading(true, 'Создать');
    api.addCard(obj)
    .then((res) => {
      const cardElement = createCard(res).generateCard();
    
      addCards.addItem(cardElement);
      popupAddCardsWithForm.close();
      formValidatorAddCard.resetActiveError();

    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      popupAddCardsWithForm.setLoading(false, 'Создать');
    })

  },
});
popupAddCardsWithForm.setEventListeners();

profileAddButton.addEventListener("click", () => {
  popupAddCardsWithForm.open();
  formValidatorAddCard.resetActiveError();
  
});

Promise.all([api.getProfileInfo(), api.getInitialCards(),])
  .then(([user, card]) => {
    userId = user._id;
    addCards.renderItems(card)
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  })
