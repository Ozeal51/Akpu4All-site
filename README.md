# Akpu4All

Food-ordering platform CReated by Hosea Agbo for swallows in Nigeria, with a React + Vite client, Express API server, MongoDB and an additional Next.js backend workspace.

## Workspace Overview

```
akpu-4all/
├── Client/      # Main customer-facing React app (Vite)
├── server/      # Express + MongoDB auth/API server
├── Backend/     # Next.js workspace (separate backend app)
├── vercel.json  # Vercel config targeting Client build output
└── README.md
```

## Main Frontend (`Client`)

### Stack
- React 19
- React Router 7
- Tailwind CSS
- Framer Motion
- Vite

### Key Features
- Meal and drink browsing with search and filtering
- Cart and checkout flow
- Authentication pages and profile page
- Floating WhatsApp CTA
- Production chunk splitting via `Client/vite.config.js`
- Theme toggle (milky ↔ dark-green) with persistence

## Theme Toggle (Milky / Dark Green)

Implemented with `ThemeContext` + CSS variables:

- Toggle location: top-right area in `Navbar`
- Modes:
  - `milky` (light cream / soft white)
  - `dark-green`
- Smooth animated transitions for background and UI surfaces
- Readability/contrast overrides for text, borders, cards, and form controls
- Preference stored in local storage key: `akpu-theme`
- Restored automatically on reload

Core files:
- `Client/src/context/ThemeContext.jsx`
- `Client/src/context/theme.js`
- `Client/src/components/Navbar.jsx`
- `Client/src/index.css`

## API Server (`server`)

### Stack
- Node.js
- Express
- MongoDB / Mongoose
- JWT + bcryptjs

### Main folders
- `server/controllers`
- `server/models`
- `server/routes`
- `server/middleware`
- `server/config`

## Additional Backend Workspace (`Backend`)

- Next.js project scaffold with Tailwind
- Separate from `server` and `Client` runtime flow

## Local Development

### Prerequisites
- Node.js 18+
- npm 9+
- MongoDB (for `server`)

### 1) One-step dev (recommended)

```bash
cd akpu-4all
npm install
npm run dev
```

This starts both `server` and `Client` together from the project root.

### 2) Run Client only

```bash
cd Client
npm install
npm run dev
```

In development, the client calls the API directly at `http://localhost:5000/api`. Start the server first if you want live data instead of the local fallback catalog.

### 3) Run Express API Server only

```bash
cd server
npm install
npm run dev
```

## Build and Verify

### Client Production Build

```bash
cd Client
npm run build
```

### API Server Start

```bash
cd server
npm start
```

## Deployment

Root `vercel.json` is configured for the `Client` app:

- Install: `cd Client && npm ci`
- Build: `cd Client && npm run build`
- Output: `Client/dist`

## Notes on Styling

- UI relies primarily on Tailwind classes in components
- Global theme behavior and transitions live in `Client/src/index.css`
- `data-theme` and `data-bs-theme` attributes are set on `<html>` by `ThemeProvider`

## Useful Scripts

### Client (`Client/package.json`)
- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`

### Server (`server/package.json`)
- `npm run dev`
- `npm start`

### Backend (`Backend/package.json`)
- `npm run dev`
- `npm run build`
- `npm run start`
