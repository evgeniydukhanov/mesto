export default class UserInfo {
  //Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
  constructor({nameSelector, workplaceSelector}){
    this._name = document.querySelector(nameSelector);
    this._workplace = document.querySelector(workplaceSelector);
  }
  //Содержит публичный метод getUserInfo,
  // который возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя
  getUserInfo(){
    return {
      name: this._name.textContent,
      workplace: this._workplace.textContent
    }
  }
  //Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo({name, workplace}){
    this._name.textContent = name;
    this._workplace.textContent = workplace;
  }
}
