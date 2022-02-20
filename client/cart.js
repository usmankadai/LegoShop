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
    selectMain.appendChild(cloned);
  });
}

export function addToCart() {
  const selectMain = document.getElementById('tempMain');
  const addToCart = document.querySelector('.addToCart');
  addToCart.addEventListener('click', () => {
    const cloned = addToCart.cloneNode(true);
    selectMain.appendChild(cloned);
  });
}

