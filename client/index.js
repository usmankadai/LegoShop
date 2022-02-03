import * as home from './home.js';
import * as auth0 from './auth0.js';

async function init() {
  home.createInventory();
  //   await inventories.createInventory();
  home.templateHeader();
  home.templateFooter();
  home.dropOptions();
  await auth0.initializeAuth0Client();
  await auth0.setupListeners();
  await auth0.updateAuthUI();
  await auth0.handleAuth0Redirect();
  window.addEventListener('click', home.close);

  // home.myFunction();
}

window.addEventListener('load', init);

// window.addEventListener('hashchange', init);
