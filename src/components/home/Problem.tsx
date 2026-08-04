import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { XCircle, TrendingDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const PRODUCER_POINTS = [
  "Middlemen take 20–30% discounts off farm-gate value",
  "60–90 day payment delays after delivery",
  "Zero price transparency on international markets",
  "Crushing export paperwork and compliance burden",
];

const BUYER_POINTS = [
  "Months to find verified, reliable suppliers",
  "No quality visibility before shipment",
  "Fraud & default risk on six-figure contracts",
  "Opaque freight pricing erodes margins",
];

export default function Problem() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".problem-left",
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: root.current, start: "top 80%" } }
      );
      gsap.fromTo(
        ".problem-right",
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: root.current, start: "top 80%" } }
      );
      gsap.fromTo(
        ".problem-item",
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: root.current, start: "top 75%" } }
      );
      gsap.fromTo(
        ".problem-underline",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: "power2.out", transformOrigin: "left", scrollTrigger: { trigger: root.current, start: "top 70%" } }
      );
    },
    { scope: root }
  );

  return (
    <section ref={root} className="section-pad">
      <div className="content-wrap">
        <p className="kicker">/// THE PROBLEM</p>
        <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-0">
          <div className="problem-left lg:pr-12">
            <h2 className="font-display text-[clamp(1.6rem,2.6vw,2.2rem)] font-bold leading-snug">
              Producers lose up to{" "}
              <span className="relative inline-block text-harvest">
                25% of revenue
                <span className="problem-underline absolute -bottom-1 left-0 h-[3px] w-full bg-harvest" />
              </span>{" "}
              before the port.
            </h2>
            <ul className="mt-8 space-y-4">
              {PRODUCER_POINTS.map((p) => (
                <li key={p} className="problem-item flex items-start gap-3 text-ink-dim">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-alert" />
                  <span>{p}</span>
                </li>
              ))}
              <li className="problem-item flex items-start gap-3">
                <TrendingDown className="mt-0.5 h-5 w-5 shrink-0 text-alert" />
                <span className="font-mono text-xl font-semibold text-alert">−25% revenue loss</span>
              </li>
            </ul>
          </div>

          <div className="problem-right border-t border-hairline pt-12 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            <h2 className="font-display text-[clamp(1.6rem,2.6vw,2.2rem)] font-bold leading-snug">
              Sourcing from Brazil takes{" "}
              <span className="relative inline-block text-gold">
                months — and trust.
                <span className="problem-underline absolute -bottom-1 left-0 h-[3px] w-full bg-gold" />
              </span>
            </h2>
            <ul className="mt-8 space-y-4">
              {BUYER_POINTS.map((p) => (
                <li key={p} className="problem-item flex items-start gap-3 text-ink-dim">
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-alert" />
                  <span>{p}</span>
                </li>
              ))}
              <li className="problem-item flex items-start gap-3">
                <TrendingDown className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <span className="font-mono text-xl font-semibold text-gold">47-day average deal time</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
