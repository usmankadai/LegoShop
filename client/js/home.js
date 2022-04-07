// static home page

export function templateHeader() {
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

  const navButton4 = document.getElementById('navButton4');
  navButton4.id = 'design';
  navButton4.href = '/designKit.html';
  navButton4.textContent = 'Design Kit';

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

  let sorting = 0;
  const selectSort = document.querySelector('#sort');
  for (let i = 1; i <= 17; i += 1) {
    const log = document.createElement('option');
    sorting++;
    log.id = `sort${sorting}`;
    selectSort.append(log);
  }

  const sort1 = document.getElementById('sort1');
  sort1.textContent = 'All';

  const sort2 = document.getElementById('sort2');
  sort2.textContent = '1x1';

  const sort3 = document.getElementById('sort3');
  sort3.textContent = '1x2';

  const sort4 = document.getElementById('sort4');
  sort4.textContent = '2x2';

  const sort5 = document.getElementById('sort5');
  sort5.textContent = '2x3';

  const sort6 = document.getElementById('sort6');
  sort6.textContent = 'Gold';

  const sort7 = document.getElementById('sort7');
  sort7.textContent = 'Red';

  const sort8 = document.getElementById('sort8');
  sort8.textContent = 'Aqua';

  const sort9 = document.getElementById('sort9');
  sort9.textContent = 'Pink';

  const sort10 = document.getElementById('sort10');
  sort10.textContent = 'Green';

  const sort11 = document.getElementById('sort11');
  sort11.textContent = 'Orange';

  const sort12 = document.getElementById('sort12');
  sort12.textContent = 'Lilac';

  const sort13 = document.getElementById('sort13');
  sort13.textContent = 'Brown';

  const sort14 = document.getElementById('sort14');
  sort14.textContent = 'Yellow';

  const sort15 = document.getElementById('sort15');
  sort15.textContent = 'Blue';

  const sort16 = document.getElementById('sort16');
  sort16.textContent = 'White';

  const sort17 = document.getElementById('sort17');
  sort17.textContent = 'Purple';


  const iconsDiv = document.createElement('div');
  iconsDiv.className = 'icons';
  selectH1.append(iconsDiv);

  const selectIcon = document.querySelector('.icons');

  for (let i = 1; i <= 3; i += 1) {
    const log = document.createElement('a');
    nav++;
    log.id = `icon${nav}`;
    selectIcon.append(log);
  }

  const wishlistIcon = document.getElementById('icon5');
  wishlistIcon.id = 'wishlist';
  wishlistIcon.href = '/wishlist.html';
  wishlistIcon.className = 'fas fa-heart';

  const cartIcon = document.getElementById('icon6');
  cartIcon.id = 'cart';
  cartIcon.href = '/cart.html';
  cartIcon.className = 'fas fa-shopping-cart';
  cartIcon.textContent = '(0)';

  const userIcon = document.getElementById('icon7');
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

export function templateFooter() {
  const selectFooter = document.querySelector('footer');
  const createDiv = document.createElement('div');
  createDiv.className = 'footerLinks';
  selectFooter.append(createDiv);

  const footerLinks = document.querySelector('.footerLinks');
  const createFirstLink = document.createElement('h3');
  createFirstLink.textContent = 'UP969376';
  footerLinks.append(createFirstLink);
}

export function templateMain() {
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
export function dropOptions() {
  document.querySelector('#user').addEventListener('click', toggleLogin);
  document.querySelector('#options').addEventListener('click', still);
}

async function sorting(e) {
  const color = e.target.options[e.target.selectedIndex].text;
  const legos = await fetchSortedItems(color);
  console.log(legos);
  const legosDOM = document.querySelectorAll('.lis');
  legosDOM.forEach(lego => {
    lego.remove();
  });

  const mainLinks = document.querySelector('.mainLinks');
  const div = document.createElement('div');
  div.className = `filtered ${color}`;
  mainLinks.append(div);

  console.log('sorting', color);
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
    createA.href = `brick.html?legoId=${lego.legoId}`;

    const legoName = document.createElement('div');
    legoName.className = 'legoName';

    const legoPrice = document.createElement('div');
    legoPrice.className = 'legoPrice';
    legoPrice.id = `legoPrice${lego.legoId}`;
    legoPrice.textContent = `£${lego.price}`;
    if (lego.price < 1) {
      // check if the price is less than £1, get rid of the first two characters which is 0 and point.
      legoPrice.textContent = `${lego.price}p`.slice(2);
    }
    const addToCart = document.createElement('a');
    addToCart.className = 'addToCart';
    addToCart.textContent = 'Add to Cart';

    const legoNameLink = document.createElement('a');
    legoNameLink.className = 'legoNameLink';
    legoNameLink.id = `legoLink${lego.legoId}`;
    legoNameLink.textContent = `${lego.legoName}`;
    legoNameLink.href = `brick.html?legoId=${lego.legoId}`;

    const createImg = document.createElement('img');
    createImg.id = `image${lego.legoId}`;
    createImg.src = `${lego.legoImage}`;
    createImg.alt = `#${lego.legoName}`;

    legoName.append(legoNameLink);
    createA.append(createImg);
    createLis.append(createA, legoName, legoPrice, addToCart);
    createLi.append(createLis);
    mainLinks.append(createLi);
  });
}

async function fetchSortedItems(color) {
  const response = await fetch(`/bricks/${color}`);
  return response.json();
}

// function filter() {
//   const legos = document.querySelectorAll('.mainLinks');
//   legos.forEach(lego => {
//     lego.remove();
//   });
// }

export function execute() {
  templateHeader();
  templateMain();
  templateFooter();
  dropOptions();
  document.querySelector('#sort').addEventListener('change', sorting);
}
