export default class UserInfo {
    constructor({ nameSelector, descriptionSelector, avatarSelector }) {
        this._nameElement = document.querySelector(nameSelector);
        this._descriptionElement = document.querySelector(descriptionSelector);

        this._avatarElement = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        const data = {
            name: this._nameElement.textContent,
            description: this._descriptionElement.textContent
        }
        return data;
    }

    setUserInfo({ name, about }) {
        this._nameElement.textContent = name;
        this._descriptionElement.textContent = about;
    }

    setUserAvatar({avatar}) {
        this._avatarElement.src = avatar;
    }
}