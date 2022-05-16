import * as bricks from './bricks.js';
const el = {};
function removeContent(what) {
  what.textContent = '';
}
export async function sendBrick() {
  const container = document.querySelector('.mainLinks');
  const uploadName = document.querySelector('#uploadName');
  const uploadPrice = document.querySelector('#uploadPrice');
  const avatar = document.querySelector('#avatarfile');

  const payload = new FormData();
  payload.append('legoName', uploadName.value);
  payload.append('price', uploadPrice.value);
  payload.append('legoImage', avatar.files[0]);

  const response = await fetch('/bricks', {
    method: 'POST',
    body: payload,
  });

  if (response.ok) {
    el.uploadName = '';
    el.uploadPrice = '';
    el.avatar = '';
    el.send = '';
    const lego = await response.json();
    removeContent(container);
    bricks.htmlGridLayout(lego, container);
  }
}

export function addEventListeners() {
  document.querySelector('#send').addEventListener('click', sendBrick);
}
