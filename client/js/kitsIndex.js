import * as home from './home.js';
import * as auth0 from './auth0.js';
import * as cart from './cart.js';
import * as kits from './kits.js';

async function init() {
  kits.createInventoryKits();
  await home.execute();
  await auth0.executeAuth0();
  cart.executeCheckout();
}

window.addEventListener('load', init);
