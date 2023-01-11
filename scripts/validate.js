function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('input-error_active');
  }
  // функция  удаления текста ошибки
  function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.textContent = '';
    errorElement.classList.remove('input-error_active');
  }
  
  // функция проверки на валидность
  function isValid(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    };
  };
  
  // функция добавления открытого попапа
  function setEventListener(formElement) {
    const inputArray = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__save-button');
  
    toggleButtonState(inputArray, buttonElement);
  
    inputArray.forEach(function (inputElement) {
      inputElement.addEventListener('input', function () {
        isValid(formElement, inputElement);
        
        toggleButtonState(inputArray, buttonElement);
      });
    });
  };
  
  // функция добавления форм
  function enableValidation() {
    const FormList = Array.from(document.querySelectorAll('.popup__form'));
  
    FormList.forEach(function(formElement) {
      setEventListener(formElement);
    });
  };
  
  enableValidation();

  function hasInvalidInput(inputArray) {
    return inputArray.some(function(inputElement) {
      return !inputElement.validity.valid;
  })
  };
  
  // функция изменения состояния кнопки попапа
  function toggleButtonState(inputArray, buttonElement) {
    if (hasInvalidInput(inputArray)) {
      buttonElement.classList.add('popup__save-button_inactive');
    } else {
      buttonElement.classList.remove('popup__save-button_inactive');
    };
  };