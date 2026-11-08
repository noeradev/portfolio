# noera — portfolio

Personal site of Maxim Potapchenko (noera): violet space-themed branding, heavy web interactions, three locales — RU / EN / KK.

Design and interactions are inspired by **[ECHO-WEBSITE](https://github.com/Jishnu09-siuu/ECHO-WEBSITE)** — the core "living" components started from its ideas, but the engines were rewritten and brought to production quality (architecture, mobile branches, render fixes, localization).

## Stack

- **Astro 5** + TypeScript — static site, zero-JS by default
- **OGL / WebGL2** — lens-shader project carousel, custom GLSL programs
- Vanilla engines, no frameworks — direct DOM transforms inside a single `requestAnimationFrame`

## What's inside

- **Preloader** — a `T-MINUS` launch sequence: rocket in orbit, progress bar, zoom-flash and curtain lift
- **Projects** — circular carousel with a liquid WebGL lens: cards bend as one ribbon, drag/scroll, `01 / 04` reel counter, overscan render target (no edge artifacts)
- **Screens** — works-wheel: on desktop cards sit on a tangential ring and unfold into a 3D drum on scroll; on phones it goes straight to a flat drum
- **Journey** — development timeline with scroll-driven animations
- **Localization** — `ru` / `en` / `kk`, dictionary in `src/i18n/ui.ts`
- **RocketLogo** — the original `public/image.svg` rendered verbatim; the flame is brought to life at runtime (SVG turbulence filter + embers)

## Structure

```text
src/
├── components/     # sections: Hero, About, Journey, Projects, Screens, Services, Footer…
├── engines/        # works-wheel, flex-carousel (WebGL), scroll-expand, experience
├── content/        # project write-ups (Astro Content Collections)
├── data/site.ts    # contacts and the drum screen list
├── i18n/ui.ts      # three-locale dictionary
├── lib/            # event bus, utilities
└── pages/          # /ru /en /kk routes
```

## Commands

| Command           | Action                                    |
| :---------------- | :---------------------------------------- |
| `npm install`     | Install dependencies                      |
| `npm run dev`     | Dev server at `localhost:4321`            |
| `npm run build`   | Production build to `./dist/`             |
| `npm run preview` | Preview the build locally                 |
| `npx astro check` | Type-check and component diagnostics      |

## Contacts

- Telegram — [@webprogdev](https://t.me/webprogdev)
- GitHub — [@noeradev](https://github.com/noeradev)
