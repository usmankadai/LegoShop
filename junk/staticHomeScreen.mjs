// static home page

// export function templateHeader() {

//     const selectH1 = document.querySelector('header');

//     const log = document.createElement('a');
//     log.id = 'logo';
//     log.className = 'Lego'
//     log.href = '#';
//     log.textContent = 'LEGO';

//     const menu = document.createElement('div');
//     menu.id = 'menu';
//     menu.className = 'fas fa-bars';

//     const navBar = document.createElement('nav');
//     navBar.className = 'navBar';
//     selectH1.append(menu, log, navBar);

//     let nav = 0;
//     const selectNav = document.querySelector('.navBar');
//         for (let i = 1; i <= 4; i += 1) {
//         const log = document.createElement('a');
//         nav++;
//         log.id = `navButton${nav}`;
//         selectNav.append(log);
//     }

//     const selectNav1 = document.querySelector('#navButton1, #navButton2, #navButton3, #navButton4');
//     navButton1.id = 'home';
//     home.href = '#home';
//     home.textContent = 'Home';

//     navButton2.id = 'bricks';
//     bricks.href = '#Bricks';
//     bricks.textContent = 'Bricks';

//     navButton3.id = 'kits';
//     kits.href = '#Kits';
//     kits.textContent = 'Kits';

//     navButton4.id = 'review';
//     review.href = '#Review';
//     review.textContent = 'Review';

//     const iconsDiv = document.createElement('div');
//     iconsDiv.className = 'icons';
//     selectH1.append(iconsDiv);

//     const selectIcon = document.querySelector('.icons');
//     const searchInput = document.createElement('input');
//     searchInput.placeholder = 'Search items...';
//     selectIcon.append(searchInput);

//     for (let i = 1; i <= 4; i += 1) {
//     const log = document.createElement('a');
//     nav++;
//     log.id = `icon${nav}`;
//     selectIcon.append(log);
//     }

//     const sle = document.querySelector('#icon5, #icon6, #icon7, #icon8');

//     icon5.id = 'search';
//     search.href = '#search';
//     search.className = 'fas fa-search';

//     icon6.id = 'favorite';
//     favorite.href = '#favorite';
//     favorite.className = 'fas fa-heart';

//     icon7.id = 'cart';
//     cart.href = '#cart';
//     cart.className = 'fas fa-shopping-cart';

//     icon8.id = 'user';
//     user.href = '#user';
//     user.className = 'fas fa-user';
// }

// export function templateFooter() {
//     const selectFooter = document.querySelector('footer');
//     const createDiv = document.createElement('div');
//     createDiv.className = 'footerLinks';
//     selectFooter.append(createDiv);

//     const footerLinks = document.querySelector('.footerLinks');
//     const createFirstLink = document.createElement('h3');
//     createFirstLink.textContent = 'About us';
//     footerLinks.append(createFirstLink);
// }


// async function fetchAuthConfig() {
//     const response = await fetch('/auth-config');
//     if (response.ok) {
//       return response.json();
//     } else {
//       throw response;
//     }
//   }

//   // global variable that is our entry point to the auth library
//   let auth0 = null;

//   async function initializeAuth0Client() {
//     const config = await fetchAuthConfig();

//     auth0 = await createAuth0Client({
//       domain: config.domain,
//       client_id: config.clientId,
//     });
//   }

//   // update the state of all authentication-related elements
//   async function updateAuthUI() {
//     const isAuthenticated = await auth0.isAuthenticated();

//     document.getElementById('Login').disabled = isAuthenticated;
//     document.getElementById('Logout').disabled = !isAuthenticated;

//     if (isAuthenticated) {
//       const user = await auth0.getUser();
//       console.log(user);
//       const el = document.getElementById('greeting');
//       el.textContent = `Hello ${user.name} (${user.email})!`;
//     }
//   }

//   async function login() {
//     await auth0.loginWithRedirect({
//       redirect_uri: window.location.origin,
//     });
//   }

//   function logout() {
//     auth0.logout({
//       returnTo: window.location.origin,
//     });
//   }

//   // check for the code and state parameters from Auth0 login redirect
//   async function handleAuth0Redirect() {
//     const isAuthenticated = await auth0.isAuthenticated();

//     if (isAuthenticated) return;

//     const query = window.location.search;
//     if (query.includes('state=')) {
//       try {
//         // process the login state
//         await auth0.handleRedirectCallback();
//       } catch (e) {
//         window.alert(e.message || 'authentication error, sorry');
//         logout();
//       }

//       // remove the query parameters
//       window.history.replaceState({}, document.title, '/');

//       await updateAuthUI();
//     }
//   }

//   // make sure all interactive elements in the page have code attached to them
//   function setupListeners() {
//     document.getElementById('Login').addEventListener('click', login);
//     document.getElementById('Logout').addEventListener('click', logout);
//   }

//   // this will run when the page loads
//   async function init() {
//     await initializeAuth0Client();
//     await setupListeners();
//     await updateAuthUI();
//     await handleAuth0Redirect();
//   }

//   window.addEventListener('load', init);
