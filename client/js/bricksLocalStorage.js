async function fetchBricks() {
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
      storage(legos[i]);
    });
  }
}

// after reloading the page the number of items in the cart should not disappear.
// It should be the same as the items in localStorage

function cartReloadPage() {
  const cartItems = localStorage.getItem('cartQuantity');
  if (cartItems) {
    document.querySelector('#cart').textContent = cartItems;
  }
}

function storage(lego) {
  let cartItems = localStorage.getItem('cartQuantity');

  cartItems = parseInt(cartItems);

  if (cartItems) {
    localStorage.setItem('cartQuantity', cartItems + 1);
    document.querySelector('#cart').textContent = cartItems + 1;
  } else {
    localStorage.setItem('cartQuantity', 1);
    document.querySelector('#cart').textContent = 1;
  }

  // saves brick being clicked to the localStorage
  saveBrick(lego);
}

function saveBrick(lego) {
  let basket = localStorage.getItem('lego inside cart');
  basket = JSON.parse(basket);

  if (basket != null) {
    if (basket[lego.name] === undefined) {
      basket = {
        ...basket,
        [lego.name]: lego,
      };
    }
    // lego.cart += 1;
    // basket = {
    //   [lego.name]: lego,
    // };
    basket[lego.name].cart += 1;
  } else {
    lego.cart = 1;
    basket = {
      [lego.name]: lego,
    };
  }

  localStorage.setItem('lego inside cart', JSON.stringify(basket));
}

export async function brickStorage() {
  await fetchBricks();
  cartReloadPage();
}
