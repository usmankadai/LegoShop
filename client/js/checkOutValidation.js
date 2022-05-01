import * as home from './home.mjs';
import * as auth0 from './auth0.mjs';
import * as createBasket from './createBasket.mjs';


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
  createBasket.initializeBasket();
  for (const input of document.querySelectorAll('input')) {
    input.addEventListener('blur', checkValidity);
  }
}

window.addEventListener('load', init);
