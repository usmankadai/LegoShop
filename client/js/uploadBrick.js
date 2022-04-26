const el = {};
function removeContent(what) {
  what.textContent = '';
}
export async function sendBrick() {
  const payload = new FormData();
  payload.append('legoName', el.uploadName);
  payload.append('legoName', el.uploadPrice);
  payload.append('legoName', el.avatar.files[0]);
  payload.append('legoName', el.uploadName);


  const response = await fetch('/bricks', {
    method: 'POST',
    body: payload,
  });

  if (response.ok) {
    el.uploadName = '';
    el.uploadPrice = '';
    el.avatar = '';
    el.send = '';
    const updated = await response.json();
    removeContent(el.container);
    // showBricks(updated, el.container);
  }
}


function prepareHandles() {
  el.container = document.querySelector('.mainLinks');
  el.uploadName = document.querySelector('#uploadName');
  el.uploadPrice = document.querySelector('#uploadPrice');
  el.avatar = document.querySelector('#avatar');
  el.send = document.querySelector('#send');
}

/* add a message if enter pressed */
function checkKeys(e) {
  if (e.key === 'Enter') {
    sendBrick();
  }
}

/**
 * Connect listeners for button clicks,
 * keyboard input, etc.
 */
function addEventListeners() {
  el.send.addEventListener('click', sendBrick);
  el.message.addEventListener('keyup', checkKeys);
}

function pageLoaded() {
  prepareHandles();
  addEventListeners();
}
