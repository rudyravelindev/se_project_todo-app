class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    console.log(this._popupElement);
  }
  open() {
    this._popupElement.classList.add('popup_visible');
  }
}

export default Popup;
