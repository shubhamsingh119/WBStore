# WBStore

A multi-page e-commerce product listing and shopping app built with Next.js (App Router), Tailwind CSS, and Zustand — built as a frontend internship assignment.

**Live demo:** _add your Vercel deployment URL here after deploying_

## Features

- **Home page** — header with logo, search bar, and cart icon; sidebar with a single-select category filter, a price range slider, and a single-select brand filter (radio buttons, matching the provided design reference); responsive product grid (3 columns desktop, 2 tablet, 1 mobile); footer with copyright and social links.
- **Product detail page** (`/product/[id]`) — image carousel, title, price, description, category, quantity selector, and an "Add to Cart" button.
- **Cart page** (`/cart`) — line items with quantity controls and removal, an order summary, and a "Clear cart" action.
- **Filtering** — category, brand, and price filters combine with search (case-insensitive substring match on the product title), all reflected in the URL as query params, e.g. `/?category=electronics&brand=Nova&price=0-500&search=shirt`. Filters are shareable/bookmarkable and restore correctly on reload.
- **State management** — [Zustand](https://github.com/pmndrs/zustand) with its `persist` middleware keeps the cart in `localStorage`, so it survives refreshes and navigation.
- **Empty/loading states** — skeleton loaders while fetching, and a friendly empty state when a filter combination returns no products or the cart is empty.

## Tech stack

- [Next.js](https://nextjs.org) (App Router)
- [Tailwind CSS](https://tailwindcss.com)
- [Zustand](https://github.com/pmndrs/zustand) for cart/global state
- [lucide-react](https://lucide.dev) for icons
- [FakeStoreAPI](https://fakestoreapi.com) for product data

## Design reference

The UI (colors, header/sidebar/footer layout, button and filter styling) matches the design reference provided with the assignment. The reference used radio-style single-select filters, which is also what the URL contract (`?category=electronics`, singular) implies, so that took precedence over the brief's "checkboxes" wording.

## Notes on data

FakeStoreAPI doesn't provide a `brand` field, so each product is assigned a deterministic mock brand (based on its id) purely so the brand filter in the sidebar has real data to work with. Likewise, the price slider drives the upper bound of a `$0 – max` range rather than a dual-handle range, which keeps the UI simple while still satisfying the `?price=min-max` URL contract.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project structure

```
src/
  app/
    page.js                Home page (product listing)
    product/[id]/page.js   Product detail page
    cart/page.js           Cart page
    layout.js              Root layout (header + footer)
  components/               Reusable UI components
  lib/                       API client + filter helpers
  store/                     Zustand cart store
```

## Deployment

Deployed on [Vercel](https://vercel.com). To deploy your own copy:

1. Push this repository to GitHub.
2. Import it into Vercel ([vercel.com/new](https://vercel.com/new)).
3. Vercel auto-detects Next.js — no extra configuration needed.
4. Add the deployment URL to the top of this README.
