# themukaaa.com

My personal portfolio and digital garden. A small hand drawn corner of the internet where I keep my work, my favourite things and whatever I happen to be building.

**Live site:** [themukaaa.com](https://themukaaa.com)

## Built with

Plain HTML, CSS and JavaScript. No frameworks, no build step, no dependencies. Clone it and open it, that is the whole setup.

- Animated topographic background drawn on a canvas element
- Hand drawn stickers and shapes throughout
- Self hosted fonts, no external requests
- No cookies, no analytics, no tracking
- Semantic HTML with keyboard navigation and screen reader support

## Structure

```
.
├── index.html
├── 404.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── anime/
│   └── index.html
├── cats/
│   └── index.html
├── legal/
│   └── index.html
├── me/
│   └── index.html
├── scrapbooks/
│   └── index.html
├── songs/
│   └── index.html
├── updates/
│   └── index.html
└── assets/
    ├── brands/
    ├── fonts/
    ├── logos/
    ├── photos/
    └── stickers/
```

Every page lives in its own folder as an `index.html` rather than sitting at the root as `anime.html`. A web server serves `index.html` automatically when you request a folder, so this gives you clean URLs like `themukaaa.com/anime/` with no file extension showing. It also keeps the root tidy as the site grows.

One stylesheet and one script are shared across every page. The browser caches both after the first load, so moving between pages is instant.

## Running it locally

1. Clone the repository
2. Open the folder in VS Code
3. Install the Live Server extension
4. Right click `index.html` and choose Open with Live Server

Any static file server works. The site has no backend and nothing to compile.

## Making it your own

- **Replace the artwork.** Everything in `assets/stickers`, `assets/photos` and `assets/logos` is mine. Draw your own or use something you have the rights to.
- **Change the colours.** They are defined once at the top of `css/style.css` under `:root`. Editing them there updates the whole site.
- **Adjust the background.** The contour animation lives in `js/script.js`. The `LEVELS` array controls how many lines are drawn and `LINE_COLORS` sets their colours.
- **Add or remove pages.** Copy any page folder, rename it, update the content. Remember to add the new URL to `sitemap.xml`.
- **Keep the fonts if you like them.** Syne, Caveat, DM Sans and Swanky and Moo Moo are all open source under the SIL Open Font License, so they are included and free to redistribute.

## Licence

The code is released under the [MIT Licence](LICENSE). Use it, change it, build something with it.

The artwork is not. The stickers, drawings, logos and photographs are my own work and are not covered by the licence. If you build on this project, please swap them for your own.