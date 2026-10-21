# Shelterbelt

**Build useful things.** Thomas Pflipsen’s independent software workshop. The Living Farm is an illustrated way to explore its experiments; Grain Bin is the first destination.

## Develop locally

Static HTML/CSS and a small vanilla JavaScript module. No framework, package installation, environment variables, or build step is required.

```sh
python3 -m http.server 3000 --bind 127.0.0.1
```

Open the local server in a browser. Use HTTP rather than opening the HTML file directly, so the browser can load the JavaScript module. Edit `index.html`, `styles.css`, or `farm.js`, then refresh.

Inter and Newsreader are served locally in WOFF2 format. Their original TTF files and SIL Open Font Licenses remain in `fonts/`. The WOFF2 conversion preserves glyphs, metrics, and names; it does not subset the fonts. Georgia and system sans-serif provide fallbacks.

## The scene and interaction

- `assets/farm.webp` is an AI-generated editorial illustration, optimized for delivery at 1536 × 1024. It is a North Dakota-inspired interpretation, **not a photograph, map, or reconstruction of the family property**. Buildings and layout are illustrative, not historical claims.
- `.farm-camera` holds the image and destination anchor in one coordinate system. Its 3:2 aspect ratio matches the image. The hotspot’s `--destination-x` and `--destination-y` percentages register it to the depicted grain bin; changing the illustration requires checking these coordinates.
- `data-camera-x`, `data-camera-y`, and `data-camera-scale` on `#farm` configure the single camera approach. `farm.js` bounds the transform and uses a smooth progress curve. This is a pan and zoom across a two-dimensional illustration, not an orbiting 3D scene.
- On desktop, a short sticky section (1.68 viewport heights in total) uses normal page scrolling. One screen is visible at a time; the approach takes about 0.68 screens of additional scrolling. There is no intercepted scrolling or animation loop running continuously. Updates use `requestAnimationFrame` only after scroll/resize or motion-preference changes and stop outside the scene.
- On screens at or below 760px, and when reduced motion is requested, the camera remains still and the scene uses ordinary page flow. With JavaScript disabled, the overview and project remain accessible through regular anchors.
- The bin, scene shortcut, and header link all select the same ordinary HTML project section. Only intentional selection moves focus there; scrolling never steals focus. “Back to the farm” restores the overview and focus to the bin. The return link also works without JavaScript.
- Project content and links are outside the moving artwork. Future destinations can use additional coordinate-based anchors and semantic project sections. Adding another building will require an artwork update; there is no procedural environment or speculative second project.

`assets/grain-bin.jpg` is an unaltered screenshot of the historical-supply section from Grain Bin’s local production build at commit `30f2baeabfde818d03eeac9e91bff96bbd5d6947`, using real DefiLlama data. Captured October 21, 2026 at 1180 × 559 pixels. The project caption identifies the figures as a snapshot. Replace it with a real application capture when updating it; do not recreate the interface or edit its metrics.

## Validation

Optional camera unit tests use Node.js 24, without installing packages:

```sh
node --test tests/farm.test.mjs
```

Before merging, check:

- Desktop and narrow mobile layouts, image loading, readable text, and horizontal overflow.
- The wide-to-bin scroll approach and alignment of the bin’s visible label and hit target.
- Selecting the bin by pointer and keyboard, direct header access, and returning to the overview.
- No unexpected focus movement while scrolling.
- Reduced motion, including changing the preference while the page is open.
- JavaScript disabled: static scene, visible project, live application/source links, and native anchors.
- Local font loading and fallbacks; visible focus, contrast, and semantic headings.
- The live Grain Bin destination and the branch preview. Automated accessibility checks do not replace reviewing the actual experience.

## Vercel

This remains a static site: framework **Other**, no install/build commands, repository root (`.`) as the output directory. Review the branch preview before approving a production release. DNS, domain, deployment, and production settings are separate changes and require explicit approval.
