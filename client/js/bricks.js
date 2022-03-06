import * as home from './home.js';
// import * as auth0 from './auth0.js';
// import * as cart from './cart.js';

async function init() {
//   home.templateHeader();
//   home.templateMain();
//   home.templateFooter();
//   home.dropOptions();
  // home.activePage();
//   document.querySelector('#bricks').addEventListener('click', await home.createInventoryBricks);
//   document.querySelector('#kits').addEventListener('click', await home.createInventoryKits);
  await home.createInventoryBricks;
//   await auth0.initializeAuth0Client();
//   await auth0.setupListeners();
//   await auth0.updateAuthUI();
//   await auth0.handleAuth0Redirect();
//   cart.cartTemplate();
//   cart.cartPage();
  // designKit.template();
  // cart.showCheckoutPage();
  // cart.hello();
  // home.execute();
  // home.trial2();
}

window.addEventListener('load', init);
