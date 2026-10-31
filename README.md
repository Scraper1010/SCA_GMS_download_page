# SCA GMS — landing page

A static, Arabic-first (RTL) landing page for the SCA GMS fleet and fuel
management system. White/paper theme, cinematic photo sections, trust and FAQ,
a tilted screen running the real dashboard mockup, and a download CTA.

No framework, no build step and no backend are required.

## Run

Open `index.html` directly, or serve the folder:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

- Landing: `http://127.0.0.1:4173/`
- Dashboard mockup: `http://127.0.0.1:4173/mockups/sca-dashboard.html`

The page also works from `file://`. Google Fonts are the only network request;
local fallback fonts are defined. The mockup is fully self-contained. Version
labels fall back to the static values in `index.html` when opened from
`file://`, because browsers block local JSON fetches; serve over HTTP to manage
them from `json/version.json`.

## Structure

```
index.html                 landing page
json/
  version.json             version number + installer filename template
download/
  SCA_GMS_Setup_0.0.1.exe  Windows installer
  README.md                installer drop-folder notes
mockups/
  sca-dashboard.html       self-contained 1:1 dashboard mockup
  README.md                mockup notes and demo-data reference
css/
  tokens.css               design tokens + reset
  base.css                 header, buttons, motion
  hero.css                 landing hero
  sections.css             sections, trust, FAQ, CTA + light theme
  mockup.css               tilted screen and split control section
  responsive.css           landing responsive rules
js/
  landing/
    nav.js                  header, progress, mobile menu
    hero.js                 pointer glow
    reveal.js               scroll reveals
    mockup.js               scales the embedded dashboard to its frame
    version.js              version tags + installer download links
assets/
  hero-poster-light.jpg     hero + Open Graph image
  canal-cta.png             download CTA image
  favicon/                  favicon, Apple icon, PWA icons and manifest
  CREDITS.md
```

## Dashboard preview

The control section embeds `mockups/sca-dashboard.html` in an iframe at a
1440 × 1000 desktop viewport, then scales it down with JavaScript to fit the
tilted screen. Below 760px the iframe switches to a 1024 × 900 viewport so the
dashboard stays legible on phones. The screen is fully interactive: expand the
sidebar groups, toggle light/dark mode, view chart tooltips and scroll inside
the dashboard. The iframe only hides its native scrollbar; all controls stay
live.

The mockup itself is a standalone, offline file with embedded fonts, icons,
styles, charts and fictional demo data. See `mockups/README.md` for details.

## Offline section

The desktop-version section is built entirely with HTML, CSS and inline SVG:
a dark file-window UI, a floating local-status card and animated icon bubbles
for offline mode, SQLite and automatic backups. It uses no photos.

## Version and installer

All version labels and download links are driven by `json/version.json`:

```json
{
  "version": "0.0.1",
  "downloadFile": "SCA_GMS_Setup_{version}.exe"
}
```

`js/landing/version.js` updates every `[data-version]` tag, every download link
and the filename note. `{version}` in `downloadFile` is replaced automatically.
Place the matching installer in `download/` before publishing.

Place the matching installer in `download/` before publishing a new version.
Download buttons are native anchors with the `download` attribute.

## Theme

The landing uses the SCA canal palette: sand, ink, teal and brass. The hero and
download sections carry a full dark photo overlay so the cream/gold type stays
readable. The embedded dashboard keeps its own light product colours inside a
dark, tilted screen frame.

## Notes

Use fictional sample data only. Do not publish real employee names, phone
numbers, card numbers, plates or operational totals.
