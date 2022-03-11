import * as home from './home.js';
import * as auth0 from './auth0.js';
import * as cart from './cart.js';
// import * as bricks from './bricks.js';

async function init() {
  createInventoryBricks();
  home.execute();
  await auth0.executeAuth0();
  cart.executeCheckout();
  cartReloadPage();
  await trying();
  // excuteAddToCart();
  // addToCart();
  // se();
  /// /////////////////////////////////////////////////////////////////////
  // search.addEventListener('click', loadInventoriesWithSearch);
  // searchForm.addEventListener('submit', loadInventoriesWithSearch);
}
window.addEventListener('load', init);


// function loadInventoriesWithSearch(e) {
//   e.preventDefault();
//   loadInventories();
// }


// async function loadInventories() {

// }

async function createInventoryBricks() {
  const brickTemplate = document.querySelector('.bricksPage');
  const createDiv = document.createElement('div');
  createDiv.className = 'mainLinks';
  brickTemplate.append(createDiv);

  console.log('bricks loaded');
  // Uploading JSON data Referenced from MDN. https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  const response = await fetch('/bricks', {
    headers: {
      'Content-type': 'application/json',
    },
  });
  if (!response || !response.ok) {
    response.sendStatus(404);
    return;
  }

  const legos = await response.json();

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
    // createA.href = '/brickInfo.html';
    // createA.href = `/#/${lego.category}/${lego.legoId}`;
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
    // addToCart.href = 'cart.html';
    // addToCart.addEventListener('click', addToCart());
    // const basket = [];

    // addToCart.addEventListener('click', () => {
    //   basket.push(lego);
    //   console.log(basket);
    // });

    const legoNameLink = document.createElement('a');
    legoNameLink.className = 'legoNameLink';
    legoNameLink.id = `legoLink${lego.legoId}`;
    legoNameLink.textContent = `${lego.name}`;
    // legoNameLink.href = `/#/${lego.category}/${lego.legoId}`;
    // legoNameLink.href = '/brickInfo.html';
    legoNameLink.href = `brick.html?legoId=${lego.legoId}`;

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

  // function addToCarts(legoId) {
  //   const basket = [];
  //   const inventory = legos.find((lego) => lego.legoId === legoId);
  //   basket.push(inventory);
  //   console.log(basket);
  //   // console.log('add');
  //   // console.log(legoId);
  // }
}

// async function excuteAddToCart() {
//   const response = await fetch('/bricks', {
//     headers: {
//       'Content-type': 'application/json',
//     },
//   });
//   if (!response || !response.ok) {
//     response.sendStatus(404);
//     return;
//   }

//   const legos = await response.json();

//   legos.forEach((lego) => {
//     document.querySelector('.addToCart').addEventListener('click', () => {
//       console.log(`${lego.legoId}`);
//     });
//   });
// }
// excuteAddToCart();
// function addToCart(legoId) {
//   // console.log(legoId);
// }


// let lego = [];
async function trying() {
  const response = await fetch('/bricks', {
    headers: {
      'Content-type': 'application/json',
    },
  });

  const legos = await response.json();

  const cart = document.querySelectorAll('.addToCart');

  for (let i = 0; i < cart.length; i++) {
    // console.log('running');
    cart[i].addEventListener('click', () => {
      // console.log('addToCart');
      storage(legos[i]);
    });
  }
}

// after reloading the page the number of items in the cart should not disappear.
// It should be the same as the items in localStorage

function cartReloadPage() {
  const cartItems = localStorage.getItem('cartnumber');
  if (cartItems) {
    document.querySelector('#cart').textContent = cartItems;
  }
}

function storage(lego) {
  // console.log('product clicked', lego);


  let cartItems = localStorage.getItem('cartnumber');

  cartItems = parseInt(cartItems);

  if (cartItems) {
    localStorage.setItem('cartnumber', cartItems + 1);
    document.querySelector('#cart').textContent = cartItems + 1;
  } else {
    localStorage.setItem('cartnumber', 1);
    document.querySelector('#cart').textContent = 1;
  }

  // saves brick being clicked to the localStorage
  saveBrick(lego);
}

function saveBrick(lego) {
  // console.log('inside of set item');
  // console.log('product clicked', lego);

  let basket = localStorage.getItem('lego in basket');
  basket = JSON.parse(basket);


  lego.cart = 1;
  if (basket !== null) {
    if (basket[lego.name] === undefined) {
      basket = {
        ...basket,
        [lego.name]: lego,
      };
    }
    basket[lego.name].cart += 1;
  } else {
    lego.cart = 1;

    basket = {
      [lego.name]: lego,
    };
  }
  // basket = {
  //   [lego.category]: lego,
  // };
  localStorage.setItem('lego inside cart', JSON.stringify(basket));
  // console.log('cart items are', basket);
}


// if (basket != null) {
//   if (basket[lego.name] === undefined) {
//     basket = {
//       ...basket,
//       [lego.name]: lego,
//     };
//   }
//   basket[lego.name].cart += 1;
// } else {
//   lego.cart = 1;

//   basket = {
//     [lego.name]: lego,
//   };
// }
