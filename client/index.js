import * as home from './home.js';
import * as auth0 from './auth0.js';

async function init() {
  home.createInventory();
  //   await inventories.createInventory();
  home.templateHeader();
  home.templateFooter();
  await auth0.initializeAuth0Client();
  await auth0.setupListeners();
  await auth0.updateAuthUI();
  await auth0.handleAuth0Redirect();
  // home.myFunction();
}

window.addEventListener('load', init);
// window.addEventListener('hashchange', init);
