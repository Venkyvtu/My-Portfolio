# Banka Venkateswarlu — Portfolio

A single-file, dependency-free portfolio site (`index.html`). No build step, no framework — just open it or deploy it as a static file.

## 1. Folder structure

Put these files together in one folder:

```
portfolio/
├── index.html      ← the site (provided)
├── photo1.jpg       ← your profile photo (you already use this filename — keep it, or update the <img src> in the About section)
└── resume.pdf       ← your resume, referenced by the "Download resume" button
```

`photo1.jpg` and `resume.pdf` are **not included** — add your own files with those exact names, or edit the two references in `index.html`:
- `<img src="photo1.jpg" ...>` in the About section
- `<a href="resume.pdf" ...>` in the Hero section

## 2. Things worth editing before you publish

- **TCS experience card** (Experience section): I kept this general since I didn't have your exact role title or employment dates — search `<!-- EDIT:` in `index.html` to find it and fill those in.
- **Contact form**: it's frontend-only right now (validates input, shows a status message, but doesn't send anything). To make it actually send messages, wire it up to a service like [Formspree](https://formspree.io) or [EmailJS](https://www.emailjs.com), or point the `<form>` at your own backend endpoint.
- **Twitter / Instagram links**: the original file had placeholder `#` links for these; I removed them from the rebuild rather than ship dead links. Add them back into the header/hero social links if you want them, once you have real URLs.
- **Stats numbers** (Projects, Technologies, etc.) are counted from what's actually listed on the page. If you add or remove projects/skills, update the `data-count` values in the Stats section to match.

## 3. Dependencies (all via CDN, no install needed)

- [Boxicons](https://boxicons.com) — icon font
- [Font Awesome 6](https://fontawesome.com) — a few brand/logo icons
- [Google Fonts](https://fonts.google.com) — Space Grotesk (headings) + Inter (body)

No npm, no build tooling. If you'd rather self-host these fonts/icons instead of relying on CDNs, download them and update the `<link>` tags in `<head>`.

## 4. Running it locally

Just open `index.html` in a browser. For a closer-to-production preview (so relative links behave exactly as they would on a real host), serve the folder locally:

```bash
# Python 3
python3 -m http.server 8000
# then visit http://localhost:8000
```

## 5. Deployment options

**GitHub Pages** (matches your existing GitHub presence):
1. Create a repository, e.g. `Venkyvtu.github.io` (for a root user site) or any repo name (for a project site).
2. Push `index.html`, `photo1.jpg`, and `resume.pdf` to the repository.
3. In the repo settings, under **Pages**, set the source to the `main` branch (root).
4. Your site will be live at `https://venkyvtu.github.io/` (or `https://venkyvtu.github.io/<repo-name>/` for a project site).

**Netlify / Vercel:**
1. Drag-and-drop the folder onto [app.netlify.com/drop](https://app.netlify.com/drop), or connect the GitHub repo for automatic deploys on every push.
2. No build command is needed — it's a static file.

## 6. Notes on what changed from the original

- Rebuilt as a modern dark UI with a consistent visual language (connected-node graphics used for both the hero and the architecture/flow diagrams) instead of the previous generic timeline-and-card template.
- Added: Experience section, AI & Agentic AI section, tech ecosystem visualization, stats section, project filtering, project detail modals, mobile navigation, back-to-top, accessibility passes (skip link, focus states, `Escape` to close modal, `prefers-reduced-motion` support).
- Added the Delta Autonomous Revenue Assurance Platform and PPE Kit Detection projects, per your brief.
- Kept every existing project, and didn't fabricate GitHub/demo links for projects that don't have one — those show a "View details" button only.
- The "VMeet" project mentioned as optional in your brief wasn't added, since no details about it were provided — add it yourself following the existing project-card + `projectData` pattern in `index.html` if you want it included.
