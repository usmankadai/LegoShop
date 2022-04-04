import * as home from './home.js';
import * as auth0 from './auth0.js';
import * as brickStorage from './bricksLocalStorage.js';
// import * as kitStorage from './kitsLocalStorage.js';


async function init() {
  home.execute();
  await auth0.executeAuth0();
  brickStorage.brickStorage();
  // kitStorage.kitStorage();
  initializeCart();
}

window.addEventListener('load', init);

function initializeCart() {
  let cart = localStorage.getItem('lego inside cart');
  const totalAmount = localStorage.getItem('totalAmount');
  cart = JSON.parse(cart);
  if (cart) {
    const legoBasket = document.querySelector('.legoBasket');
    legoBasket.textContent = '';
    // check the value of the lego inside cart i.e the one we got in line 16 and loop through
    // each lego similar to how it is in bricks.js and kits.js
    const value = Object.values(cart);
    value.forEach(lego => {
      const createDiv = document.createElement('div');
      createDiv.className = 'cartDiv';

      const createImg = document.createElement('img');
      createImg.src = `${lego.legoImage}`;
      createImg.alt = `#${lego.legoName}`;

      const cart = document.createElement('div');
      cart.textContent = `${lego.cart}`;

      const legoPrice = document.createElement('div');
      legoPrice.textContent = `£${lego.price}`;

      const subTotal = document.createElement('div');
      subTotal.textContent = `£${lego.price * lego.cart}`;

      // const add = document.createElement('a');
      // add.className = 'add';
      // add.textContent = '+';

      createDiv.append(createImg, cart, legoPrice, subTotal);
      legoBasket.append(createDiv);
    });
  }

  const total = document.querySelector('.total');
  // const continues = document.querySelector('.continueToCheckout');

  total.textContent = `Total: £${totalAmount}`;
  if (total.textContent === 'Total: £null') {
    total.className = 'emptyCart';
    // continues.className = 'emptyCart';
    total.textContent = 'Your Cart is empty';
  }
  const empty = document.querySelector('.legoBasket');
  if (empty.textContent === '') {
    const cartStyle = document.querySelector('.cartStyle');
    cartStyle.className = 'empty';
    cartStyle.textContent = 'Your Cart is empty, visit the link below to add items to your cart';

    const usefulLinks = document.createElement('div');
    usefulLinks.className = 'usefulLinks';

    const homeLink = document.createElement('a');
    homeLink.textContent = 'Home';
    homeLink.href = '/';

    const brickLink = document.createElement('a');
    brickLink.textContent = 'Bricks';
    brickLink.href = '/bricks.html';

    const kitLink = document.createElement('a');
    kitLink.textContent = 'Kits';
    kitLink.href = '/kits.html';

    usefulLinks.append(homeLink, brickLink, kitLink);
    cartStyle.append(usefulLinks);
  }

  const checkout = document.querySelector('.continueToCheckout');
  checkout.addEventListener('click', () => {
    window.location = '/checkout.html';
  });
}
