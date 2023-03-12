export default class Card {
  constructor(
    { data, handleCardClick, handleCardDelete, handleLikeClick },
    userId,
    api,
    templateSelector
  ) {
    this._name = data.name;
    this._id = data._id;
    this._image = data.link;
    this._api = api;
    this._likes = data.likes;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleLikeClick = handleLikeClick;
    this._templateSelector = templateSelector;
    this._userId = userId;
    this._isOwner = data.owner._id === this._userId;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".element__image").src = this._image;
    this._element.querySelector(
      ".element__image"
    ).alt = `Картинка ${this._name}`;
    this._element.querySelector(".element__paragraph").textContent = this._name;

    if (!this._isOwner) {
      this._element.querySelector(".element__button-delete").remove();
    }

      if (this._likes.find((item) => item._id === this._userId)) {
        this._element.querySelector('.element__button').classList.add('element__button_active');
      }
      this._element.querySelector('.element__like-number').textContent = this._likes.length;



    return this._element;
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  handleLikeCard() {
    const likeNumber = this._element.querySelector(".element__like-number");
    const likeButton = this._element.querySelector(".element__button");

    if (likeButton.classList.contains("element__button_active")) {
      this._api.disLikeCard(this._id)
      .then((res) => {
        likeButton.classList.remove("element__button_active");
        likeNumber.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
    } else {
      this._api.likeCard(this._id)
      .then((res) => {
        likeButton.classList.add("element__button_active");
        likeNumber.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
    }
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._handleCardClick({
          name: this._name,
          link: this._link,
        });
      });

    this._element
      .querySelector(".element__button")
      .addEventListener("click", () => {
        this.handleLikeCard();
      });

    this._element
      .querySelector(".element__button-delete")
      .addEventListener("click", () => {
        this._handleCardDelete();
      });
  }
}
