import * as home from './home.mjs';
import * as auth0 from './auth0.mjs';
import * as createBasket from './createBasket.mjs';


async function init() {
  home.execute();
  await auth0.executeAuth0();
  createBasket.initializeBasket();
}

window.addEventListener('load', init);
