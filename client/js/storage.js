export function setupListeners(legos) {
  const cart = document.querySelector('.addToCart');

  cart.addEventListener('click', () => {
    storage(legos);
    totalAmount(legos);
  });
}

export function listeners(legos) {
  const cart = document.querySelectorAll('.addToCart');

  for (let i = 0; i < cart.length; i++) {
    // console.log('running');
    cart[i].addEventListener('click', () => {
      storage(legos[i]);
      totalAmount(legos[i]);
    });
  }
}


// after reloading the page the number of items in the cart should not disappear.
// It should be the same as the items in localStorage
export function cartReloadPage() {
  const cartQuantity = localStorage.getItem('cartQuantity');
  if (cartQuantity) {
    document.querySelector('#cart').textContent = cartQuantity;
  }
}


function storage(lego) {
  let cartQuantity = localStorage.getItem('cartQuantity');

  cartQuantity = parseInt(cartQuantity);

  if (cartQuantity) {
    localStorage.setItem('cartQuantity', cartQuantity + 1);
    document.querySelector('#cart').textContent = cartQuantity + 1;
  } else {
    localStorage.setItem('cartQuantity', 1);
    document.querySelector('#cart').textContent = 1;
  }
  // saves lego being clicked to the localStorage
  saveBrick(lego);
}

function saveBrick(lego) {
  let basket = localStorage.getItem('lego inside cart');
  basket = JSON.parse(basket);

  if (basket != null) {
    if (basket[lego.legoName] === undefined) {
      basket = {
        ...basket,
        [lego.legoName]: lego,
      };
    }
    basket[lego.legoName].cart += 1;
  } else {
    lego.cart = 1;
    basket = {
      [lego.legoName]: lego,
    };
  }
  localStorage.setItem('lego inside cart', JSON.stringify(basket));
}

function totalAmount(lego) {
  // this function is similar to storage function it adds the total amount to the localStorage
  // and updates the total amount if there is another lego being added.

  let totalAmount = localStorage.getItem('totalAmount');
  console.log('The amount is', totalAmount);

  // checks whatever that was in totalAmount add it to the new amount that is being clicked.
  if (totalAmount != null) {
    totalAmount = parseInt(totalAmount);
    localStorage.setItem('totalAmount', totalAmount + lego.price);
  } else {
    localStorage.setItem('totalAmount', lego.price);
  }
}
