import * as home from './home.js';
import * as auth0 from './auth0.js';
import * as cart from './cart.js';


// const path = {
//     '/': home.createInventory(),
//     '/Bricks/legoId': legoPage.legoPage(),
//     '/Kits/legoId': legoPage.legoPage(),
//   };
//   const request = requestURL.requestURL();
//   const parse = (request.resource ? `/${request.resource}` : '/') +
//   (request.id ? '/legoId' : '') +
//   (request.verb ? `/${request.verb}` : '');
//   const sc = path[parse] ? path[parse] : error.errorPage();
async function init() {
  home.templateHeader();
  home.templateMain();
  home.templateFooter();
  home.dropOptions();
  // home.activePage();
  await home.createInventoryBricks();
  await home.createInventoryKits();
  await auth0.initializeAuth0Client();
  await auth0.setupListeners();
  await auth0.updateAuthUI();
  await auth0.handleAuth0Redirect();
  cart.cartTemplate();
  cart.cartPage();
  // cart.showCheckoutPage();
  // cart.hello();
  // home.execute();
  // home.trial2();
}

window.addEventListener('load', init);
// window.addEventListener('hashchange', init);
