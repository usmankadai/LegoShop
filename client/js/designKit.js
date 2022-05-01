import * as home from './home.js';
import * as auth0 from './auth0.mjs';
import * as localstorage from './storage.js';


async function init() {
  home.execute();
  await auth0.executeAuth0();
  localstorage.cartReloadPage();
}

window.addEventListener('load', init);
