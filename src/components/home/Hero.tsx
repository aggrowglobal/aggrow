import { useRef } from "react";
import { Link } from "react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STATS = [
  { value: 2.4, prefix: "$", suffix: "B+", label: "trade volume", decimals: 1 },
  { value: 47, prefix: "", suffix: "", label: "trade corridors", decimals: 0 },
  { value: 156, prefix: "", suffix: "", label: "ports connected", decimals: 0 },
  { value: 24, prefix: "", suffix: "h", label: "KYC verification", decimals: 0 },
];

const HEADLINE = ["The", "Premier", "Digital", "Infrastructure", "for", "Global", "Agri-Trade."];

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".hero-word",
        { yPercent: 110 },
        { yPercent: 0, duration: 1, ease: "power3.out", stagger: 0.06, delay: 0.2 }
      );
      gsap.fromTo(
        ".hero-fade",
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.1, delay: 0.7 }
      );
      gsap.to(".hero-bg", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.fromTo(".hero-bg img", { scale: 1 }, { scale: 1.06, duration: 30, ease: "none" });
      root.current?.querySelectorAll<HTMLElement>(".hero-stat-num").forEach((el, i) => {
        const s = STATS[i];
        const obj = { v: 0 };
        gsap.to(obj, {
          v: s.value,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
          onUpdate: () => {
            el.textContent = `${s.prefix}${obj.v.toFixed(s.decimals)}${s.suffix}`;
          },
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative isolate overflow-hidden">
      <div className="hero-bg absolute inset-0 -z-10">
        <img
          src="/hero-aerial-farm.jpg"
          alt="Aerial view of Brazilian soybean fields at golden hour"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/60 to-navy" />
        <div className="absolute -left-40 -top-40 h-[560px] w-[560px] rounded-full bg-gold/[0.08] blur-[120px]" />
      </div>

      <div className="content-wrap flex min-h-[calc(100dvh-72px-96px)] flex-col justify-center py-24">
        <p className="kicker hero-fade">/// INSTITUTIONAL GRADE COMMODITY TRADING</p>
        <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.8rem,6vw,5rem)] font-bold leading-[1.05] text-white">
          {HEADLINE.map((w) => (
            <span key={w} className="inline-block overflow-hidden pb-1 align-top">
              <span className="hero-word inline-block">{w}&nbsp;</span>
            </span>
          ))}
        </h1>
        <p className="hero-fade mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
          Connecting Brazilian agricultural producers directly with international buyers —
          verified, financed, and delivered.
        </p>
        <div className="hero-fade mt-10 flex flex-wrap gap-4">
          <Link
            to="/signup"
            className="rounded-[10px] bg-gold px-7 py-3.5 font-semibold text-navy transition-all hover:scale-[1.02] hover:bg-gold-soft hover:shadow-[0_0_32px_rgba(201,162,39,0.4)]"
          >
            Open Account
          </Link>
          <Link
            to="/marketplace"
            className="rounded-[10px] border border-white/40 px-7 py-3.5 font-medium text-white transition-colors hover:border-gold hover:text-gold-soft"
          >
            Explore the Marketplace
          </Link>
        </div>

        <div className="hero-fade mt-16 grid grid-cols-2 divide-white/20 border-y border-white/20 md:grid-cols-4 md:divide-x">
          {STATS.map((s) => (
            <div key={s.label} className="px-6 py-6">
              <div className="hero-stat-num font-mono text-3xl font-semibold text-gold md:text-4xl">
                {s.prefix}0{s.suffix}
              </div>
              <div className="caption-label mt-2 text-white/60">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
