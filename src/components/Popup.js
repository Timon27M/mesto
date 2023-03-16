export default class Popup {
    constructor(selector) {
        this._selector = selector;
        this._popupElement = document.querySelector(selector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    

    open() {
        this._popupElement.classList.add("popup_opened");

        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popupElement.classList.remove("popup_opened");
 
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        } 
    }

    setLoading(isLoading, text) {
        if (isLoading === true) {
            this._popupElement.querySelector('.popup__save-button').textContent = 'Сохранение...';
        } else {
            this._popupElement.querySelector('.popup__save-button').textContent = text;
        }
    }

    setEventListeners() {
        this._popupElement.querySelector('.popup__close-button').addEventListener('click', () => {
            this.close();
        })

        this._popupElement.addEventListener('click', (evt) => {
            if (evt.target.classList.contains(this._selector.slice(1))) {
                this.close();
            }
        })

    }
}