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

To publish the production build to the `gh-pages` branch:

```sh
npm run build
npm run deploy
```

GitHub Pages must serve from that branch. Push source changes separately with Git.

Program names, links, sizes, and initial positions live in `src/data/programs.js`. Experimental components (including the 3D CD) are not imported by the active app, so their libraries are excluded from its initial bundle.
