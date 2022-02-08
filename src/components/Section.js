export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  renderItems(items) {
    items.forEach((item) => {
      this.addItem(item);
    })
  }
  addItem(item) {
    const card = this._renderer(item)
    this._container.append(card);
  }
  prependItem(item) {
    this._container.prepend(item);
  }
}
