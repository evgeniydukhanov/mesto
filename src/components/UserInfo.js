export default class UserInfo {
  constructor({nameSelector, workplaceSelector, avatarSelector}){
    this._name = document.querySelector(nameSelector);
    this._workplace = document.querySelector(workplaceSelector);
    this._avatar = document.querySelector(avatarSelector);
    this._userId = "";
  }
  getUserInfo(){
    return {
      name: this._name.textContent,
      about: this._workplace.textContent,
      userId : this._userId,
      avatar: this._avatar
    };
  }
  setUserInfo({name, about, avatar, _id}){
    this._name.textContent = name;
    this._workplace.textContent = about;
    this._avatar.style.backgroundImage = `url(${avatar})`;
    this._userId = _id;
  };
}
