export default class Popup {
    constructor(selector) {
        this._selector = selector;
        this._popupElement = document.querySelector(selector);
    }

    open() {
        this._popupElement.classList.add("popup_opened");
    }

    close() {
        this._popupElement.classList.remove("popup_opened");
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            console.log('help')
            this.close();
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

        document.addEventListener('keydown', (evt) => {
            this._handleEscClose(evt)
        })
    }
}