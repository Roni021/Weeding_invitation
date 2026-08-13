// ============================================================
// COUNTDOWN SECTION
// Purpose: Wedding countdown
// ============================================================

export default function Countdown({ children }: { children: React.ReactNode }) {
  return (
    <section id="countdown" data-section="countdown">
      {children}
    </section>
  );
}
