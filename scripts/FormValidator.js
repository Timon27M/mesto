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

    _hideInputError() {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = "";
        errorElement.classList.remove(this._errorClass);
    }

    _showInputError() {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._errorClass);
    }

    _isValid() {
        if (!inputElement.validity.valid) {
            this._showInputError();
          } else {
            this._hideInputError();
          }
    }

    setEventListener() {
        const inputArray = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        // const buttonElement = this._formElement.querySelector(this._submitButtonSelector);

        this._toggleButtonState();

        inputArray.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid();
                this._toggleButtonState();
            })
        })
    }

    // enableValidator() {
    //     _setEventListener();
    // }
}

export { FormValidator };