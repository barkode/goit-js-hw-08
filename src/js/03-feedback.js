import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const email = document.querySelector('.feedback-form input');
const textarea = document.querySelector('.feedback-form textarea');
const STORAGE_KEY = 'feedback-form-state';
const DELAY_KEY = 500;

form.addEventListener('input', throttle(onFormInput, DELAY_KEY));
form.addEventListener('submit', onFormSubmit);

const keyMessage = localStorage.getItem(STORAGE_KEY);

if (keyMessage) {
  const savedMessage = JSON.parse(keyMessage);
  email.value = savedMessage.email;
  textarea.value = savedMessage.message;
}

function onFormInput() {
  const formData = {
    email: email.value,
    message: textarea.value,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(event) {
  event.preventDefault();

  if (!email.value || !textarea.value) {
    alert('all fields must be filled');
    return;
  }
  localStorage.removeItem(STORAGE_KEY);
  console.log({ email: email.value, password: textarea.value });
  event.currentTarget.reset();
}
