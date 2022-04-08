import * as home from './home.js';
import * as auth0 from './auth0.js';

async function init() {
  home.execute();
  await auth0.executeAuth0();
}

window.addEventListener('load', init);
