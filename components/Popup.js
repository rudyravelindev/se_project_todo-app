// class Popup {
//   constructor({ popupSelector }) {
//     this._popupElement = document.querySelector(popupSelector);
//     this._popupCloseBtn = this._popupElement.querySelector('.popup__close');
//   }

//   _handleEscapeClose(evt) {
//     if (evt.key === 'Escape') {
//       this.close();
//     }
//   }
//   open() {
//     this._popupElement.classList.add('popup_visible');

//     document.addEventListener('keydown', (evt) => this._handleEscapeClose(evt));
//   }
//   close() {
//     this._popupElement.classList.remove('popup_visible');
//     // TODO - remove the escape listener
//     document.removeEventListener('keyup', this._handleEscapeClose);
//   }

//   setEventListeners() {
//     this._popupElement.addEventListener('mousedown', (evt) => {
//       if (
//         evt.target.classList.contains('popup__close') ||
//         evt.target === this._popupElement
//       ) {
//         this.close();
//       }
//     });
//   }
// }

// export default Popup;

class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupCloseBtn = this._popupElement.querySelector('.popup__close');
    // Bind the handler in constructor so we can properly remove it later
    this._handleEscapeClose = this._handleEscapeClose.bind(this);
  }

  _handleEscapeClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  open() {
    this._popupElement.classList.add('popup_visible');
    // Use the bound handler directly
    document.addEventListener('keydown', this._handleEscapeClose);
  }

  close() {
    this._popupElement.classList.remove('popup_visible');
    // Remove the same event type with the bound handler
    document.removeEventListener('keydown', this._handleEscapeClose);
  }

  setEventListeners() {
    this._popupElement.addEventListener('mousedown', (evt) => {
      if (
        evt.target.classList.contains('popup__close') ||
        evt.target === this._popupElement
      ) {
        this.close();
      }
    });
  }
}

export default Popup;
