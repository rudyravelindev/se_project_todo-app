import Popup from './Popup.js';

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector('.popup__form');
    if (!this._form) {
      console.error('Form not found in popup');
    }
    this._inputList = this._form.querySelectorAll('.popup__input');
    if (this._inputList.length === 0) {
      console.error('No inputs found in form');
    }
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      if (!input.name) {
        console.error('Input missing name attribute:', input);
      }
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      const inputValues = this._getInputValues();

      this._handleFormSubmit(inputValues);
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}

export default PopupWithForm;
