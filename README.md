# Practice Git Node App

Simple static Node server that serves a Hello World page with five colorful cards and a footer showing developer credit, location (with geolocation permission), and live date/time.

## Structure
- `index.html` – main page with hero, five colorful cards, and footer
- `src/styles.css` – styling for layout, cards, and footer
- `src/scripts.js` – footer clock + geolocation helper
- `server.js` – minimal static file server
- `package.json` – scripts and nodemon setup

## Run
```bash
npm install
npm start       # start server on http://localhost:3000
npm run dev     # same, but auto-reloads with nodemon
```

## What you see
- Hero section saying Hello, World!
- Five card placeholders (Card One–Five) with different gradient colors
- Footer with "Developed by net1io.com", live date/time, and geolocation (if permitted)

## Tips for git practice
- Make text/style tweaks in `index.html` or `src/styles.css`, then run `git diff` to see changes.
- Add console logs in `src/scripts.js` and watch the browser console.
- Commit frequently with small, clear messages to practice history building.

## Notes
- Geolocation requires allowing the browser prompt; otherwise the footer will show a fallback message.
