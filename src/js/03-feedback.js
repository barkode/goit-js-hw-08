import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const textarea = document.querySelector('.feedback-form textarea');
const STORAGE_KEY = 'feedback-form-state';

form.addEventListener('click', onFormSubmit);
textarea.addEventListener('input', throttle(onTextareaInput, 500));

populateTexteria();

function inputFunction(event) {
  console.dir(event);
}

function onTextareaInput(event) {
  const message = event.target.value;
  localStorage.setItem(STORAGE_KEY, message);
}

function onFormSubmit(event) {
  event.preventDefault();
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function populateTexteria() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);
  if (savedMessage) {
    textarea.value = savedMessage;
  }
}
