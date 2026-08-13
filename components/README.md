# Components

Each file represents one major section or UI responsibility of the invitation.

- `Intro.tsx` — opening envelope
- `Navbar.tsx` — navigation
- `Hero.tsx` — hero
- `Countdown.tsx` — countdown
- `Couple.tsx` — bride/groom
- `Story.tsx` — relationship timeline
- `PhotoStory.tsx` — visual story
- `Events.tsx` — ceremonies
- `Venue.tsx` — venue/map
- `SaveTheDate.tsx` — calendar tools
- `Gallery.tsx` — gallery
- `Family.tsx` — family messages
- `Travel.tsx` — travel
- `DressCode.tsx` — attire
- `RSVP.tsx` — RSVP
- `Wishes.tsx` — guest wishes
- `Hashtag.tsx` — sharing
- `Weather.tsx` — weather
- `Contact.tsx` — contacts
- `Closing.tsx` — closing section
- `FloatingControls.tsx` — floating UI

The page keeps shared interactive state in `app/page.tsx` so gallery, RSVP,
music and sharing continue to work together without changing the original behavior.
