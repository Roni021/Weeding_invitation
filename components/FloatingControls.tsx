// ============================================================
// FLOATING CONTROLS
// Back-to-top, music and share controls live here.
// ============================================================

export default function FloatingControls({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div data-component="floating-controls">{children}</div>;
}
