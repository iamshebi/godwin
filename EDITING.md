# Editing the site

Everything you'll want to change lives in three files. Media files themselves
sit in `public/<category>/`.

| What you want to change | File |
| --- | --- |
| Order of media inside a category page | `lib/media.ts` |
| Homepage Selected Work tiles and their order | `components/portfolio-site.tsx` → `SHOWCASE_ORDER` |
| Nav order, category names, page titles/SEO | `lib/categories.ts` |
| The actual video and image files | `public/<category>/` |

---

## 1. Reorder media inside a category

Open `lib/media.ts`. Each category has a `videos` array and an `images` array.
**They render in array order.** To move a film up the page, move its block up.

```ts
"events": {
  "videos": [
    { "title": "GO KITE TRAVEL", "src": "/events/events-01.mp4",
      "poster": "/events/events-01-poster.jpg", "landscape": false },
    { "title": "ARAMEX", "src": "/events/events-02.mp4",
      "poster": "/events/events-02-poster.jpg", "landscape": true },
  ],
  "images": [ ... ]
}
```

- `title` is the caption on the tile. Change it freely — client names read better
  than `EVENT 07`.
- `landscape` **must match the real clip**: `true` for 16:9, `false` for 9:16.
  Get it wrong and the tile is cropped or letterboxed.
- Videos always render before images on a category page.
- To hide something, delete its block. The file stays on disk; nothing breaks.

The header says the file is generated. That was the first import only — edit it
by hand from now on. It is only regenerated if you ask for a fresh import.

---

## 2. Reorder the homepage tiles

Open `components/portfolio-site.tsx` and find `SHOWCASE_ORDER` near the top.

```ts
const SHOWCASE_ORDER: { source: CategorySlug | "bts"; clip: number }[] = [
  { source: "brand", clip: 0 },
  { source: "food", clip: 0 },
  { source: "events", clip: 0 },
  { source: "fashion-films", clip: 0 },
  { source: "events", clip: 1 },
  { source: "automotive", clip: 0 },
  { source: "interior", clip: 0 },
  { source: "bts", clip: 0 },
];
```

- `source` — which category the tile represents. `"bts"` pulls from `BTS_CLIPS`.
- `clip` — which item from that category, counting from **0**. So `clip: 1` is
  the second one.
- Reorder the lines to reorder the tiles. Add or remove lines to change how many.
- A category may appear more than once; use a different `clip` so you don't show
  the same film twice.
- Clicking a tile opens `/<source>`. The `bts` tile doesn't link anywhere.

---

## 3. Rename a category, change nav order, or edit SEO

Open `lib/categories.ts`.

- `CATEGORY_SLUGS` — **the nav order and the URLs**. `"food"` means `/food`.
  Reorder this array to reorder the menu. Changing a slug changes the URL, which
  breaks any existing link to it, so avoid it once the site is indexed.
- `CATEGORY_LABELS` — what the menu shows. Cosmetic; change freely.
- `CATEGORY_SIDE_LABELS` — the small label in the sidebar on a category page.
- `CATEGORY_SEO` — the `<title>` and description Google shows. Worth keeping the
  city in these; that's what makes them rank for Dubai searches.

Adding a new category means adding a slug here **and** a matching entry in all
four maps, plus a folder of media in `lib/media.ts`.

---

## 4. Adding new media

New files need encoding first — camera originals are far too heavy for the web,
and anything shot on an iPhone in HEVC will not play in Chrome or Firefox at all.

Drop new material into the matching folder in `Desktop/sitemap/` and ask me to
import it. I'll re-encode to web H.264, generate poster frames, detect
orientation and add the entries.

If you do want to add a file by hand, it needs:
- an `.mp4` in `public/<category>/`
- a matching `-poster.jpg` beside it
- an entry in `lib/media.ts` with `landscape` set correctly

---

## 5. Preview and deploy

```bash
cd ~/Desktop/godwin
npm run dev
```

Open http://localhost:3000. Edits appear on save; no restart needed.

When it looks right, stop the dev server with `Ctrl+C`, then:

```bash
npm run build
```

**Always build before pushing.** It catches things the editor won't — broken
imports, invalid CSS, a missing file. A green build ends with a list of routes,
all marked static.

Then:

```bash
git add -A
git commit -m "Reorder events films"
git push
```

Vercel picks up the push and deploys automatically, usually in under a minute.
Watch it at vercel.com/ahammed-shabeebs-projects/godwin, then check
https://inspiremedia.site.

Plain `git push` from here on — the `--force` was a one-off for the history
squash and shouldn't be used again.

---

## If something goes wrong

Nothing is lost; every change is recoverable.

```bash
git diff                  # what you changed
git checkout -- <file>    # throw away changes to one file
git reset --hard HEAD     # throw away everything since the last commit
```

If a deploy goes bad, Vercel keeps the previous one: open the deployment
before it and use **Promote to Production** — that's live again in seconds,
without touching the code.
