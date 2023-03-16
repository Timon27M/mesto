export default class Card {
  constructor(
    { data, handleCardClick, handleCardDelete, handleLikeClick },
    userId,
    templateSelector
  ) {
    this._name = data.name;
    this._id = data._id;
    this._image = data.link;
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

     this._likeNumber = this._element.querySelector(".element__like-number");
     this._likeButton = this._element.querySelector(".element__button");

    return this._element;
  }

  updateLikes(obj) {
    this._likes = obj.likes;
  }

  isLiked() {
    return this._likes.some((item) => {
     return item._id === this._userId;
    })

  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  changeDisLike(obj) {
    this._likeButton.classList.remove("element__button_active");
    this._likeNumber.textContent = obj.likes.length;
  }

  changeLike(obj) {
    this._likeButton.classList.add("element__button_active");
    this._likeNumber.textContent = obj.likes.length;
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
        this._handleLikeClick(this._element)
      });

    this._element
      .querySelector(".element__button-delete")
      .addEventListener("click", () => {
        this._handleCardDelete();
      });
  }
}
