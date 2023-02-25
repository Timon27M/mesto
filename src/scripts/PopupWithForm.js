import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor( {selector, callback} ) {
        super(selector);
        this._callback = callback;
    }

    _getInputValues() {
         this._popupInputsValue = Array.from(this._popupElement.querySelectorAll('.popup__input')).map(input => {
            return input.value;
        });
        return this._popupInputsValue;
    }

    _clearInputs() {
        this._popupInputs = Array.from(this._popupElement.querySelectorAll('.popup__input')).map(input => {
            return input.value = '';
        });
        return this._popupInputs;
    }

    close() {
        super.close();
        this._clearInputs();
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupElement.querySelector('.popup__form').addEventListener("submit", (evt) => {
            evt.preventDefault();

            this._getInputValues();
            this._callback(this._popupInputsValue);

        })
    }

}