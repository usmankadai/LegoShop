import * as home from './home.js';
// import * as legoPage from './legoPageOnClick.js';
import * as inventories from './templateInventories.js';

function init() {
//   const fetchIt = document.getElementById('tempMain');
//   fetchIt.addEventListener('load', await inventories.createInventory());
  inventories.createInventory();
  //   await inventories.createInventory();
  home.templateHeader();
  home.templateFooter();
//   inventories.createLe();
//   document.querySelector('click', legoPage.legoPage());
}

window.addEventListener('load', init);
// window.addEventListener('hashchange', init);
