import * as home from './home.js';
import * as auth0 from './auth0.js';
import * as brickStorage from './bricksLocalStorage.js';


async function init() {
  home.execute();
  await auth0.executeAuth0();
  brickStorage.brickStorage();
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
      createImg.src = `${lego.image}`;
      createImg.alt = `#${lego.name}`;

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

// export function cartTemplate() {
//   const selectMain = document.getElementById('tempMain');

//   const cartTemplate = document.querySelector('#cartTemplate');
//   const createDiv = document.createElement('div');
//   createDiv.className = 'cartPage';
//   cartTemplate.append(createDiv);

//   const cartPage = document.querySelector('.cartPage');
//   const cart = document.querySelector('#cart');
//   cart.addEventListener('click', () => {
//     const cloned = cartPage.cloneNode(true);
//     selectMain.textContent = '';
//     selectMain.append(cloned);
//     showCheckoutPage();
//   });
// }

// export function cartPage() {
//   const grid = document.querySelector('.grid');
//   const cartPage = document.querySelector('.cartPage');
//   const headerTemp = document.createElement('template');
//   headerTemp.id = 'checkout';

//   const addressInfoPage = document.createElement('div');
//   addressInfoPage.className = 'addressInfoPage';

//   const createDiv = document.createElement('div');
//   createDiv.className = 'cartHeader';
//   const createH1 = document.createElement('h1');
//   createH1.textContent = 'Checkout';
//   const createSignInPage = document.createElement('div');
//   createSignInPage.className = 'cartSignIn';

//   const address = document.createElement('div');
//   address.className = 'address';

//   const order = document.createElement('h1');
//   order.textContent = 'Where should we send your order?';

//   const enterName = document.createElement('h2');
//   enterName.textContent = 'Enter your name.';

//   const userTitle = document.createElement('h3');
//   userTitle.textContent = 'Title';

//   const select = document.createElement('select');
//   userTitle.append(select);

//   const shippingAdd = document.createElement('h2');
//   shippingAdd.textContent = 'Tell us your shipping address.';

//   const userContact = document.createElement('h2');
//   userContact.textContent = 'What\'s your contact information?';

//   const createGuest = document.createElement('div');
//   createGuest.className = 'createGuest';
//   const guestCheckout = document.createElement('h1');
//   guestCheckout.textContent = 'Guest Checkout';

//   const checkoutWithOutAcc = document.createElement('p');
//   checkoutWithOutAcc.textContent = 'Proceed to checkout without an account';

//   const continueButton = document.createElement('button');
//   continueButton.className = 'continueButton';
//   continueButton.textContent = 'Continue as Guest';

//   const orderSummary = document.createElement('h1');
//   orderSummary.textContent = 'Order Summary:';
//   createDiv.append(createH1, orderSummary);
//   address.append(order, enterName, userTitle, shippingAdd, userContact);
//   addressInfoPage.append(createDiv, address);
//   headerTemp.append(addressInfoPage);
//   createGuest.append(guestCheckout, checkoutWithOutAcc, continueButton);
//   createSignInPage.append(createGuest);
//   cartPage.append(createSignInPage);
//   grid.append(headerTemp);
// }

// function showCheckoutPage() {
//   const selectMain = document.getElementById('tempMain');
//   const cartPage = document.querySelector('.addressInfoPage');
//   const continueButton = document.querySelector('.continueButton');
//   continueButton.addEventListener('click', () => {
//     console.log('debug');
//     const cloned = cartPage.cloneNode(true);
//     selectMain.textContent = '';
//     selectMain.append(cloned);
//     console.log(cloned);
//   });
// }
