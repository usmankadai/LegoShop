// Refrenced auth0 from auth0 lecture
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

export async function initializeAuth0Client() {
  const config = await fetchAuthConfig();
  auth0 = await createAuth0Client({
    domain: config.domain,
    client_id: config.clientId,
  });
}

// update the state of all authentication-related elements
export async function updateAuthUI() {
  const isAuthenticated = await auth0.isAuthenticated();

  document.getElementById('login').disabled = isAuthenticated;
  document.getElementById('logout').disabled = !isAuthenticated;

  if (isAuthenticated) {
    const user = await auth0.getUser();
    console.log(user);
    const el = document.getElementById('user');
    el.textContent = `Hello ${user.given_name}`;
  }
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
export async function handleAuth0Redirect() {
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

export function setupListeners() {
  document.getElementById('login').addEventListener('click', login);
  document.getElementById('logout').addEventListener('click', logout);
}

export async function executeAuth0() {
  await initializeAuth0Client();
  await updateAuthUI();
  await handleAuth0Redirect();
  setupListeners();
}
