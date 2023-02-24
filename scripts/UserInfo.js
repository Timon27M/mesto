export default class UserInfo {
    constructor({ nameSelector, descriptionSelector }) {
        this._nameElement = document.querySelector(nameSelector);
        this._descriptionElement = document.querySelector(descriptionSelector);
    }

    getUserInfo() {
        const data = {
            name: this._nameElement.textContent,
            description: this._descriptionElement.textContent
        }
        return data;
    }

    setUserInfo({ name, description }) {
        this._nameElement.textContent = name;
        this._descriptionElement.textContent = description;
    }
}