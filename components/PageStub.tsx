import type { ReactNode } from "react";

export default function PageStub({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <section className="content-wrap section-pad">
      <p className="kicker">/// {kicker}</p>
      <h1 className="mt-4 font-display text-[clamp(2rem,4vw,3.2rem)] font-bold">{title}</h1>
      <div className="mt-6 text-ink-dim">{children ?? <p>Content coming soon.</p>}</div>
    </section>
  );
}
