// Select the form element
const form = document.querySelector('.feedback-form');

// Select the email and message fields
const emailField = form.querySelector('input[name="email"]');
const messageField = form.querySelector('textarea[name="message"]');

// Load form state from storage on page load
window.addEventListener('load', () => {
  const savedState = JSON.parse(localStorage.getItem('feedback-form-state'));
  if (savedState) {
    emailField.value = savedState.email || '';
    messageField.value = savedState.message || '';
  }
});

// Throttle the update function to prevent frequent storage updates
const saveFormState = _.throttle(() => {
  const currentState = {
    email: emailField.value,
    message: messageField.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(currentState));
}, 500);

// Save form state on input event
form.addEventListener('input', saveFormState);

// Clear storage and form fields on form submit
form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (emailField.value === '' || messageField.value === '') {
    console.log('Please fill in all fields before submitting');
  } else {
    console.log('Form submitted!', {
      email: emailField.value,
      message: messageField.value,
    });
    localStorage.removeItem('feedback-form-state');
    form.reset();
  }
});
