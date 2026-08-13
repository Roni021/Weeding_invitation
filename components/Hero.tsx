// ============================================================
// HERO SECTION
// Purpose: Hero / intro visual
// ============================================================

export default function Hero({ children }: { children: React.ReactNode }) {
  return (
    <section id="hero" data-section="hero">
      {children}
    </section>
  );
}
