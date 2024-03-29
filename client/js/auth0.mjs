// Refrenced auth0 from auth0 lecture with a few additions in updateAuthUI()
async function fetchAuthConfig() {
  const response = await fetch('../auth-config');
  if (response.ok) {
    return response.json();
  } else {
    throw response;
  }
}

// global variable entry point to the auth library
let auth0 = null;

async function initializeAuth0Client() {
  const config = await fetchAuthConfig();
  // eslint-disable-next-line no-undef
  auth0 = await createAuth0Client({
    domain: config.domain,
    client_id: config.clientId,
  });
}

// update the state of all authentication-related elements
async function updateAuthUI() {
  const isAuthenticated = await auth0.isAuthenticated();

  document.getElementById('login').disabled = isAuthenticated;
  document.getElementById('logout').disabled = !isAuthenticated;

  if (isAuthenticated) {
    // //////////////

    // Area where a few changes were made in auth0
    if (window.location.href === 'http://localhost:8080/bricks.html') {
      const uploadBrick = document.querySelector('.uploadBrick');
      uploadBrick.className = 'userIsAuthenticated';
      const deleteBrick = document.querySelectorAll('.deleteBrick');
      deleteBrick.className = 'deleteBrick';
    }

    const user = await auth0.getUser();
    console.log(user);


    const el = document.getElementById('user');
    el.textContent = ` ${user.email.slice(0, 1).toUpperCase()}`;
  }
  // //////////////////////////////////////////////////////////////////////////
}

async function login() {
  await auth0.loginWithRedirect({
    redirect_uri: window.location.origin,
  });
}

function logout() {
  auth0.logout({
    returnTo: window.location.origin,
  });
}

// check for the code and state parameters from Auth0 login redirect
async function handleAuth0Redirect() {
  const isAuthenticated = await auth0.isAuthenticated();

  if (isAuthenticated) return;

  const query = window.location.search;
  if (query.includes('state=')) {
    try {
      // process the login state
      await auth0.handleRedirectCallback();
    } catch (e) {
      window.alert(e.message || 'authentication error, sorry');
      logout();
    }

    // remove the query parameters
    window.history.replaceState({}, document.title, '/');

    await updateAuthUI();
  }
}

function setupListeners() {
  document.getElementById('login').addEventListener('click', login);
  document.getElementById('logout').addEventListener('click', logout);
}

export async function executeAuth0() {
  await initializeAuth0Client();
  await updateAuthUI();
  await handleAuth0Redirect();
  setupListeners();
}
