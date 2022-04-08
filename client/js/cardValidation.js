import * as home from './home.js';
import * as auth0 from './auth0.js';
import * as localstorage from './storage.js';

function checkValidity(e) {
  e.target.classList.toggle('invalid',
    !e.target.checkValidity());
}

async function init() {
  document.querySelector('#successfulPayment').addEventListener('click', () => {
    window.location = '/success.html';
  });
  home.execute();
  await auth0.executeAuth0();
  localstorage.cartReloadPage();
  for (const input of document.querySelectorAll('input')) {
    input.addEventListener('blur', checkValidity);
  }
}

window.addEventListener('load', init);
