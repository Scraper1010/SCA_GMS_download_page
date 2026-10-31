# Standalone dashboard mockup

`sca-dashboard.html` is a self-contained, offline visual mockup of the
signed-in dashboard (`/dashboard`). It mirrors the real screen — same theme
tokens, IBM Plex Sans Arabic, Lucide icons, cards, balances, charts and
sidebar — and uses fictional demo data.

## Use it

Open the file directly in a browser, or embed it:

```html
<iframe src="sca-dashboard.html" title="SCA GMS dashboard"
        style="width:100%;height:100vh;border:0"></iframe>
```

There is no build step, no CDN, no network request and no API: the fonts,
icons, CSS, charts and data are all inside the one file. It works offline
and inside a sandboxed iframe.

## What works

- Sidebar groups expand/collapse; the mobile top bar opens the drawer.
- The light/dark toggle is in the sidebar footer and remembers the choice
  (`localStorage`, key `sca_theme`).
- Charts redraw on resize and show Recharts-style tooltips on hover.
- The page is responsive at the same breakpoints as the app (640 / 768 /
  1024 / 1280 px).
- Sidebar links and action buttons are intentionally inert — they are
  marked `data-demo` and only keep the mockup on the page.

## Demo data

The numbers are in the `<script>` block near the bottom:

| Constant | What it feeds |
|---|---|
| `ACCOUNTS` | the balance cards, the two bar charts, the account-level percentages |
| `FUEL_TYPES` | the fuel-type donut, its legend and the per-fuel cards |
| `PRICE_HISTORY` | the price line chart |

The KPI values, the alert banner, the hero totals and the fuel-price rows
are static markup near the top so the page is readable even while the script
is loading. If you change the arrays, update those figures too.

## Style source

The inline CSS is the output of Tailwind v4 compiled against the same
`@theme` tokens and dark-mode overrides as
`Dashboard/app/globals.css`. Changing text or data needs no rebuild. If you
add new Tailwind utility classes, recompile the CSS and replace the
compiled block in the `<style>` element.

The mockup does not import from or modify the Next.js app; `pnpm build` and
the portable build are unaffected.

## Credits

- IBM Plex Sans Arabic, SIL Open Font License 1.1 (Google Fonts), embedded
  as WOFF2 subsets.
- Lucide icons, ISC license, embedded as an SVG sprite.
