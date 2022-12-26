let popup = document.querySelector(".popup");
let popupEditProfile = document.querySelector(".popup__edit-profile");
let popupAddCard = document.querySelector(".popup__add-card");
let popupInputName = popup.querySelector(".popup__input_info_name");
let popupInputDescription = popup.querySelector(".popup__input_info_description");
let popupForm = popup.querySelector(".popup__form");
let popupCloseButton = popup.querySelectorAll(".popup__close-button");
let popupCloseButtonAddCard = document.querySelector(".popup__close-button_add-card");
let popupCloseButtonEditProfile = popup.querySelector(".popup__close-button_edit-profile");
let profile = document.querySelector(".profile");
let profileEditButton = profile.querySelector(".profile__edit-button");
let profileAddButton = profile.querySelector(".profile__add-button");
let profileTitle = profile.querySelector(".profile__title");
let profileSubtitle = profile.querySelector(".profile__subtitle");


function openPopup(popupName) {
  popupName.classList.add("popup_opened");
  popupInputName.value = profileTitle.textContent;
  popupInputDescription.value = profileSubtitle.textContent;
}
profileEditButton.addEventListener("click", function () {
  openPopup(popupEditProfile);
});

function closePopup(popupName) {
  popupName.classList.remove("popup_opened");
}

popupCloseButtonEditProfile.addEventListener("click", function () {
  closePopup(popupEditProfile);
});

function handleFormSubmit(evt) {
  evt.preventDefault();
  let newAttributeName = popupInputName.value;
  let newAttributeDescription = popupInputDescription.value;
  profileTitle.textContent = newAttributeName;
  profileSubtitle.textContent = newAttributeDescription;
  closePopup(popupEditProfile);
}

popupForm.addEventListener("submit", handleFormSubmit);


// открытие и закрытие popupAddCard
profileAddButton.addEventListener("click", function () {
  openPopup(popupAddCard);
});

popupCloseButtonAddCard.addEventListener("click", function () {
  closePopup(popupAddCard);
})

