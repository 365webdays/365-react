# Technical Document (365-react / 365webdays.com)

This document is the single source of truth for the codebase structure, build pipeline, and production deployment workflow for the 365webdays site.

## 1) Stack / framework

- **UI**: React (`react`, `react-dom`)
- **Build tool / dev server**: Vite
- **Styling**: TailwindCSS + PostCSS (`tailwindcss`, `autoprefixer`) plus component-scoped CSS files
- **Linting**: ESLint flat config (`eslint.config.js`)

This project is a **single-page React app** (no router). The entire site renders from `App.jsx`.

## 2) Repository layout (authoritative)

Top-level:
- `index.html`
  - HTML shell + SEO meta tags + Google Analytics tag
  - Loads the React app via `<script type="module" src="/src/main.jsx"></script>`
- `package.json`
  - Scripts: `dev`, `build`, `preview`, `deploy`
- `vite.config.js`
  - Vite config using `@vitejs/plugin-react`
- `tailwind.config.js`
  - Tailwind `content` scan paths for Vite/React
- `postcss.config.js`
  - Tailwind + Autoprefixer
- `deploy.sh`
  - Build + SFTP upload to production
- `test-upload.sh`
  - Notes about correct server folder structure
- `verify-deployment.sh`
  - SFTP verification script (see note in Deploy section)

Main app code:
- `src/main.jsx`
  - React entrypoint (`createRoot(...).render(<App />)`)
- `src/App.jsx`
  - Main page structure and layout
  - Renders the portfolio slider via `PortfolioList`
- `src/index.css`
  - Tailwind directives + global resets

Components:
- `src/components/PortfolioList.jsx`
  - The portfolio slider / project list UI
- `src/components/PortfolioList.css`
  - Styling for the portfolio slider (including mobile behavior)
- `src/components/Footer.css`
  - Styling for the footer (footer is defined in `App.jsx`)

Assets:
- `public/`
  - Static icons/manifest copied to the build output root (favicons, apple-touch icons, `manifest.json`, etc.)
- `src/assets/`
  - Bundled assets imported by React components (logo + portfolio images)

Build output:
- `dist/` (generated)
  - Production build output. Contains `index.html` and hashed assets under `dist/assets/`.
  - **Do not edit manually.**

## 3) Runtime flow (how the app boots)

1. Browser loads `index.html` (repo root)
2. Vite/production bundle loads `/src/main.jsx`
3. `src/main.jsx` mounts React into `#root`
4. `src/App.jsx` renders:
   - Header logo
   - Hero copy
   - `PortfolioList` slider
   - Footer with email link

## 4) Key UI modules

### 4.1 Portfolio slider

- **File**: `src/components/PortfolioList.jsx`
- **Styles**: `src/components/PortfolioList.css`
- **Data**: `projects` array is embedded directly in the component file.
- **Images**: Imported from `src/assets/portfolio/*.webp`

Behavior overview:
- Desktop:
  - Horizontal scroll list with left/right arrow buttons.
  - Clicking an item expands it and reveals description/highlights/link.
  - Component attempts to auto-scroll to keep the expanded item in view.
- Mobile:
  - Uses scroll snapping.
  - Project details are forced visible via CSS class `mobile-always-open`.

If you update portfolio items:
- Edit the `projects` array in `PortfolioList.jsx`.
- Ensure the image import exists under `src/assets/portfolio/`.

### 4.2 Footer

- Footer markup lives in `src/App.jsx`.
- Footer styling lives in `src/components/Footer.css`.

## 5) Local development

### 5.1 Prerequisites

- Node.js + npm installed

### 5.2 Commands

- Dev server (HMR):
  - `npm run dev`
- Production build:
  - `npm run build`
- Preview production build locally:
  - `npm run preview`

## 6) Production deployment (authoritative)

### 6.1 Production host

- **Site**: https://365webdays.com
- **Host**: `72.167.58.121`
- **Username**: `kf3a3nkmn59k`

### 6.2 Correct server docroot

From cPanel terminal, the writable docroot is:
- **`/home/kf3a3nkmn59k/public_html`** (aka `~/public_html`)

Important:
- `/public_html` does **not** exist on this server.
- Deployments must target the home-based path.

### 6.3 Correct folder structure on server

Correct (what we want):
- `~/public_html/index.html`
- `~/public_html/assets/...`
- `~/public_html/favicon.ico` and other icons from `public/`

Incorrect (do not create):
- `~/public_html/dist/index.html`

A nested `public_html/dist` happens when you upload the `dist` directory itself rather than the **contents** of `dist`.

### 6.4 Production deployment

- Command:
  - `npm run deploy`

What it does (`deploy.sh`):
1. Runs `npm run build`
2. Uses `sftp` to connect and `cd /home/kf3a3nkmn59k/public_html`
3. Uploads **contents** of the build directory via:
   - `put -r dist/* ./`

This is the supported deployment method and enforces the correct folder structure.

### 6.5 Verification

From cPanel terminal, after deploying a new build, verify:

- `ls -la ~/public_html/index.html`
- `ls -la ~/public_html/assets | head`

If you know the newest hashed bundle name (from your local build output), check it exists on the server:

- `ls -la ~/public_html/assets/index-<HASH>.js`

### 6.6 Structure verification

Check for incorrect folder structures:

- Check for nested dist folder (should NOT exist):
  - `ls -la ~/public_html | grep dist`
- Check for stray assets in home directory (should NOT exist):
  - `ls -la ~/ | grep assets`

Note about `verify-deployment.sh`:
- The script currently `cd public_html` (relative) rather than `cd /home/kf3a3nkmn59k/public_html`.
- If your SFTP login starts in your home directory, `cd public_html` will work; otherwise adjust the script.

## 7) Troubleshooting

### 7.1 Deploy ran but site didn’t change

- Check timestamps on:
  - `~/public_html/index.html`
- Confirm the new hashed JS/CSS actually exists in:
  - `~/public_html/assets/`

### 7.2 Site is broken (404 on assets)

This usually means `index.html` references a hashed file that wasn’t uploaded.

Fix:
- Re-upload `dist/index.html` and the referenced `dist/assets/index-*.js` / `dist/assets/index-*.css` from the same build.

### 7.3 Accidental nested deploy created `public_html/dist`

Fix:
- Remove the nested folder:
  - `rm -rf ~/public_html/dist`
- Re-deploy correctly by uploading **dist contents** to `public_html`.

### 7.4 Stray assets in home directory

If an incorrect deployment created `~/assets` in your home directory:

Fix:
- Remove the stray folder:
  - `rm -rf ~/assets`
- Verify the correct assets exist in `~/public_html/assets/`

## 8) Security notes

- `.vscode/sftp.json` contains a plaintext password.
- This repo is configured to ignore `.vscode/sftp.json` via `.gitignore` and provides `.vscode/sftp.example.json` as a safe template.
- If the password has ever been committed or shared, rotate it in cPanel.
