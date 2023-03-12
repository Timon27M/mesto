const popupEditProfile = document.querySelector(".popup_edit-profile");
const popupFormEditProfile = popupEditProfile.querySelector(".popup__form");
const popupInputName = popupEditProfile.querySelector(".popup__input_info_name");
const popupInputDescription = popupEditProfile.querySelector(".popup__input_info_description");
const popupAddCard = document.querySelector(".popup_add-card");
const popupFormAddCard = popupAddCard.querySelector(".popup__form");
const popupAvatar = document.querySelector('.popup_avatar');
const popupFormAvatar = popupAvatar.querySelector(".popup__form");
const profile = document.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit-button");
const profileAddButton = profile.querySelector(".profile__add-button");
const profileAvatarButton = profile.querySelector(".profile__avatar-button");
const profileTitle = profile.querySelector('.profile__title');
const profileSubtitle = profile.querySelector('.profile__subtitle');
const profileAvatarImage = profile.querySelector('.profile__avatar-image');

export {  
    popupFormEditProfile,
    popupInputName,
    popupInputDescription,
    popupFormAddCard,
    profileEditButton,
    profileAddButton,
    profileAvatarButton,
    profileTitle,
    profileSubtitle,
    profileAvatarImage,
    popupFormAvatar,
 }