// ============================================================
// WEATHER SECTION
// Purpose: Weather information
// ============================================================

export default function Weather({ children }: { children: React.ReactNode }) {
  return (
    <section id="weather" data-section="weather">
      {children}
    </section>
  );
}
