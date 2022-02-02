// import inventories from './brickAndKitData.js';

// static home page

export function templateHeader() {
  const selectH1 = document.querySelector('header');

  const log = document.createElement('a');
  log.id = 'logo';
  log.className = 'Lego';
  log.href = '#/';
  log.textContent = 'LEGO';

  // const menu = document.createElement('div');
  // menu.id = 'menu';
  // menu.className = 'fas fa-bars';

  const navBar = document.createElement('nav');
  navBar.className = 'navBar';
  selectH1.append(log, navBar);

  // selectH1.append(menu, log, navBar);

  let nav = 0;
  const selectNav = document.querySelector('.navBar');
  for (let i = 1; i <= 4; i += 1) {
    const log = document.createElement('a');
    nav++;
    log.id = `navButton${nav}`;
    selectNav.append(log);
  }

  const navButton1 = document.getElementById('navButton1');
  navButton1.id = 'home';
  navButton1.href = '#/home';
  navButton1.textContent = 'Home';

  const navButton2 = document.getElementById('navButton2');
  navButton2.id = 'bricks';
  navButton2.href = '#/Bricks';
  navButton2.textContent = 'Bricks';

  const navButton3 = document.getElementById('navButton3');
  navButton3.id = 'kits';
  navButton3.href = '#/Kits';
  navButton3.textContent = 'Kits';

  const navButton4 = document.getElementById('navButton4');
  navButton4.id = 'review';
  navButton4.href = '#/Review';
  navButton4.textContent = 'Review';

  const iconsDiv = document.createElement('div');
  iconsDiv.className = 'icons';
  selectH1.append(iconsDiv);

  const selectIcon = document.querySelector('.icons');
  const searchInput = document.createElement('input');
  searchInput.placeholder = 'Search items...';
  selectIcon.append(searchInput);

  for (let i = 1; i <= 4; i += 1) {
    const log = document.createElement('a');
    nav++;
    log.id = `icon${nav}`;
    selectIcon.append(log);
  }

  const searchIcon = document.getElementById('icon5');
  searchIcon.id = 'search';
  searchIcon.href = '#/search';
  searchIcon.className = 'fas fa-search';

  const favoriteIcon = document.getElementById('icon6');
  favoriteIcon.id = 'favorite';
  favoriteIcon.href = '#/favorite';
  favoriteIcon.className = 'fas fa-heart';

  const cartIcon = document.getElementById('icon7');
  cartIcon.id = 'cart';
  cartIcon.href = '#/cart';
  cartIcon.className = 'fas fa-shopping-cart';
  cartIcon.textContent = '(0)'

  const userIcon = document.getElementById('icon8');
  userIcon.id = 'user';
  userIcon.href = '#/user';
  userIcon.className = 'fas fa-user';
}

export function templateFooter() {
  const selectFooter = document.querySelector('footer');
  const createDiv = document.createElement('div');
  createDiv.className = 'footerLinks';
  selectFooter.append(createDiv);

  const footerLinks = document.querySelector('.footerLinks');
  const createFirstLink = document.createElement('h3');
  createFirstLink.textContent = 'About us';
  footerLinks.append(createFirstLink);
}

// export async function createInventory() {
// //   const { legos } = inventories;
//   const response = await fetch('http://localhost:8080/inventories/legos');

//   const legos = await response.json();
//   const selectFooter = document.getElementById('tempMain');
//   const createDiv = document.createElement('div');
//   createDiv.className = 'mainLinks';
//   selectFooter.append(createDiv);

//   legos.forEach(lego => {
//     const mainLinks = document.querySelector('.mainLinks');
//     const createLi = document.createElement('li');
//     const createLis = document.createElement('div');

//     createLis.className = 'legoDiv';
//     createLis.id = `lego${lego.legoId}`;

//     const createA = document.createElement('a');
//     createA.id = `a${lego.legoId}`;
//     createA.href = `#/Brick/${lego.legoId}`;

//     const legoName = document.createElement('div');
//     legoName.className = 'legoName';

//     const legoPrice = document.createElement('div');
//     legoPrice.className = 'legoPrice';
//     legoPrice.id = `legoPrice${lego.legoId}`;
//     legoPrice.textContent = `£${lego.price}`;

//     const legoNameLink = document.createElement('a');
//     legoNameLink.className = 'legoNameLink';
//     legoNameLink.id = `legoLink${lego.legoId}`;
//     legoNameLink.textContent = `${lego.name}`;
//     legoNameLink.href = `#/Brick/${lego.legoId}`;

//     const createImg = document.createElement('img');
//     createImg.id = `image${lego.legoId}`;
//     createImg.src = `${lego.image}`;
//     createImg.alt = `#${lego.name}`;

//     legoName.append(legoNameLink);
//     createA.append(createImg);
//     createLis.append(createA, legoName, legoPrice);
//     createLi.append(createLis);
//     mainLinks.append(createLi);
//   });
// }
