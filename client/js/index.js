import * as home from './home.js';
import * as auth0 from './auth0.js';
import * as cart from './cart.js';
import * as brickStorage from './bricksLocalStorage.js';

async function init() {
  home.execute();
  await auth0.executeAuth0();
  cart.executeCheckout();
  brickStorage.brickStorage();
}

window.addEventListener('load', init);
