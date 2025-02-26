class FormValidation {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._errorClass = settings.errorClass;
    this._inputErrorClass = settings.nputErrorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;
  }
  enableValidation() {}
}

export default FormValidation;
