import * as home from './home.js';
import * as auth0 from './auth0.js';
import * as cart from './cart.js';
import * as bricks from './bricks.js';
// import * as searchPage from './search.js';

// const searchForm = document.querySelector('#searchForm');
// const searchInput = document.querySelector('#searchSite');
// const search = document.querySelector('#search');


async function init() {
  bricks.createInventoryBricks();
  home.execute();
  await auth0.executeAuth0();
  cart.executeCheckout();

  /// /////////////////////////////////////////////////////////////////////
  // search.addEventListener('click', loadInventoriesWithSearch);
  // searchForm.addEventListener('submit', loadInventoriesWithSearch);
}
window.addEventListener('load', init);


// function loadInventoriesWithSearch(e) {
//   e.preventDefault();
//   loadInventories();
// }


async function loadInventories() {

}
