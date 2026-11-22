# Robin 95

Robin Rudén’s personal portfolio, styled as a Windows 95 desktop. Built with React and Vite.

## Local development

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. Desktop icons can be opened with a click or with Enter/Space. Drag icons to rearrange them on a desktop screen. On small screens icons use a grid. Drag a window by its title bar using a mouse or touch; focus the title bar and use arrow keys to move it with a keyboard.

Opening an already open program brings its window to the front. Project icons open external websites in new tabs. Contact and Resume include PDF download links.

## Checks and publishing

```sh
npm run lint
npm run build
npm run preview
```

Publishing is automatic: every push to `main` runs `.github/workflows/deploy.yml` with Node.js 24. The workflow installs the locked dependencies with `npm ci`, runs lint, builds the site, and publishes `dist` to GitHub Pages only if all checks succeed.

One-time repository setup:

1. Open **Settings → Pages → Build and deployment** and set **Source** to **GitHub Actions**.
2. Check that **Custom domain** is set to `www.robinruden.com`. With an Actions deployment, the custom domain is managed in Pages settings rather than through the root `CNAME` file.
3. Commit and push the workflow to `main`.

Follow each deployment in the repository's **Actions** tab. You can also select **Deploy to GitHub Pages → Run workflow** on `main` to publish manually. No personal access token or additional repository secrets are required.

Program names, links, sizes, and initial positions live in `src/data/programs.js`. Experimental components (including the 3D CD) are not imported by the active app, so their libraries are excluded from its initial bundle.

Use `position: { x, y }` for a window's normal starting position and `mobilePosition: { x, y }` to override it on screens up to 600px wide or 520px high. Coordinates are pixels from the top-left corner; the window is kept within the available screen area. `desktopPosition` controls the icon's position, not the opened window. Close and reopen a window to see changes to its starting position.
