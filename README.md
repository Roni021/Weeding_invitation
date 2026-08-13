# Ananya & Vihaan — Clean Next.js Wedding Invitation

A clean, fully commented Next.js conversion of the supplied wedding invitation.

## Project structure

```text
app/
  page.tsx        # Main invitation, clearly divided into 20 sections
  layout.tsx      # Metadata + global layout
  globals.css     # Complete visual styling

components/
  *.tsx           # Named section/component boundaries
data/
  wedding.ts      # Central wedding content/data
public/
  images/         # Wedding photos
  audio/          # Wedding music
```

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Replace assets

Add your real photos under the existing `public/images/` folders.
Add music as `public/audio/our-song.mp3`.

## Editing

For names/date/venue/events/gallery data, edit:

```text
data/wedding.ts
```

For section markup and page flow, edit:

```text
app/page.tsx
```

Every major section is marked with a large comment block so it is easy to find.
