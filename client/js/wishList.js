import * as home from './home.js';
import * as auth0 from './auth0.js';
import * as cart from './cart.js';

async function init() {
  home.execute();
  await auth0.executeAuth0();
  cart.executeCheckout();
}

window.addEventListener('load', init);
