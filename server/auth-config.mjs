export default {
  domain: process.env.AUTH0_DOMAIN || 'dev-cnvxiunf.eu.auth0.com',
  clientId: process.env.AUTH0_CLIENT_ID || 'O35fKLylDkDpwoLUSZZBdObPmj6uTHJr',
  adminEmails: (process.env.ADMIN_EMAILS || 'usmankadai@gmail.com').split(','),
};
