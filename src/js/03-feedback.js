import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const email = document.querySelector('.feedback-form input');
const textarea = document.querySelector('.feedback-form textarea');
const STORAGE_KEY = 'feedback-form-state';

formData = {};

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));

populateTextarea();

function onFormInput(event) {
  formData[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(event) {
  event.preventDefault();
  if (email.value !== '') {
    localStorage.removeItem(STORAGE_KEY);
    console.log({ email: email.value, password: textarea.value });
    event.currentTarget.reset();
  } else {
    alert('Enter email, please!');
  }
}

function populateTextarea() {
  const parseMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (parseMessage?.email) {
    email.value = parseMessage.email;
  }
  if (parseMessage?.message) {
    textarea.value = parseMessage.message;
  }
}
