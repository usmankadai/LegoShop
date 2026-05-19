# LEGO SHOP

## Overview

A full-stack LEGO e-commerce web application built with Node.js/Express, SQLite (Turso), Auth0 authentication, and Cloudinary image hosting. Deployed on Vercel.

**Live site:** https://lego-shop.usmankadai.dev

---

## Tech Stack

| Layer | Technology |
|---|---|
| Server | Node.js + Express (ES Modules) |
| Database | Turso (hosted LibSQL/SQLite) |
| Image hosting | Cloudinary CDN |
| Authentication | Auth0 SPA SDK |
| File uploads | Multer (memory storage) |
| Deployment | Vercel (serverless) |

---

## Local Development

### Prerequisites

- Node.js 18+
- A `.env` file (copy from `.env.example` and fill in your values)

### Setup

```bash
npm install
npm start
```

Server runs on `http://localhost:8080`. Locally it uses `database.sqlite` directly — no Turso credentials needed.

### Environment Variables

Copy `.env.example` to `.env` and fill in:

```
AUTH0_DOMAIN=your-tenant.eu.auth0.com
AUTH0_CLIENT_ID=your-client-id
ADMIN_EMAILS=you@example.com

TURSO_DATABASE_URL=libsql://your-db.turso.io
TURSO_AUTH_TOKEN=your-token

CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

---

## Deployment (Vercel)

1. Install Vercel CLI: `npm i -g vercel`
2. Add all environment variables in the Vercel dashboard under **Settings → Environment Variables**
3. Deploy: `vercel --prod`

### Turso Database Setup (first time)

```bash
brew install tursodatabase/tap/turso
turso auth login
turso db create legoshop
turso db shell legoshop "$(cat scripts/seed.sql)"
```

---

## Key Features

- **Bricks catalogue** — filter by colour, type, and size
- **Kits catalogue** — browse full LEGO kits
- **Individual product pages** — unique URL per brick/kit
- **Site-wide search** — searches across both bricks and kits by name; results page at `/search.html?q=`
- **Shopping cart** — add/remove/adjust items; persisted in localStorage for guests, synced to the database when logged in (cross-device)
- **Wishlist** — save items for later; persisted in localStorage for guests, synced to the database when logged in (cross-device)
- **Simulated checkout** — payment form updates stock levels in the database
- **Admin panel** — upload, delete, and inline-edit name/price of bricks and kits (admin only, gated by Auth0 login)
- **Out-of-stock protection** — out of stock items cannot be added to cart via UI or devtools
- **Homepage** — featured picks and coming soon section with random video adverts
- **404 page** — invalid URLs redirect to a custom error page
- **Responsive design** — works across desktop, tablet, and mobile

---

## Admin System

Admins are determined by email address, configured in the server via the `ADMIN_EMAILS` environment variable (or `server/auth-config.mjs` fallback). When logged in as an admin:

- Upload form is shown on the bricks and kits pages
- Delete button appears on each product card
- Inline edit button appears on each card — click to edit name and price in place without leaving the page
- All write operations are protected server-side via the `x-admin-email` header check

---

## API

| Method | Route | Description |
|---|---|---|
| GET | `/bricks` | List all bricks |
| POST | `/bricks` | Upload a new brick (admin only) |
| GET | `/bricks/:sort` | List bricks filtered by sort category |
| PUT | `/bricks/:legoId` | Edit brick name/price (admin only) |
| GET | `/brick?legoId=` | Get a single brick |
| PUT | `/brick/:basket` | Update stock levels after purchase |
| GET | `/kits` | List all kits |
| POST | `/kits` | Upload a new kit (admin only) |
| GET | `/kit?legoId=` | Get a single kit |
| PUT | `/kits/:legoId` | Edit kit name/price (admin only) |
| DELETE | `/bricks/:legoId` | Delete a brick (admin only) |
| DELETE | `/kits/:legoId` | Delete a kit (admin only) |
| GET | `/search?q=` | Search bricks and kits by name |
| GET | `/user/cart` | Get logged-in user's cart |
| PUT | `/user/cart` | Save logged-in user's cart |
| GET | `/user/wishlist` | Get logged-in user's wishlist |
| PUT | `/user/wishlist` | Save logged-in user's wishlist |
| GET | `/videos` | List videos (used for homepage coming soon section) |
| GET | `/auth-config` | Serve Auth0 + admin config to the client |

---

## Architecture

```
Browser
  └─ Vercel (Express server)
       ├─ Static files (HTML, CSS, JS)
       ├─ Turso (hosted SQLite) — product data
       └─ Cloudinary CDN — product images
```

- All existing product images are hosted on Cloudinary
- New uploads (via admin form) go directly to Cloudinary; the URL is stored in Turso
- Auth state persists across pages using Auth0 localStorage cache

---

## Known Issues

- Kit stock levels are not decremented on checkout (only brick stock is updated)
- Quantity input in cart requires repeated clicks — no direct number input
- Auth0 always redirects back to homepage after login rather than the page the user was on

## Future Improvements

- Redirect to the originating page after Auth0 login
- Link kits to their component bricks
- Orders page showing purchase history
- Moving items directly from wishlist to cart
- Loyalty program and pre-order for out-of-stock items
- Allow customers to design a custom kit

---

## Reference List

- *LEGO Catalog Database Download*. Rebrickable. https://rebrickable.com/downloads/
- *RegEx for matching UK Postcodes*. (2013). Stackoverflow. https://stackoverflow.com/questions/164979/regex-for-matching-uk-postcodes
- *ws_api*. (2019). Github. https://github.com/portsoc/ws_api
- *SQLite vs PostgreSQL: 8 Critical Differences*. (2021). HEVO. https://hevodata.com/learn/sqlite-vs-postgresql/
- *simple-staged-message-board*. (2022). Github. https://github.com/portsoc/staged-simple-message-board
- *Jest Testing: A Helpful, Introductory Tutorial*. (2022). testIM. https://www.testim.io/blog/jest-testing-a-helpful-introductory-tutorial/
