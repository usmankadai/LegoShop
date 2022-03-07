export function cartTemplate() {
  const selectMain = document.getElementById('tempMain');

  const cartTemplate = document.querySelector('#cartTemplate');
  const createDiv = document.createElement('div');
  createDiv.className = 'cartPage';
  cartTemplate.append(createDiv);

  const cartPage = document.querySelector('.cartPage');
  const cart = document.querySelector('#cart');
  cart.addEventListener('click', () => {
    const cloned = cartPage.cloneNode(true);
    selectMain.textContent = '';
    selectMain.append(cloned);
    showCheckoutPage();
  });
}

export function addToCart() {
//   const selectMain = document.getElementById('tempMain');
//   const addToCart = document.querySelector('.addToCart');
//   addToCart.addEventListener('click', () => {
//     const cloned = addToCart.cloneNode(true);
//     selectMain.append(cloned);
//   });
}

export function cartPage() {
  const grid = document.querySelector('.grid');
  const cartPage = document.querySelector('.cartPage');
  const headerTemp = document.createElement('template');
  headerTemp.id = 'checkout';

  const addressInfoPage = document.createElement('div');
  addressInfoPage.className = 'addressInfoPage';

  const createDiv = document.createElement('div');
  createDiv.className = 'cartHeader';
  const createH1 = document.createElement('h1');
  createH1.textContent = 'Checkout';
  const createSignInPage = document.createElement('div');
  createSignInPage.className = 'cartSignIn';

  const address = document.createElement('div');
  address.className = 'address';

  const order = document.createElement('h1');
  order.textContent = 'Where should we send your order?';

  const enterName = document.createElement('h2');
  enterName.textContent = 'Enter your name.';

  const userTitle = document.createElement('h3');
  userTitle.textContent = 'Title';

  const select = document.createElement('select');
  // select.textContent = 'Title';
  userTitle.append(select);

  const shippingAdd = document.createElement('h2');
  shippingAdd.textContent = 'Tell us your shipping address.';

  const userContact = document.createElement('h2');
  userContact.textContent = 'What\'s your contact information?';

  const createGuest = document.createElement('div');
  createGuest.className = 'createGuest';
  const guestCheckout = document.createElement('h1');
  guestCheckout.textContent = 'Guest Checkout';

  const checkoutWithOutAcc = document.createElement('p');
  checkoutWithOutAcc.textContent = 'Proceed to checkout without an account';

  const continueButton = document.createElement('button');
  continueButton.className = 'continueButton';
  continueButton.textContent = 'Continue as Guest';

  const orderSummary = document.createElement('h1');
  orderSummary.textContent = 'Order Summary:';
  createDiv.append(createH1, orderSummary);
  address.append(order, enterName, userTitle, shippingAdd, userContact);
  addressInfoPage.append(createDiv, address);
  headerTemp.append(addressInfoPage);
  createGuest.append(guestCheckout, checkoutWithOutAcc, continueButton);
  createSignInPage.append(createGuest);
  cartPage.append(createSignInPage);
  grid.append(headerTemp);
}

function showCheckoutPage() {
  const selectMain = document.getElementById('tempMain');
  const cartPage = document.querySelector('.addressInfoPage');
  const continueButton = document.querySelector('.continueButton');
  continueButton.addEventListener('click', () => {
    console.log('debug');
    const cloned = cartPage.cloneNode(true);
    selectMain.textContent = '';
    selectMain.append(cloned);
    console.log(cloned);
  });
}

export function executeCheckout() {
  cartTemplate();
  cartPage();
}
