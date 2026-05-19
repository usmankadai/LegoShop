import * as bricks from './bricks.js';
import * as auth0 from './auth0.mjs';
const el = {};
function removeContent(what) {
  what.textContent = '';
}
export async function sendBrick() {
  const container = document.querySelector('.mainLinks');
  const uploadName = document.querySelector('#uploadName');
  const uploadPrice = document.querySelector('#uploadPrice');
  const avatar = document.querySelector('#avatarfile');

  if (!uploadName.value.trim()) return alert('Please enter a brick name.');
  if (!uploadPrice.value.trim() || isNaN(uploadPrice.value) || Number(uploadPrice.value) <= 0) return alert('Please enter a valid price.');
  if (!avatar.files[0]) return alert('Please select an image.');

  const payload = new FormData();
  payload.append('legoName', uploadName.value.trim());
  payload.append('price', uploadPrice.value.trim());
  payload.append('legoImage', avatar.files[0]);

  const response = await fetch('/bricks', {
    method: 'POST',
    headers: { 'x-admin-email': auth0.getAdminEmail() },
    body: payload,
  });

  if (response.ok) {
    uploadName.value = '';
    uploadPrice.value = '';
    avatar.value = '';
    const lego = await response.json();
    removeContent(container);
    bricks.htmlGridLayout(lego, container);
  }
}

export function addEventListeners() {
  document.querySelector('#send').addEventListener('click', sendBrick);
}
