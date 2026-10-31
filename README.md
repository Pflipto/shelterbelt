# Shelterbelt

**Build useful things.** Thomas Pflipsen’s independent software workshop. The Living Farm is an illustrated way to explore its experiments; Grain Bin and Silo Works are the first two destinations.

## Develop locally

Static HTML/CSS and a small vanilla JavaScript module. No framework, package installation, environment variables, or build step is required.

```sh
python3 -m http.server 3000 --bind 127.0.0.1
```

Open the local server in a browser. Use HTTP rather than opening the HTML file directly, so the browser can load the JavaScript module. Edit `index.html`, `styles.css`, or `farm.js`, then refresh.

Inter and Newsreader are served locally in WOFF2 format. Their original TTF files and SIL Open Font Licenses remain in `fonts/`. The WOFF2 conversion preserves glyphs, metrics, and names; it does not subset the fonts. Georgia and system sans-serif provide fallbacks.

## The scene and interaction

- `assets/farm.webp` is an AI-generated editorial illustration, optimized for delivery at 1536 × 1024. It is a North Dakota-inspired interpretation, **not a photograph, map, or reconstruction of the family property**. Buildings and layout are illustrative, not historical claims.
- `.farm-camera` holds the image and both destination controls in one coordinate system. Its 3:2 aspect ratio matches the image. Each hotspot’s `--destination-x` and `--destination-y` percentages register it to its depicted site: the grain bin (65%, 58%) and the distant former missile-silo compound (85.5%, 34%). Changing the illustration requires checking both. On narrow screens the framing keeps both destinations visible; the Silo Works label sits above its site to avoid overlapping the grain bin.
- `data-camera-x`, `data-camera-y`, and `data-camera-scale` on `#farm` configure the single camera approach. `farm.js` bounds the transform and uses a smooth progress curve. This is a pan and zoom across a two-dimensional illustration, not an orbiting 3D scene.
- On desktop, a short sticky section (1.68 viewport heights in total) uses normal page scrolling. One screen is visible at a time; the approach takes about 0.68 screens of additional scrolling. There is no intercepted scrolling or animation loop running continuously. Updates use `requestAnimationFrame` only after scroll/resize or motion-preference changes and stop outside the scene.
- On screens at or below 760px, and when reduced motion is requested, the camera remains still and the scene uses ordinary page flow. With JavaScript disabled, the overview stays static and both project cards still work through the browser’s native popover controls.
- Selecting “001 / Grain Bin” or “002 / Silo Works” opens the matching compact native popover beside its site. Scrolling alone never opens it. The card contains a short project description, the live app link, and a source link. Close it with the close button, Escape, or a click outside it. Closing with Escape or the close button returns focus to the corresponding site. The header also provides a conventional direct link to Grain Bin.
- The browser’s Popover API handles opening, dismissal, and keyboard behavior without JavaScript. For each card, `farm.js` only positions it beside its own site, keeps it inside the viewport, and updates its position during camera movement or resizing. Without JavaScript each card opens centered. Browsers without native popover support get direct app links instead.
- The project card stays outside the transformed camera, in the browser’s top layer. Silo Works is represented by a small, decommissioned Cold War-style underground site farther into the field, with a closed hatch and earth-covered access bunker. This is illustrative scenery, not a claim about a real installation. Both cards share the same positioning code; native automatic popovers keep only one card open at a time. There is no procedural environment.

The masthead combines the wordmark, workshop descriptor, navigation, and main headline in a single header. The slogan appears once in the opening; the footer identity is the wordmark with a quiet coordinate line. Mobile navigation keeps the wordmark and direct Grain Bin link on one row. The footer places the identity and social links side by side, with the full story in a native “Why Shelterbelt?” disclosure below. The story is expanded on desktop; without JavaScript it remains readable and can still be collapsed using the native control.

## Validation

Optional camera unit tests use Node.js 24, without installing packages:

```sh
node --test tests/farm.test.mjs
```

Before merging, check:

- Desktop and narrow mobile layouts, image loading, readable text, and horizontal overflow.
- The scroll approach and alignment of both sites’ visible labels and hit targets.
- Both cards remain hidden during scrolling and open only on destination activation, including keyboard activation. Check close-button, Escape, and outside-click dismissal and focus returning to the corresponding site.
- The card fits narrow and short viewports, repositions when resized, and follows its site during camera movement. No unexpected focus movement while scrolling.
- Reduced motion, including changing the preference while the page is open.
- JavaScript disabled: static scene, both working native project popovers, app/source links, and native navigation.
- Local font loading and fallbacks; visible focus, contrast, and semantic headings.
- The live Grain Bin and Silo Works destinations and the branch preview. Automated accessibility checks do not replace reviewing the actual experience.

## Vercel

This remains a static site: framework **Other**, no install/build commands, repository root (`.`) as the output directory. Review the branch preview before approving a production release. DNS, domain, deployment, and production settings are separate changes and require explicit approval.
