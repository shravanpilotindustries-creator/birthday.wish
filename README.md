# Birthday Wish Website 🎂

A full-screen, responsive birthday surprise website based on the supplied sample.

## Files

- `index.html` — page structure and content
- `styles.css` — responsive design, animations, glassmorphism UI
- `script.js` — personalization, gift interaction, confetti, floating hearts, optional music
- `README.md` — setup/customization guide

## Run locally

No build tool is required.

1. Extract the project.
2. Open `index.html` in a browser.

For the best local development experience, use VS Code + Live Server.

## Personalize

Open `script.js` and change:

```js
const config = {
  name: "Raj Sahu",
  shortName: "Raj",
  music: ""
};
```

To enable music, put an MP3 inside an `assets` folder and set:

```js
music: "assets/birthday-song.mp3"
```

Do not commit copyrighted music unless you have permission to use it.

## Deploy

This is a static website, so it can be deployed directly to GitHub Pages, Netlify, Vercel, Cloudflare Pages, or any normal web server.

No backend is required for the current version.

## Included interactions

- Gift opening screen
- Birthday reveal
- Confetti animation
- Floating hearts/roses/balloons
- Optional background music
- Responsive mobile layout
- Smooth navigation
- Replay button
- Reduced-motion accessibility support

The supplied sample used a gift screen, birthday heading, personal name, birthday message, and floating hearts/roses; this version keeps that core idea while expanding it into a complete multi-section experience.
