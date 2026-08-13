// ============================================================
// SECTION HEADING
// Reusable heading used across the invitation sections.
// ============================================================

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <>
      {eyebrow && <p className="eyebrow center reveal">{eyebrow}</p>}
      <h2 className="section-title reveal">{title}</h2>
      {subtitle && <p className="section-sub reveal">{subtitle}</p>}
    </>
  );
}
