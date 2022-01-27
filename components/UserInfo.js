export default class UserInfo {
  //Принимает в конструктор объект с селекторами двух элементов: элемента имени пользователя и элемента информации о себе.
  constructor({nameSelector, workplaceSelector}){
    this._nameSelector = nameSelector;
    this._workplaceSelector = workplaceSelector;
  }
  //Содержит публичный метод getUserInfo,
  // который возвращает объект с данными пользователя. Этот метод пригодится когда данные пользователя
  getUserInfo(){
    return {
      name: this._nameSelector.textContent,
      workplace: this._workplaceSelector.textContent
    }
  }
  //Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.
  setUserInfo({name, workplace}){
    this._nameSelector.textContent = name;
    this._workplaceSelector.textContent = workplace;
  }
}
