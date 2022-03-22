import * as home from './home.js';
import * as auth0 from './auth0.js';
import * as brickStorage from './bricksLocalStorage.js';

function checkValidity(e) {
  e.target.classList.toggle('invalid',
    !e.target.checkValidity());
}

async function init() {
  document.querySelector('#pay').addEventListener('click', () => {
    window.location = '/pay.html';
  });
  home.execute();
  await auth0.executeAuth0();
  brickStorage.brickStorage();
  for (const input of document.querySelectorAll('input')) {
    input.addEventListener('blur', checkValidity);
  }
}

window.addEventListener('load', init);
