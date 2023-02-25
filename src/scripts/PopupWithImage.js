import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(selector, { name, link }) {
        super(selector);   
        this._name = name;
        this._link = link;
    }

    open() {
        super.open();
        this._popupElement.querySelector(".popup__name-image").textContent = this._name;
        this._popupElement.querySelector(".popup__image").setAttribute("src", this._link);
    }

}