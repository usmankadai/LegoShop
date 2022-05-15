// static home page

function templateHeader() {
  const selectH1 = document.querySelector('header');
  const log = document.createElement('a');
  log.id = 'logo';
  log.className = 'Lego';
  log.href = '/';
  log.textContent = 'LEGO';

  const options = document.createElement('div');
  options.id = 'options';
  options.className = 'fas fa-bars';

  const tabs = document.createElement('nav');
  tabs.className = 'tabs';

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
  navButton1.href = '/';
  navButton1.textContent = 'Home';

  const navButton2 = document.getElementById('navButton2');
  navButton2.id = 'bricks';
  navButton2.href = '/bricks.html';
  navButton2.textContent = 'Bricks';

  const navButton3 = document.getElementById('navButton3');
  navButton3.id = 'kits';
  navButton3.href = '/kits.html';
  navButton3.textContent = 'Kits';

  const navButton5 = document.getElementById('navButton4');
  navButton5.id = 'wishlist';
  navButton5.href = '/wishlist.html';
  navButton5.textContent = 'Wishlist';
  navButton5.className += ' fas fa-heart';

  const searchDiv = document.createElement('div');
  searchDiv.className = 'search';

  const sort = document.createElement('div');
  sort.className = 'sort';

  const select = document.createElement('select');
  select.id = 'sort';

  const searchForm = document.createElement('form');
  searchForm.id = 'searchForm';
  const searchInput = document.createElement('input');
  searchInput.id = 'searchSite';
  searchInput.type = 'search';
  searchInput.placeholder = 'Search items...';

  const searchButton = document.createElement('a');
  searchButton.id = 'search';
  searchButton.value = 'searchSite';
  searchButton.className = 'fas fa-search';

  searchForm.append(searchInput, searchButton);
  searchDiv.append(searchForm);
  sort.append(select);
  selectH1.append(searchDiv, sort);

  const iconsDiv = document.createElement('div');
  iconsDiv.className = 'icons';
  selectH1.append(iconsDiv);
}

function icons() {
  let nav = 0;
  const selectIcon = document.querySelector('.icons');

  for (let i = 1; i <= 2; i += 1) {
    const log = document.createElement('a');
    nav++;
    log.id = `icon${nav}`;
    selectIcon.append(log);
  }

  const cartIcon = document.getElementById('icon1');
  cartIcon.id = 'cart';
  cartIcon.href = '/cart.html';
  cartIcon.className = 'fas fa-shopping-cart';
  cartIcon.textContent = '0';

  const userIcon = document.getElementById('icon2');
  userIcon.id = 'user';
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


function templateFooter() {
  const selectFooter = document.querySelector('footer');
  const createDiv = document.createElement('div');
  createDiv.className = 'footerLinks';
  selectFooter.append(createDiv);

  const footerLinks = document.querySelector('.footerLinks');
  const createFirstLink = document.createElement('h3');
  createFirstLink.textContent = 'UP969376';
  footerLinks.append(createFirstLink);
}

function templateMain() {
  const grid = document.querySelector('.grid');

  const createCartTemp = document.createElement('template');
  createCartTemp.id = 'cartTemplate';

  grid.append(createCartTemp);
}

function toggleLogin() {
  document.querySelector('.loginDiv').classList.toggle('display');
}

function still() {
  document.querySelector('.tabs').classList.toggle('display');
}

function dropOptions() {
  document.querySelector('#user').addEventListener('click', toggleLogin);
  document.querySelector('#options').addEventListener('click', still);
}

export function execute() {
  templateHeader();
  templateMain();
  templateFooter();
  icons();
  dropOptions();
}
