let popup = document.querySelector(".popup");
let popupInputName = popup.querySelector(".popup__input-name");
let popupInputDescription = popup.querySelector(".popup__input-description");
let popupSaveButton = popup.querySelector(".popup__save-button");
let popupCloseButton = popup.querySelector(".popup__close-button");
let profile = document.querySelector(".profile");
let profileEditButton = profile.querySelector(".profile__edit-button");
let profileTitle = profile.querySelector(".profile__title");
let profileSubtitle = profile.querySelector(".profile__subtitle");


popupInputName.setAttribute("value", profileTitle.textContent);
popupInputDescription.setAttribute("value", profileSubtitle.textContent);

profileEditButton.addEventListener("click", function () {
  popup.classList.add("popup__opened");
  popupInputName.value = profileTitle.textContent;
  popupInputDescription.value = profileSubtitle.textContent;
});

popupCloseButton.addEventListener("click", function () {
  popup.classList.remove("popup__opened");
});

popupSaveButton.addEventListener('click', function () {
    profileTitle.textContent = popupInputName.value;
    profileSubtitle.textContent = popupInputDescription.value;
    popup.classList.remove("popup__opened");
})

function handleFormSubmit (evt) {
    evt.preventDefault();
    let newAttributeName = popupInputName.getAttribute("value");
    let newAttributeDescription = popupInputDescription.getAttribute("value");
    profileTitle.textContent = newAttributeName;
    profileSubtitle.textContent = newAttributeDescription;
}

popupSaveButton.addEventListener('submit', handleFormSubmit);
