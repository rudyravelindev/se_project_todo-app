class TodoCounter {
  constructor(todos, selector) {
    this._element = document.querySelector(selector);
    if (!this._element) {
      throw new Error(`Element not found for selector: ${selector}`);
    }

    this._completed = todos.filter((todo) => todo.completed).length;

    this._total = todos.length;

    this._updateText();
  }

  updateTotal = (increment) => {
    if (increment) {
      this._total += 1;
    } else {
      this._total -= 1;
    }

    this._total = Math.max(this._total, 0);

    this._completed = Math.min(this._completed, this._total);

    this._updateText();
  };

  updateCompleted = (increment) => {
    if (increment) {
      this._completed += 1;
    } else {
      this._completed -= 1;
    }

    this._completed = Math.max(this._completed, 0);

    this._completed = Math.min(this._completed, this._total);

    this._updateText();
  };

  _updateText() {
    this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }
}

export default TodoCounter;
