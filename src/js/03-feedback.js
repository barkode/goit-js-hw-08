import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const email = document.querySelector('.feedback-form input');
const textarea = document.querySelector('.feedback-form textarea');
const STORAGE_KEY = 'feedback-form-state';
const DELAY_KEY = 500;

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, DELAY_KEY));
const formData = {};

populateTextarea();

function onFormInput(event) {
  formData[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(event) {
  event.preventDefault();
  if (email.value === '') {
    alert('Enter email, please!');
  }
  localStorage.removeItem(STORAGE_KEY);
  console.log({ email: email.value, password: textarea.value });
  event.currentTarget.reset();
}

function populateTextarea() {
  const parseMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));
  const email = document.querySelector('.feedback-form input');
  const textarea = document.querySelector('.feedback-form textarea');
  if (parseMessage && parseMessage?.message !== '') {
    if (parseMessage.email) {
      email.value = parseMessage?.email;
    }
    if (parseMessage.message && parseMessage.message !== '') {
      textarea.value = parseMessage?.message;
    }
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}
