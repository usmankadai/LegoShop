import * as home from './home.mjs';
import * as auth0 from './auth0.mjs';
import * as createBasket from './createBasket.mjs';

async function init() {
  home.execute();
  await auth0.executeAuth0();
  createBasket.initializeBasket();
  runSearch();
}

window.addEventListener('load', init);

async function runSearch() {
  const params = new URLSearchParams(window.location.search);
  const q = params.get('q') || '';
  const page = document.querySelector('.searchPage');

  const heading = document.createElement('h2');
  heading.className = 'searchHeading';
  heading.textContent = q ? `Results for "${q}"` : 'Search';
  page.append(heading);

  if (!q.trim()) return;

  const res = await fetch(`/search?q=${encodeURIComponent(q)}`);
  const { bricks, kits } = await res.json();

  // Pre-fill the header search input with the current query
  const input = document.getElementById('searchSite');
  if (input) input.value = q;

  const total = bricks.length + kits.length;
  if (total === 0) {
    const empty = document.createElement('div');
    empty.className = 'emptyState';
    empty.innerHTML = `
      <p>No results found for <strong>"${q}"</strong>.</p>
      <div class="usefulLinks">
        <a href="/bricks.html">Browse Bricks</a>
        <a href="/kits.html">Browse Kits</a>
      </div>
    `;
    page.append(empty);
    return;
  }

  if (bricks.length) {
    const section = createSection('Bricks', bricks, 'brick.html');
    page.append(section);
  }

  if (kits.length) {
    const section = createSection('Kits', kits, 'kit.html');
    page.append(section);
  }
}

function createSection(title, items, detailPage) {
  const section = document.createElement('section');
  section.className = 'searchSection';

  const h3 = document.createElement('h3');
  h3.className = 'searchSectionTitle';
  h3.textContent = title;
  section.append(h3);

  const grid = document.createElement('ul');
  grid.className = 'mainLinks';
  section.append(grid);

  for (const lego of items) {
    const li = document.createElement('li');
    li.className = 'lis';

    const card = document.createElement('div');
    card.className = 'legoDiv';

    const link = document.createElement('a');
    link.href = `${detailPage}?legoId=${lego.legoId}`;

    const img = document.createElement('img');
    img.src = lego.legoImage;
    img.alt = lego.legoName;
    link.append(img);

    const nameDiv = document.createElement('div');
    nameDiv.className = 'legoName';
    const nameLink = document.createElement('a');
    nameLink.className = 'legoNameLink';
    nameLink.href = `${detailPage}?legoId=${lego.legoId}`;
    nameLink.textContent = lego.legoName;
    nameDiv.append(nameLink);

    const priceDiv = document.createElement('div');
    priceDiv.className = 'legoPrice';
    priceDiv.textContent = lego.price < 1 ? `${lego.price}p`.slice(2) : `£${lego.price}`;

    const btn = document.createElement('button');
    btn.className = lego.stock < 1 ? 'addToCart outOfStock' : 'addToCart';
    btn.textContent = lego.stock < 1 ? 'Out of Stock' : 'Add to Cart';

    card.append(link, nameDiv, priceDiv, btn);
    li.append(card);
    grid.append(li);
  }

  return section;
}
