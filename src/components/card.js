export default class Card {
    constructor({ name, link, handleCardClick }, templateSelector) {
        this._name = name;
        this._image = link;
        this._handleCardClick = handleCardClick;
        this._templateSelector = templateSelector;
        }

    _getTemplate() {
        const cardElement = document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        
        this._element.querySelector('.element__image').src = this._image;
        this._element.querySelector('.element__image').alt = `Картинка ${this._name}`;
        this._element.querySelector('.element__paragraph').textContent = this._name;

        return this._element;
    }
    
    _likeButtonActive() {
        this._element.querySelector(".element__button").classList.toggle("element__button_active");
    }

    _deleteCard() {
        this._element.closest(".element").remove();
        this._element = null;
    }

    _setEventListeners() {
        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._handleCardClick({
                name: this._name,
                link: this._link,
            });
        })

        this._element.querySelector(".element__button").addEventListener('click', () => {
            this._likeButtonActive();
        })

        this._element.querySelector('.element__button-delete').addEventListener('click', () => {
            this._deleteCard();
        })
    }
}


