let closeButton = document.getElementById('close');
let signupContainer = document.getElementById('signup-container');
let signupButton = document.getElementById('signup-button');

signupButton.addEventListener('click', () => signupContainer.style.display = 'flex');
closeButton.addEventListener('click', () => signupContainer.style.display = 'none');

