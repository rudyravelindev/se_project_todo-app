import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import { initialTodos, validationConfig } from '../utils/constants.js';
import Todo from '../components/Todo.js';
import FormValidation from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';

const addTodoButton = document.querySelector('.button_action_add');
const addTodoPopupEl = document.querySelector('#add-todo-popup');
const addTodoForm = document.forms['add-todo-form'];

const addTodoCloseBtn = addTodoPopupEl.querySelector('.popup__close');
const todosList = document.querySelector('.todos__list');

const addTodoPopup = new PopupWithForm({
  popupSelector: '#add-todo-popup',
  handleFormSubmit: () => {},
});

const generateTodo = (data) => {
  const todo = new Todo(data, '#todo-template');
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

const openModal = (modal) => {
  modal.classList.add('popup_visible');
};

const closeModal = (modal) => {
  modal.classList.remove('popup_visible');
};

addTodoButton.addEventListener('click', () => {
  openModal(addTodoPopupEl);
});

addTodoCloseBtn.addEventListener('click', () => {
  closeModal(addTodoPopupEl);
});

const renderTodo = (item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
};

addTodoButton.addEventListener('click', () => {
  openModal(addTodoPopupEl);
});

addTodoCloseBtn.addEventListener('click', () => {
  closeModal(addTodoPopupEL);
});

addTodoForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const id = uuidv4();

  const values = { name, date, id };
  const todo = generateTodo(values);
  section.addItem(todo);
  closeModal(addTodoPopupEl);

  newTodoValidator.resetValidation();
});

const newTodoValidator = new FormValidation(validationConfig, addTodoForm);

newTodoValidator.enableValidation();
