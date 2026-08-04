import { useRef } from "react";
import { Link } from "react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function CTASection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.to(".cta-bg", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
      });
      gsap.fromTo(
        ".cta-word",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.9,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 80%" },
        }
      );
      gsap.fromTo(
        ".cta-btn",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 75%" },
        }
      );
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative isolate overflow-hidden border-t border-hairline">
      <div className="cta-bg absolute inset-0 -z-10 scale-110">
        <img
          src="/hero-grain-terminal.jpg"
          alt="Grain export terminal at the Port of Santos"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-navy/80" />
      </div>

      <div className="content-wrap flex flex-col items-center py-24 text-center md:py-32">
        <h2 className="font-display text-[clamp(2.4rem,5vw,4rem)] font-bold text-white">
          {["Ready", "to", "Trade?"].map((w) => (
            <span key={w} className="inline-block overflow-hidden pb-1 align-top">
              <span className="cta-word inline-block">{w}&nbsp;</span>
            </span>
          ))}
        </h2>
        <p className="mt-4 max-w-xl text-white/80">
          Open your institutional account today — verification in under 24 hours.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            to="/signup?role=producer"
            className="cta-btn rounded-[10px] bg-gold px-7 py-3.5 font-semibold text-navy transition-all hover:scale-[1.02] hover:bg-gold-soft hover:shadow-[0_0_36px_rgba(201,162,39,0.45)]"
          >
            Sign Up as Producer
          </Link>
          <Link
            to="/signup?role=buyer"
            className="cta-btn rounded-[10px] bg-gold px-7 py-3.5 font-semibold text-navy transition-all hover:scale-[1.02] hover:bg-gold-soft hover:shadow-[0_0_36px_rgba(201,162,39,0.45)]"
          >
            Sign Up as Buyer
          </Link>
          <a
            href="mailto:ggabbert@aggrowglobal.com"
            className="cta-btn rounded-[10px] border border-white/40 px-7 py-3.5 font-medium text-white transition-colors hover:border-gold hover:text-gold-soft"
          >
            Talk to our desk
          </a>
        </div>
      </div>
    </section>
  );
}
