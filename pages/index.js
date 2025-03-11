import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import { initialTodos, validationConfig } from '../utils/constants.js';
import Todo from '../components/Todo.js';
import FormValidation from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import TodoCounter from '../components/TodoCounter.js';

const addTodoButton = document.querySelector('.button_action_add');
const addTodoForm = document.forms['add-todo-form'];
const todosList = document.querySelector('.todos__list');

// Initialize TodoCounter with the class selector
const todoCounter = new TodoCounter(initialTodos, '.counter__text');

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
    // Update the total count in the counter
    todoCounter.updateTotal(true);

    newTodoValidator.resetValidation();
    addTodoPopup.close();
  },
});

addTodoPopup.setEventListeners();

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
  const todoElement = todo.getView();
  return todoElement;
};

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todoEl = generateTodo(item);
    todosList.append(todoEl);
  },
  containerSelector: '.todos__list',
});

section.renderItems();

addTodoButton.addEventListener('click', () => {
  addTodoPopup.open();
});

const newTodoValidator = new FormValidation(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
