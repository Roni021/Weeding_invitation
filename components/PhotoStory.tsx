// ============================================================
// PHOTO STORY SECTION
// Purpose: Full-width photo storytelling
// ============================================================

export default function PhotoStory({ children }: { children: React.ReactNode }) {
  return (
    <section id="photostory" data-section="photostory">
      {children}
    </section>
  );
}
