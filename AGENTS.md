## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

Verify changes with `npx astro check` (types) and `npx astro build`.

## Project structure

One-page portfolio of Maxim Potapchenko (GitHub `noeradev`, handle `noera`). i18n: `ru` (default), `en`, `kk` — `src/pages/<locale>/index.astro` all render `src/components/pages/HomePage.astro`; `src/pages/index.astro` redirects to `/ru/` (`redirectToDefaultLocale: false` avoids a route conflict).

**The site is a faithful re-skin of the ECHO reference (github.com/Jishnu09-siuu/ECHO-WEBSITE)** — the user wants ECHO's layout, editorial typography and animations kept, only restyled into the dark blue→violet space palette of the logo. Do not replace ECHO scenes with "simpler" ones; fix performance instead.

Section order mirrors ECHO: Nav → Hero (giant title, rocket in place of ECHO's portrait) → About (scroll-expand) → Journey (horizontal canvas, stack chapters instead of experience) → Projects (OGL liquid carousel) → Screens (3D drum) → Services (accordion) → Footer "LET'S TALK" → ProjectModal.

- Logo: `public/image.svg` is the user's file — **never modify it**. `RocketLogo.astro` fetches it once and adjusts the DOM at runtime (viewBox zoom onto the artwork, id prefixing, `.rk-flame` class on flame-coloured paths). Animation (`rk--live`, opt-out via `animated=false`): flame licks via scaleY+skew on fill-box top origin, pulsing exhaust glow, drifting embers. Keep it subtle — strong deformation looked wrong. `public/logo.svg` = same art with cropped viewBox for `<img>`/favicon.
- Engines: `src/engines/flex-carousel.js`, `works-wheel.js` (copied from ECHO, OGL from npm, dark classes; the wheel sleeps when settled and captures the pointer only on real drags), `scroll-expand.ts`, `experience.ts` (ports, `data-sem` / `data-exp` hooks, scroll listeners only while visible).
- Tailwind v4 via `@tailwindcss/vite`; `@source "../engines"` because engines build DOM with Tailwind classes. Tokens in `src/styles/global.css` (`void/abyss/panel/blue/indigo/violet/lavender/flame`). Fonts: Manrope (full Cyrillic + Kazakh) + JetBrains Mono.
- StringTune (`src/lib/stringtune.ts`, `string="parallax|magnetic"`) is lazy-loaded on idle from `Base.astro`. Modals use `src/lib/events.ts` (no window globals).
- Art in `src/assets/art/`: `space-bg.png` (canvas-rendered quiet starfield). The About card is a **profile card** — flat brand plate with the logo as portrait + real bio + stats (content must explain who he is; decorative space scenes were rejected). Wheel screens in `src/assets/gallery/` are real screenshots of the live sites; list in `src/data/site.ts`.
- Flame animation must keep max scaleY ≤ ~1.03 — larger stretches make the flame overlap the logo's own orbit ribbon and look broken. No glow blocks under the flame either.
- Gradient text (`.cosmic-title`, `.brand-gradient`, `.footer-title`) uses `background-clip: text` — it needs the padding+negative-margin hack in global.css or diacritics (й/ё/қ/ң) get clipped.
- Performance rules: no full-screen canvas/grain/animated blur; no `backdrop-filter` over moving content; use pre-blurred images instead of CSS `filter: blur` on animated elements; heavy images are pre-decoded on idle. Measure with headless Chrome using `--use-angle=metal` (real GPU); SwiftShader numbers are misleading.
- `src/content/projects/*.md` — real GitHub projects (YAML, `locales.<lang>`, `cover: image()`). `src/data/site.ts` — handle, GitHub, optional `email`/`telegram` (contact pills render only when set). `src/i18n/ui.ts` — typed dictionary; `kk` strings are draft quality.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
