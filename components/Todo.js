class Todo {
  constructor(data, selector) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
  }

  _setEventListeners() {
    this._todoElement
      .querySelector('.todo__delete-btn')
      .addEventListener('click', () => {
        this._todoElement.remove();
      });

    this._todoCheckboxEl.addEventListener('chnage', () => {
      this._data.completed = !this._data.completed;
    });
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector('.todo__completed');
    this._todoLabel = this._todoElement.querySelector('.todo__label');
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute('for', `todo-${this._data.id}`);
  }

  //   Date
  _generateDateEl() {
    this._todoDate = this._todoElement.querySelector('.todo__date');
    this._dueDate = new Date(this._data.date);

    if (!isNaN(this._dueDate)) {
      this._todoDate.textContent = `Due: ${this._dueDate.toLocaleString(
        'en-US',
        {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }
      )}`;
    } else {
      this._todoDate.textContent = '';
    }
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector('.todo')
      .cloneNode(true);

    const todoNameEl = this._todoElement.querySelector('.todo__name');

    todoNameEl.textContent = this._data.name;

    this._generateCheckboxEl();
    this._setEventListeners();
    this._generateDateEl();

    return this._todoElement;
  }
}

export default Todo;
