# Link Space

A fast, minimal, mobile-first link page for my Instagram bio. It puts my projects, portfolio and social profiles in one place, so visitors can find what they need and open it in a single tap.

**Live:** [links.ayushrathour.site](https://links.ayushrathour.site)

---

## Table of contents

- [Overview](#overview)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Customization](#customization)
  - [Adding or editing projects](#adding-or-editing-projects)
  - [Project fields](#project-fields)
  - [Project status](#project-status)
  - [Changing social links](#changing-social-links)
  - [Colors and fonts](#colors-and-fonts)
  - [SEO and social sharing](#seo-and-social-sharing)
- [Deployment](#deployment)
- [Using it in an Instagram bio](#using-it-in-an-instagram-bio)
- [Accessibility](#accessibility)
- [Browser support](#browser-support)
- [Author](#author)

---

## Overview

Link Space is a single-page site built with plain HTML, CSS and JavaScript. There is no framework, no build step and no dependencies, so it loads quickly even inside the in-app browsers that Instagram and other social apps use.

The page is organized around one job: get a visitor from my bio to the right project quickly.

1. A short introduction with my portfolio link.
2. A strip of social profiles.
3. A list of selected projects, rendered from a single data array.

## Features

**Design**

- Minimal, premium dark theme with a single orange accent
- Fully responsive layout with breakpoints for tablet, mobile and small phones (down to 320px)
- Readable type sizes on phones, with at least 44px tall tap targets for the main links
- Pressed-state feedback when a card or button is tapped
- Safe-area padding for phones with notches and home bars

**Content**

- Projects rendered dynamically from one `projects` array
- Featured project highlighting
- Project status labels: live, in development, archived
- Hide or archive a project without deleting its data
- Social profile links with inline SVG icons
- "Copy link" button with a confirmation toast and a fallback for browsers without the Clipboard API

**Technical**

- No build step, no dependencies
- Custom SVG favicon and a 1200×630 social sharing image
- Open Graph and Twitter Card metadata for rich link previews
- HTML-escaped output when rendering project data
- `<noscript>` fallback so the project links still appear if JavaScript is unavailable
- Respects `prefers-reduced-motion`

## Tech stack

| Layer    | Technology                                  |
| -------- | ------------------------------------------- |
| Markup   | HTML5                                       |
| Styling  | CSS3 (custom properties, grid, flexbox)     |
| Behavior | Vanilla JavaScript (ES6+)                   |
| Fonts    | Space Grotesk and DM Mono, via Google Fonts |
| Hosting  | Cloudflare Pages                            |

## Project structure

```text
link-space/
├── index.html        # Page structure, metadata, social links
├── style.css         # All styling and responsive rules
├── script.js         # Projects data, rendering, copy-link feature
├── README.md
└── assets/
    ├── favicon.svg   # Site icon
    └── og-image.png  # Social sharing preview (1200×630)
```

## Getting started

1. Clone the repository:

   ```bash
   git clone https://github.com/ayush-rathour/link-space.git
   ```

2. Open the project folder:

   ```bash
   cd link-space
   ```

3. Open `index.html` in your browser.

For the most accurate result, including the copy-link button, serve it over HTTP instead of opening the file directly. The Clipboard API only works on secure contexts (HTTPS or `localhost`):

```bash
# Python 3
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Customization

### Adding or editing projects

All project content lives in the `projects` array at the top of `script.js`. To add a project, copy an existing object, paste it at the end of the array and change its values:

```javascript
{
  id: "my-new-project",
  name: "My New Project",
  description: "One short sentence about what it does.",
  category: "WEB APP",
  tags: ["WEB", "TOOL", "OPEN SOURCE"],
  url: "https://example.com",
  status: "live",
  featured: false,
  visible: true,
  order: 5,
}
```

The page sorts by `order`, so you can reorder projects by changing those numbers. The "Selected work" counter updates automatically.

### Project fields

| Field         | Type     | Description                                                                |
| ------------- | -------- | -------------------------------------------------------------------------- |
| `id`          | string   | Unique identifier. Use lowercase letters and hyphens.                      |
| `name`        | string   | Project title shown on the card.                                           |
| `description` | string   | One or two short lines. Shorter reads better on mobile.                    |
| `category`    | string   | Small label at the top of the card. Shown in uppercase style.              |
| `tags`        | string[] | Up to three short keywords shown at the bottom of the card.                |
| `url`         | string   | Destination link. Opens in a new tab.                                      |
| `status`      | string   | `"live"`, `"development"` or `"archived"`.                                 |
| `featured`    | boolean  | Shows the "Featured" label and moves the status to the bottom of the card. |
| `visible`     | boolean  | Set to `false` to hide the project without deleting it.                    |
| `order`       | number   | Sort position. Lower numbers come first. Keep values unique.               |

### Project status

| Status        | Label                  | Behavior              |
| ------------- | ---------------------- | --------------------- |
| `live`        | LIVE (green)           | Shown on the page.    |
| `development` | IN DEVELOPMENT (amber) | Shown on the page.    |
| `archived`    | ARCHIVED (gray)        | Hidden automatically. |

### Changing social links

Social links are written directly in `index.html`, inside the `<nav class="social-links">` block. Each one is a single `<a>` element. To add another profile, duplicate an existing link, change the `href` and `aria-label`, and replace the inline SVG icon and label.

The portfolio link is the `<a class="portfolio-link">` element in the intro section.

### Colors and fonts

Theme values are CSS custom properties at the top of `style.css`:

| Variable        | Default   | Used for                          |
| --------------- | --------- | --------------------------------- |
| `--bg`          | `#10100f` | Page background                   |
| `--panel`       | `#181816` | Card background                   |
| `--panel-hover` | `#1e1e1a` | Card hover and pressed state      |
| `--text`        | `#f1eee7` | Main text                         |
| `--muted`       | `#929087` | Secondary text                    |
| `--soft`        | `#b8b4aa` | Descriptions                      |
| `--accent`      | `#ff784f` | Highlights, arrows, hover borders |
| `--green`       | `#a9c99a` | Live status and online dot        |

Fonts are set with `--sans` (Space Grotesk) and `--mono` (DM Mono). If you change them, update the Google Fonts `<link>` in `index.html` as well.

### SEO and social sharing

Update these in the `<head>` of `index.html` when you change domain or branding:

- `<link rel="canonical">`: the final URL of the page
- `og:url`, `og:image`, `twitter:image`: absolute URLs, including the domain
- `og:title`, `og:description`, `twitter:title`, `twitter:description`: the text shown in link previews
- `assets/og-image.png`: keep it at 1200×630 for best results across platforms

Social apps cache preview images. After changing `og-image.png`, use a tool such as Facebook's Sharing Debugger to refresh the preview.

## Deployment

The site is deployed on **Cloudflare Pages**, but any static host works (GitHub Pages, Netlify, Vercel).

For Cloudflare Pages:

1. Push the repository to GitHub.
2. In the Cloudflare dashboard, go to **Workers & Pages → Create → Pages → Connect to Git**.
3. Select the repository.
4. Leave the **build command** empty and set the **output directory** to `/` (the project root).
5. Deploy, then add a custom domain such as `links.ayushrathour.site` under **Custom domains**.

Every push to the main branch redeploys the site automatically.

## Using it in an Instagram bio

1. Open Instagram and go to **Edit profile → Links**.
2. Add `https://links.ayushrathour.site`.
3. Keep the page lean. Visitors arrive on a phone, usually in Instagram's in-app browser, so short descriptions and clear project names work best.

## Accessibility

- Semantic landmarks and headings (`main`, `header`, `section`, `footer`, `nav`)
- Descriptive `aria-label`s on cards and icon-only links, including a note that links open in a new tab
- Visible keyboard focus outlines
- `aria-live` regions for the project list and the copy confirmation
- Decorative icons hidden from assistive technology
- Animations and transitions reduced when the user prefers reduced motion
- External links use `rel="noopener noreferrer"`

## Browser support

Works in current versions of Chrome, Safari, Firefox and Edge on desktop and mobile, as well as the in-app browsers of social apps. It relies on CSS grid, flexbox, custom properties and ES6 features, so very old browsers are not supported.

## Author

**Ayush Rathour**

- Portfolio: [ayushrathour.site](https://ayushrathour.site)
- GitHub: [ayush-rathour](https://github.com/ayush-rathour)
- Instagram: [@ayushrathourrr](https://www.instagram.com/ayushrathourrr)

---

**Made with intention.**
