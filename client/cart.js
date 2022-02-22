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
//     selectMain.appendChild(cloned);
//   });
}

export function cartPage() {
  const grid = document.querySelector('.grid');
  const cartPage = document.querySelector('.cartPage');
  const headerTemp = document.createElement('template');
  headerTemp.id = 'checkout';
  const createDiv = document.createElement('div');
  createDiv.className = 'cartHeader';
  const createH1 = document.createElement('h1');
  createH1.textContent = 'Checkout';
  const createSignInPage = document.createElement('div');
  createSignInPage.className = 'cartSignIn';

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
  headerTemp.append(createDiv);
  createGuest.append(guestCheckout, checkoutWithOutAcc, continueButton);
  createSignInPage.append(createGuest);
  cartPage.append(createSignInPage);
  grid.append(headerTemp);
}

function showCheckoutPage() {
  const selectMain = document.getElementById('tempMain');
  const cartPage = document.querySelector('.cartHeader');
  const continueButton = document.querySelector('.continueButton');
  continueButton.addEventListener('click', () => {
    const cloned = cartPage.cloneNode(true);
    selectMain.textContent = '';
    selectMain.append(cloned);
    console.log(cloned);
  });
}
// showCheckoutPage();

// export function hello() {
//   document.querySelector('.continueButton').addEventListener('click', showCheckoutPage);
// }
// hello();
