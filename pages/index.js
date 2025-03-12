import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import { initialTodos, validationConfig } from '../utils/constants.js';
import Todo from '../components/Todo.js';
import FormValidation from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import TodoCounter from '../components/TodoCounter.js';

// DOM elements
const addTodoButton = document.querySelector('.button_action_add');
const todosList = document.querySelector('.todos__list');

// Initialize TodoCounter
const todoCounter = new TodoCounter(initialTodos, '.counter__text');

// Function to generate a todo item
const generateTodo = (data) => {
  const onCompletionChange = (completed) => {
    todoCounter.updateCompleted(completed);
  };

  const onDelete = (wasCompleted) => {
    todoCounter.updateTotal(false);
    if (wasCompleted) {
      todoCounter.updateCompleted(false);
    }
  };

  const todo = new Todo(data, '#todo-template', onCompletionChange, onDelete);
  return todo.getView();
};

// Initialize PopupWithForm
const addTodoPopup = new PopupWithForm({
  popupSelector: '#add-todo-popup',
  handleFormSubmit: (formValues) => {
    const name = formValues.name;
    const dateInput = formValues.date;
    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    const id = uuidv4();
    const values = { name, date, id };

    const todoEl = generateTodo(values);
    section.addItem(todoEl);
    todoCounter.updateTotal(true);
    newTodoValidator.resetValidation();
    addTodoPopup.close();
  },
});

// Initialize Section
const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todoElement = generateTodo(item);
    section.addItem(todoElement);
  },
  containerSelector: '.todos__list',
});

// Initialize FormValidator
const newTodoValidator = new FormValidation(
  validationConfig,
  addTodoPopup.getForm()
);

// Set up event listeners
addTodoPopup.setEventListeners();
addTodoButton.addEventListener('click', () => {
  addTodoPopup.open();
});
newTodoValidator.enableValidation();

// Render initial todos
section.renderItems();
