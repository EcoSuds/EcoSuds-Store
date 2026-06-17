export function SectionHeader({ eyebrow, title, description, align = "left" }: { eyebrow: string; title: string; description?: string; align?: "left" | "center" }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="h2 mt-5 font-display text-[color:var(--text)]">{title}</h2>
      {description ? <p className="lead mt-5">{description}</p> : null}
    </div>
  );
}
