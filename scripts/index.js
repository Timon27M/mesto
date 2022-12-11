let popup = document.querySelector(".popup");
let popupInputName = popup.querySelector(".popup__input_info_name");
let popupInputDescription = popup.querySelector(
  ".popup__input_info_description"
);
let popupForm = popup.querySelector(".popup__form");
let popupCloseButton = popup.querySelector(".popup__close-button");
let profile = document.querySelector(".profile");
let profileEditButton = profile.querySelector(".profile__edit-button");
let profileTitle = profile.querySelector(".profile__title");
let profileSubtitle = profile.querySelector(".profile__subtitle");

function openPopup() {
  popup.classList.add("popup_opened");
  popupInputName.value = profileTitle.textContent;
  popupInputDescription.value = profileSubtitle.textContent;
}
profileEditButton.addEventListener("click", openPopup);

function closePopup() {
  popup.classList.remove("popup_opened");
}
popupCloseButton.addEventListener("click", closePopup);

function handleFormSubmit(evt) {
  evt.preventDefault();
  let newAttributeName = popupInputName.value;
  let newAttributeDescription = popupInputDescription.value;
  profileTitle.textContent = newAttributeName;
  profileSubtitle.textContent = newAttributeDescription;
  closePopup();
}

popupForm.addEventListener("submit", handleFormSubmit);
