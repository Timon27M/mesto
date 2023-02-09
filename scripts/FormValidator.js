class FormValidator {
    constructor (setting, formElement) {
        this._formSelector = setting.formSelector;
        this._inputSelector = setting.inputSelector;
        this._submitButtonSelector = setting.submitButtonSelector;
        this._inactiveButtonClass = setting.inactiveButtonClass;
        this._inputErrorClass = setting.inputErrorClass;
        this._errorClass = setting.errorClass;
        this._formElement = formElement;
    }


    _hasInvalidInput() {
        const inputArray = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        return inputArray.some(function (inputElement) {
            return !inputElement.validity.valid;
          });
    }

    _toggleButtonState() {
        const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        if (this._hasInvalidInput()) {
            buttonElement.classList.add(this._inactiveButtonClass);
            buttonElement.setAttribute('disabled', true);
          } else {
            buttonElement.classList.remove(this._inactiveButtonClass);
            buttonElement.removeAttribute('disabled', true);
          }
    }

    
    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = "";
        errorElement.classList.remove(this._errorClass);
    }
    
    _showInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._errorClass);
    }
    
    _isValid(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    }


    
    _setEventListener() {
        const inputArray = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        
        inputArray.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);
                this._toggleButtonState();
            })
            this._hideInputError(inputElement);
        })

    }


    resetActiveError() {
        this._formElement.querySelector(this._submitButtonSelector).classList.add(this._inactiveButtonClass)
        this._formElement.querySelector(this._submitButtonSelector).disabled = true;

        const inputArray = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        inputArray.forEach((inputElement) => {
            this._hideInputError(inputElement);
        })
    }


    enableValidation() {
        this._setEventListener()
        this._toggleButtonState();
    }
}

export { FormValidator };