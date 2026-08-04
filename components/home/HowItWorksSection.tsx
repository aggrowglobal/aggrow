import { useRef } from "react";
import { Link } from "react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STEPS = [
  { n: "01", title: "Sign Up", desc: "KYC-verified onboarding in 24h." },
  { n: "02", title: "List Product", desc: "Specs, volume, certificates, AI-assisted pricing." },
  { n: "03", title: "Match Buyer", desc: "AI matching across 47 trade corridors." },
  { n: "04", title: "Sign Contract", desc: "Escrowed smart contract — both parties protected." },
  { n: "05", title: "Ship & Inspect", desc: "Third-party inspection at load port." },
  { n: "06", title: "Get Paid", desc: "Settlement in days, not months." },
];

export default function HowItWorksSection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".hiw-card");
      cards.forEach((c, i) => {
        if (i > 0) gsap.set(c, { opacity: 0.4 });
      });

      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "+=180%",
        pin: ".hiw-pin",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress * (STEPS.length - 0.001);
          const active = Math.floor(progress);
          cards.forEach((c, i) => {
            const isActive = i <= active;
            gsap.to(c, { opacity: isActive ? 1 : 0.4, duration: 0.3, overwrite: "auto" });
            c.classList.toggle("border-gold", i === active);
            c.classList.toggle("border-hairline", i !== active);
            const num = c.querySelector(".hiw-num");
            if (num) {
              num.classList.toggle("text-gold", i === active);
              num.classList.toggle("text-ink-faint", i !== active);
            }
          });
          gsap.set(".hiw-line", { scaleY: self.progress });
        },
      });

      gsap.fromTo(
        ".hiw-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: (i) => (i === 0 ? 1 : 0.4),
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 85%" },
        }
      );
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative border-t border-hairline bg-panel/40">
      <div className="hiw-pin content-wrap grid gap-12 py-[72px] md:py-[120px] lg:grid-cols-[1fr_1.2fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="kicker">/// HOW IT WORKS</p>
          <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.2rem)] font-bold leading-tight">
            From farm gate to foreign port in six steps.
          </h2>
          <Link
            to="/how-it-works"
            className="mt-8 inline-flex items-center gap-2 font-medium text-gold transition-colors hover:text-gold-soft"
          >
            See the full process <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="relative pl-8">
          <div className="absolute left-0 top-0 h-full w-px bg-hairline" />
          <div className="hiw-line absolute left-0 top-0 h-full w-px origin-top bg-gold" style={{ transform: "scaleY(0)" }} />
          <div className="space-y-5">
            {STEPS.map((s) => (
              <div
                key={s.n}
                className="hiw-card rounded-2xl border border-hairline bg-panel p-6 transition-colors"
              >
                <div className="flex items-baseline gap-4">
                  <span className="hiw-num font-mono text-2xl font-semibold text-ink-faint">{s.n}</span>
                  <div>
                    <h3 className="font-display text-[1.35rem] font-semibold">{s.title}</h3>
                    <p className="mt-1 text-sm text-ink-dim">{s.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
