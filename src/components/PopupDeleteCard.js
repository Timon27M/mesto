import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
 constructor({selector}) {    
    super(selector);
    this._popupForm = this._popupElement.querySelector('.popup__form');
 }

 setSubmit(func) { 
   this._deleteCardElement = func;
 }

 setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._deleteCardElement();
        this.close();
    })
 }
}
