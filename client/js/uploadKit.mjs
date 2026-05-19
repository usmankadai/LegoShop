import * as kits from './kits.js';
import * as auth0 from './auth0.mjs';

function removeContent(what) {
  what.textContent = '';
}

export async function sendKit() {
  const container = document.querySelector('.mainLinks');
  const uploadName = document.querySelector('#uploadName');
  const uploadPrice = document.querySelector('#uploadPrice');
  const avatar = document.querySelector('#avatarfile');

  if (!uploadName.value.trim()) return alert('Please enter a kit name.');
  if (!uploadPrice.value.trim() || isNaN(uploadPrice.value) || Number(uploadPrice.value) <= 0) return alert('Please enter a valid price.');
  if (!avatar.files[0]) return alert('Please select an image.');

  const payload = new FormData();
  payload.append('legoName', uploadName.value.trim());
  payload.append('price', uploadPrice.value.trim());
  payload.append('legoImage', avatar.files[0]);

  const response = await fetch('/kits', {
    method: 'POST',
    headers: { 'x-admin-email': auth0.getAdminEmail() },
    body: payload,
  });

  if (response.ok) {
    uploadName.value = '';
    uploadPrice.value = '';
    avatar.value = '';
    const kitList = await response.json();
    removeContent(container);
    kitList.forEach(kit => kits.htmlGridLayout(kit));
  }
}

export function addEventListeners() {
  document.querySelector('#send').addEventListener('click', sendKit);
}
