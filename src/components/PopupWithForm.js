import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor( {selector, callback} ) {
        super(selector);
        this._callback = callback;

        this._popupInputs = this._popupElement.querySelectorAll('.popup__input');
        this._popupForm = this._popupElement.querySelector('.popup__form');
        this._popupInputName = this._popupElement.querySelector('.popup__input_info_name');
        this._popupInputDescription = this._popupElement.querySelector('.popup__input_info_description');
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

    setInputValue(obj) {
        this._popupInputName.value = obj.name;
        this._popupInputDescription.value = obj.description;
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