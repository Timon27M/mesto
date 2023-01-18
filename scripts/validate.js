function showInputError(formElement, inputElement, errorMessage, settings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
}
// функция  удаления текста ошибки
function hideInputError(formElement, inputElement, settings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(settings.errorClass);
}

// функция проверки на валидность
function isValid(formElement, inputElement, settings) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
}


// функция добавления открытого попапа
function setEventListener(formElement, settings) {
  const inputArray = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputArray, buttonElement, settings);



  inputArray.forEach(function (inputElement) {
    inputElement.addEventListener("input", function () {
      isValid(formElement, inputElement, settings);

      toggleButtonState(inputArray, buttonElement, settings);
    });
  });
}

// функция добавления форм
function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  formList.forEach(function (formElement) {
    setEventListener(formElement, settings);
  });
} 


// функция проверки на валидность формы
function hasInvalidInput(inputArray) {
  return inputArray.some(function (inputElement) {
    return !inputElement.validity.valid;
  });
}

// функция изменения состояния кнопки попапа
function toggleButtonState(inputArray, buttonElement, settings) {
  if (hasInvalidInput(inputArray)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.removeAttribute('disabled', true);
  }
}


// функция удаления текста ошибки
function deleteErrorOnPopupOpening(popup, settings) {
  const form = popup.querySelector(settings.formSelector);
  const inputArray = Array.from(form.querySelectorAll(settings.inputSelector));
  
  inputArray.forEach(function (inputElement) {
    hideInputError(form, inputElement, settings);
  });
}






