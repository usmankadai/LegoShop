let auth0Client = null;
let adminEmail = null;

async function fetchAuthConfig() {
  const response = await fetch('/auth-config');
  if (response.ok) return response.json();
  throw response;
}

async function initializeAuth0Client() {
  const config = await fetchAuthConfig();
  // eslint-disable-next-line no-undef
  auth0Client = await createAuth0Client({
    domain: config.domain,
    client_id: config.clientId,
    cacheLocation: 'localstorage',
    useRefreshTokens: true,
  });
  return config;
}

export function getAdminEmail() {
  return adminEmail;
}

async function updateAuthUI(config) {
  let isAuthenticated = false;
  try {
    isAuthenticated = await auth0Client.isAuthenticated();
  } catch (e) {
    console.warn('Auth check failed:', e);
  }

  document.getElementById('login').disabled = isAuthenticated;
  document.getElementById('logout').disabled = !isAuthenticated;

  if (isAuthenticated) {
    try {
      const user = await auth0Client.getUser();
      const isAdmin = config.adminEmails.includes(user.email);

      if (isAdmin) {
        adminEmail = user.email;
        showAdminUI();
      }

      document.getElementById('user').textContent = ` ${user.email[0].toUpperCase()}`;
    } catch (e) {
      console.warn('Failed to load user:', e);
    }
  }
}

function showAdminUI() {
  // show upload form
  const uploadForm = document.querySelector('.uploadBrick');
  if (uploadForm) uploadForm.classList.remove('emptyCart');

  // show all delete buttons
  document.querySelectorAll('.deleteBrick').forEach(btn => {
    btn.classList.remove('emptyCart');
  });
}

async function login() {
  await auth0Client.loginWithRedirect({ redirect_uri: window.location.origin });
}

function logout() {
  auth0Client.logout({ returnTo: window.location.origin });
}

async function handleAuth0Redirect(config) {
  const isAuthenticated = await auth0Client.isAuthenticated();
  if (isAuthenticated) return;

  const query = window.location.search;
  if (query.includes('state=')) {
    try {
      await auth0Client.handleRedirectCallback();
    } catch (e) {
      window.alert(e.message || 'authentication error, sorry');
      logout();
    }
    window.history.replaceState({}, document.title, window.location.pathname);
    await updateAuthUI(config);
  }
}

function setupListeners() {
  document.getElementById('login').addEventListener('click', login);
  document.getElementById('logout').addEventListener('click', logout);
}

export async function executeAuth0() {
  const config = await initializeAuth0Client();
  await updateAuthUI(config);
  await handleAuth0Redirect(config);
  setupListeners();
}
