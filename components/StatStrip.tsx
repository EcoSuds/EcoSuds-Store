export function StatStrip({ items }: { items: { value: string; label: string }[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {items.map((item) => (
        <div key={item.value} className="surface rounded-[1.6rem] p-5">
          <div className="font-display text-3xl font-black text-[color:var(--sage-strong)]">{item.value}</div>
          <p className="mt-2 text-sm font-bold leading-6 text-[color:var(--muted)]">{item.label}</p>
        </div>
      ))}
    </div>
  );
}
