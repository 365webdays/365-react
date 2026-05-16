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
- `.github/workflows/deploy.yml`
  - **Primary deploy path.** GitHub Actions workflow that auto-builds and SFTPs to production on every push to `main`.
- `deploy.sh`
  - Manual fallback. Builds and SFTPs to production from a local bash shell. Used only if Actions is unavailable.

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

### 6.4 Primary deploy: GitHub Actions (auto on push)

Workflow: `.github/workflows/deploy.yml`.

Triggers:
- Every push to `main`.
- Manual `workflow_dispatch` from the Actions tab (used for rollback).

What it does:
1. `actions/checkout`
2. `actions/setup-node@v4` (Node 20, npm cache)
3. `npm ci`
4. `npm run build`
5. SFTP `./dist/*` → `${SFTP_REMOTE_DIR}` via `wlixcc/SFTP-Deploy-Action` using SSH key auth

Day-to-day usage:
```
git add -A
git commit -m "..."
git push origin main
```
→ production updated in ~1–2 minutes. Watch progress at `https://github.com/365webdays/365-react/actions`.

Required GitHub repo secrets (Settings → Secrets and variables → Actions):
| Name | Value |
|---|---|
| `SFTP_HOST` | `72.167.58.121` |
| `SFTP_USERNAME` | `kf3a3nkmn59k` |
| `SFTP_REMOTE_DIR` | `/home/kf3a3nkmn59k/public_html` |
| `SFTP_PRIVATE_KEY` | full private key contents (ed25519, no passphrase) |

SSH key setup (one-time, already done):
1. Generate keypair locally: `ssh-keygen -t ed25519 -C "github-actions-365webdays" -f ~/.ssh/365webdays_deploy -N ""`
2. cPanel → SSH Access → Manage SSH Keys → Import Key → paste public key → **Authorize**.
3. Paste the private key into the `SFTP_PRIVATE_KEY` GitHub secret.

### 6.5 Manual fallback: `npm run deploy`

Use only if GitHub Actions is unavailable.

Command (Windows PowerShell):
```
& 'C:\Program Files\Git\bin\bash.exe' deploy.sh
```
Or from Git Bash / Linux / macOS: `./deploy.sh`.

What `deploy.sh` does:
1. `npm run build`
2. `sftp` connect → `cd /home/kf3a3nkmn59k/public_html`
3. `put -r dist/* ./` (uploads **contents**, not the `dist/` folder)

It prompts for the cPanel password interactively.

### 6.6 Verification

From cPanel terminal (or `ssh -i ~/.ssh/365webdays_deploy kf3a3nkmn59k@72.167.58.121`) after a deploy:

```
ls -la ~/public_html/index.html
ls -la ~/public_html/assets | head
ls -la ~/public_html | grep dist   # should be empty (no nested dist/)
ls -la ~/ | grep assets            # should be empty (no stray assets in $HOME)
```

If you know the newest hashed bundle name from the build output, confirm it exists:
```
ls -la ~/public_html/assets/index-<HASH>.js
```

### 6.7 Rollback

Fastest path:
- GitHub → **Actions** tab → open a previous successful run → **Re-run all jobs**. Re-deploys that exact commit's build.

Git-level rollback:
```
git revert <bad-sha>
git push origin main
```
Auto-deploys the reverted state via the workflow.

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

- Production deploys use **SSH key authentication** (ed25519), not passwords. The private key lives only in:
  - Your local `~/.ssh/365webdays_deploy` (not in the repo)
  - The `SFTP_PRIVATE_KEY` GitHub repo secret (encrypted at rest, only readable by the workflow)
- The cPanel account password is never stored in this repo, the workflow, or your local working tree.
- `.vscode/sftp.json` is gitignored; a template lives at `.vscode/sftp.example.json` if you ever need a VSCode SFTP setup. Do not commit credentials.
- If the deploy SSH key is compromised: revoke it in cPanel → SSH Access → Manage SSH Keys, generate a new one, and update the `SFTP_PRIVATE_KEY` GitHub secret.
