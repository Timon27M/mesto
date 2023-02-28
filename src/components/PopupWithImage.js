import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor( selector ) {
        super(selector);   
        this._nameImage = this._popupElement.querySelector(".popup__name-image");
        this._linkImage = this._popupElement.querySelector(".popup__image");
    }

    open({ name, link }) {
        this._nameImage.textContent = name;
        this._linkImage.setAttribute("src", link);
        this._linkImage.setAttribute('alt', `Картинка ${name}`);
        super.open();
    }

}