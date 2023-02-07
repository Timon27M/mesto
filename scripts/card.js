import { initialCards } from '../scripts/cards.js'
// import { popupCard, popupCardImage, popupCardNameImage, } from './index.js';

 class Card {
    constructor(data, temlateSelector, openPopup) {
        this._name = data.name;
        this._image = data.link;
        this._temlateSelector = temlateSelector;
        this._openPopup = openPopup;
        }

    _getTemplate() {
        const cardElement = document
        .querySelector(this._temlateSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        
        this._element.querySelector('.element__image').src = this._image;
        this._element.querySelector('.element__paragraph').textContent = this._name;

        return this._element;
    }
    
    // _openPopup() {
    //     popupCard.classList.add("popup_opened");

    //     popupCardImage.src = this._image;
    //     popupCardNameImage.textContent = this._name;

    //     return popupCard;
    // }

    _likeButtonActive() {
        this._element.querySelector(".element__button").classList.toggle("element__button_active");
    }

    _deleteCard() {
        this._element.closest(".element").remove();
    }

    _setEventListeners() {
        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._openPopup;
        })

        this._element.querySelector(".element__button").addEventListener('click', () => {
            this._likeButtonActive();
        })

        this._element.querySelector('.element__button-delete').addEventListener('click', () => {
            this._deleteCard();
        })


    }
}


initialCards.forEach((item) => {
    const sectionCards = document.querySelector(".elements");
    const card = new Card(item, '.cardTemplate');

    const cardElement = card.generateCard();

    sectionCards.append(cardElement);
})

export { Card }