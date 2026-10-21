# Shelterbelt

**Build useful things.** Thomas Pflipsen’s independent workshop for useful software experiments. Grain Bin is Experiment 001.

## Develop locally

This is a static HTML/CSS website. No framework, JavaScript bundle, package installation, environment variables, or build step is required.

```sh
python3 -m http.server 3000 --bind 127.0.0.1
```

Open the local server in your browser. Edit `index.html` and `styles.css`, then refresh. Inter and Newsreader are served locally from `fonts/`, with system sans-serif and Georgia fallbacks. The font files were downloaded from Google Fonts; their SIL Open Font Licenses are included alongside them. The shared Shelterbelt palette and wheat mark originate in the Grain Bin brand system.

## Review before merging

- Check the page at desktop and narrow mobile widths for overflow and readable text.
- Check keyboard focus, the skip link, navigation anchors, and the Grain Bin link.
- Confirm the bundled fonts load, and that content remains readable when they are unavailable.
- Check the Vercel preview before approving a production release.

## Vercel setup (after approval)

Import this repository into a separate Vercel project. Select **Other** as the framework preset, leave the build command unset, and serve the repository root (`.`) as the output directory. No install command is needed. Confirm these settings in Vercel before deploying.

Review a branch preview first. Connect `shelterbelt.xyz` only after explicit approval, using the DNS records Vercel supplies. Domain, DNS, and production changes are separate from this website PR.
