// Get references to elements in your HTML
const welcomeMessage = document.getElementById('welcome-message');
const changeTextButton = document.getElementById('change-text');

// Add an event listener to the button
changeTextButton.addEventListener('click', () => {
  welcomeMessage.textContent = 'The text has been changed!';
});
