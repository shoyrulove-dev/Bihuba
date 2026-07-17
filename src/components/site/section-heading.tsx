export function SectionHeading({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-700">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
        {title}
      </h2>
      {body ? <p className="mt-4 text-base leading-8 text-slate-600 md:text-lg">{body}</p> : null}
    </div>
  );
}
