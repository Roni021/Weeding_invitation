// ============================================================
// GALLERY SECTION
// Purpose: Gallery and lightbox
// ============================================================

export default function Gallery({ children }: { children: React.ReactNode }) {
  return (
    <section id="gallery" data-section="gallery">
      {children}
    </section>
  );
}
