import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor( {selector, callback} ) {
        super(selector);
        this._callback = callback;

        this._popupInputs = this._popupElement.querySelectorAll('.popup__input');
        this._popupForm = this._popupElement.querySelector('.popup__form');
    }

    _getInputValues() {
        this._popupInputsValue = {}
        this._popupInputs.forEach((input) => {
            this._popupInputsValue[input.name] = input.value;
        })

        return this._popupInputsValue;
    }

    _clearInputs() {
        this._popupForm.reset();
    }

    close() {
        super.close();
        this._clearInputs();
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener("submit", (evt) => {
            evt.preventDefault();

            this._getInputValues();
            this._callback(this._popupInputsValue);

        })
    }

}