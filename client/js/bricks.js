import * as home from './home.js';
import * as auth0 from './auth0.js';
import * as brickStorage from './bricksLocalStorage.js';
import * as search from './search.js';

async function init() {
  createInventoryBricks();
  home.execute();
  await auth0.executeAuth0();
  brickStorage.brickStorage();
  search.search();
}
window.addEventListener('load', init);

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
  // if (!response || !response.ok) {
  //   response.sendStatus(404);
  //   return;
  // }

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
    legoNameLink.textContent = `${lego.Legoname}`;
    legoNameLink.href = `brick.html?legoId=${lego.legoId}`;

    const createImg = document.createElement('img');
    createImg.id = `image${lego.legoId}`;
    createImg.src = `${lego.image}`;
    createImg.alt = `#${lego.Legoname}`;

    legoName.append(legoNameLink);
    createA.append(createImg);
    createLis.append(createA, legoName, legoPrice, addToCart);
    createLi.append(createLis);
    mainLinks.append(createLi);
  });

  // const sort = document.querySelector('#sort');
  // sort.addEventListener('change', () => {
  //   const s = legos.sort(function (a, b) {
  //     if (a.name > b.name) {
  //       return -1;
  //     } else {
  //       return 1;
  //     }
  //   });
  //   console.log(s);
  // });
}
