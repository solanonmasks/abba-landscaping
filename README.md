# Abba Landscaping website

A one-page static website built from the design mockup (`Site mockup for landscaping company.zip`).
It's plain HTML, CSS and a little JavaScript, with **no build step and nothing to install**.

## Files

| File | What it is |
|---|---|
| `index.html` | The whole page (all text lives here) |
| `css/styles.css` | All the styling (colours are at the top) |
| `js/main.js` | Mobile menu, services tabs, project chips, estimate form |
| `fonts/` | Schibsted Grotesk font files |
| `Site mockup for landscaping company.zip` | The original design export, for reference only |

## Preview it

- **Easiest:** double-click `index.html` to open it in your browser.
- **Closer to the real thing:** in this folder, run `python3 -m http.server`,
  then open http://localhost:8000

The estimate form only really sends once the site is deployed on Netlify (see below).
When previewing locally it will show a "Sorry, that didn't send" message, which is expected.

## Deploy (Netlify, free)

1. Sign in at netlify.com → "Add new site" → "Import from GitHub" → pick this repo.
2. Leave the build command empty and set the publish directory to `/`.
3. The estimate form (including photo uploads) works automatically. Submissions
   appear under **Forms** in Netlify, where you can turn on email notifications.

## Still to do before launch (search `index.html` for "TODO")

- Phone number `(604) 555-0147` is a placeholder (555 numbers aren't real)
- Confirm the 4.9 rating, 86 reviews and customer quotes; add the HomeStars link
- Add real Facebook / Instagram / YouTube links
- "Learn more" and "All projects" links were removed because those pages don't exist yet
- Photos are hotlinked from abbalandscaping.ca. Later, save local copies in an `images/` folder.
