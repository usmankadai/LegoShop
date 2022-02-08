// import inventories from './brickAndKitData.js';

// static home page

export function templateHeader() {
  const selectH1 = document.querySelector('header');

  const log = document.createElement('a');
  log.id = 'logo';
  log.className = 'Lego';
  log.href = '#/';
  log.textContent = 'LEGO';

  const options = document.createElement('div');
  options.id = 'options';
  options.className = 'fas fa-bars';

  const tabs = document.createElement('nav');
  tabs.className = 'tabs';
  // selectH1.append(log, tabs);

  selectH1.append(options, log, tabs);

  let nav = 0;
  const selectNav = document.querySelector('.tabs');
  for (let i = 1; i <= 4; i += 1) {
    const log = document.createElement('a');
    nav++;
    log.id = `navButton${nav}`;
    log.className = 'tab';
    log.dataset.set = nav;
    selectNav.append(log);
  }

  const navButton1 = document.getElementById('navButton1');
  navButton1.id = 'home';
  navButton1.className = 'tab active';
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
  navButton4.id = 'Design';
  navButton4.href = '#/Design';
  navButton4.textContent = 'Design Kit';

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
  cartIcon.textContent = '(0)';

  const userIcon = document.getElementById('icon8');
  userIcon.id = 'user';
  userIcon.href = '#/user';
  userIcon.className = 'fas fa-user';

  const loginDiv = document.createElement('div');
  loginDiv.className = 'loginDiv';
  selectIcon.append(loginDiv);
  const login = document.createElement('button');
  login.id = 'login';
  login.className = 'credentials';
  login.textContent = 'Login';
  login.disabled = true;
  loginDiv.append(login);
  const logout = document.createElement('button');
  logout.id = 'logout';
  logout.className = 'credentials';
  logout.textContent = 'Logout';
  logout.disabled = true;
  loginDiv.append(logout);
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

export async function createInventory() {
  // Uploading JSON data Referenced from MDN. https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  const response = await fetch('http://localhost:8080/inventories', {
    headers: {
      'Content-type': 'application/json',
    },
  });
  if (!response || !response.ok) {
    response.sendStatus(404);
    return;
  }

  const legos = await response.json();

  const selectMain = document.getElementById('tempMain');
  const createDiv = document.createElement('div');
  createDiv.className = 'mainLinks';
  selectMain.append(createDiv);

  legos.forEach(lego => {
    const mainLinks = document.querySelector('.mainLinks');
    const createLi = document.createElement('li');
    createLi.className = 'lis';
    const createLis = document.createElement('div');

    createLis.className = 'legoDiv';
    createLis.id = `lego${lego.legoId}`;
    createLis.dataset.set = `${lego.categoryId}`;

    const createA = document.createElement('a');
    createA.id = `a${lego.legoId}`;
    createA.href = `#/${lego.category}/${lego.legoId}`;

    const legoName = document.createElement('div');
    legoName.className = 'legoName';

    const legoPrice = document.createElement('div');
    legoPrice.className = 'legoPrice';
    legoPrice.id = `legoPrice${lego.legoId}`;
    legoPrice.textContent = `£${lego.price}`;
    if (lego.price < 1) {
      legoPrice.textContent = `${lego.price}p`;
    }
    // const makeUSD = document.querySelector()

    const addToCart = document.createElement('button');
    addToCart.className = 'addToCart';
    addToCart.textContent = 'Add to Cart';

    const legoNameLink = document.createElement('a');
    legoNameLink.className = 'legoNameLink';
    legoNameLink.id = `legoLink${lego.legoId}`;
    legoNameLink.textContent = `${lego.name}`;
    legoNameLink.href = `#/${lego.category}/${lego.legoId}`;

    const createImg = document.createElement('img');
    createImg.id = `image${lego.legoId}`;
    createImg.src = `${lego.image}`;
    createImg.alt = `#${lego.name}`;

    legoName.append(legoNameLink);
    createA.append(createImg);
    createLis.append(createA, legoName, legoPrice, addToCart);
    createLi.append(createLis);
    mainLinks.append(createLi);
  });
  const lego13 = document.querySelector('#lego13');
  lego13.className = 'legoDiv active';
}

function toggleLogin() {
  document.querySelector('.loginDiv').classList.toggle('display');
}
function still() {
  document.querySelector('.tabs').classList.toggle('display');
}
export function dropOptions() {
  document.querySelector('#user').addEventListener('click', toggleLogin);
  document.querySelector('#options').addEventListener('click', still);
}

export function trial() {
  const changeTabs = document.querySelectorAll('.tab');

  for (let i = 0; i < changeTabs.length; i++) {
    const changeTab = changeTabs[i];
    const page = changeTab.dataset.set;
    changeTab.addEventListener('click', () => {
      document.querySelector('.tabs .tab.active').classList.remove('active');
      changeTab.classList.add('active');
      console.log(page);
      changePage(page);
    });
  }

  function changePage(page) {
    const activePage = document.querySelector('.pages .page.active');
    activePage.classList.remove('active');
    const newPage = document.querySelector(`.pages .page[data-set="${page}"]`);
    newPage.classList.add('active');
  }
}
