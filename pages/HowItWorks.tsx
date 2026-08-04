import { useRef } from "react";
import { Link } from "react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  FileCheck,
  ScanSearch,
  Signature,
  ShieldCheck,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ---------------- Step data + visuals ---------------- */

const STEPS = [
  {
    n: "01",
    title: "Sign Up",
    desc: "KYC/KYB verification with document upload, sanctions screening and approval in under 24 hours.",
    bullets: [
      "CNPJ validation with automatic checksum",
      "Sanctions & PEP screening on every principal",
      "Export license PDF reviewed within 24h",
    ],
  },
  {
    n: "02",
    title: "List Product",
    desc: "Structured grade specs, certificates and photos. AI suggests a price from live market data.",
    bullets: [
      "Structured specs: grade, moisture, protein, volume",
      "Certificate vault with tamper-proof hashes",
      "AI price benchmark against 12 months of trades",
    ],
  },
  {
    n: "03",
    title: "Match Buyer",
    desc: "The matching engine scans 47 trade corridors. Counterparties see verified profiles only.",
    bullets: [
      "Matching across 47 corridors and 156 ports",
      "Counterparty risk scores in real time",
      "Verified profiles only — no anonymous deals",
    ],
  },
  {
    n: "04",
    title: "Sign Contract",
    desc: "Escrowed smart contract — funds locked, both parties protected from default.",
    bullets: [
      "Offer / counter-offer versioning with audit trail",
      "E-signature with legal validity in 40+ jurisdictions",
      "Escrow locks buyer funds at signature",
    ],
  },
  {
    n: "05",
    title: "Ship & Inspect",
    desc: "SGS / Intertek inspection at load port. Documents committed on-chain.",
    bullets: [
      "Third-party inspection at origin and load port",
      "B/L, phytosanitary and origin certificates automated",
      "AIS vessel tracking with live position updates",
    ],
  },
  {
    n: "06",
    title: "Get Paid",
    desc: "Settlement in days via trade finance rails. FX handled on your corridor.",
    bullets: [
      "Settlement in days, not months",
      "FX hedging on BRL, CNY, EUR and AED corridors",
      "Receivables advance up to 80% of contract value",
    ],
  },
];

function StepVisual({ index }: { index: number }) {
  const shell = "rounded-2xl border border-hairline bg-elev p-6 shadow-[0_30px_80px_-30px_rgba(11,31,58,0.18)]";
  if (index === 0)
    return (
      <div className={shell}>
        <div className="flex items-center justify-between border-b border-hairline pb-3">
          <span className="font-mono text-[0.75rem] tracking-[0.14em] text-ink-faint">ONBOARDING — PRODUCER</span>
          <ShieldCheck className="h-4 w-4 text-gold" />
        </div>
        <div className="mt-5 space-y-3">
          {["Company name", "CNPJ 12.345.678/0001-90", "Export license.pdf · 2.1 MB"].map((f) => (
            <div key={f} className="rounded-[10px] border border-hairline bg-panel px-4 py-3 font-mono text-[0.8rem] text-ink-dim">
              {f}
            </div>
          ))}
          <div className="flex items-center justify-between rounded-[10px] border border-gold/40 bg-gold/10 px-4 py-3">
            <span className="font-mono text-[0.75rem] text-gold">SANCTIONS SCREEN</span>
            <span className="font-mono text-[0.75rem] text-harvest">CLEAR</span>
          </div>
        </div>
      </div>
    );
  if (index === 1)
    return (
      <div className={shell}>
        <div className="flex items-center justify-between border-b border-hairline pb-3">
          <span className="font-mono text-[0.75rem] tracking-[0.14em] text-ink-faint">LISTING #A-2481</span>
          <FileCheck className="h-4 w-4 text-gold" />
        </div>
        <div className="mt-5 space-y-3">
          {["Soybeans Non-GMO · 12,500 MT", "Grade 2 · Moisture 12.5%", "SGS certificate attached"].map((f) => (
            <div key={f} className="rounded-[10px] border border-hairline bg-panel px-4 py-3 font-mono text-[0.8rem] text-ink-dim">
              {f}
            </div>
          ))}
          <div className="flex items-center justify-between rounded-[10px] border border-gold/40 bg-gold/10 px-4 py-3">
            <span className="font-mono text-[0.75rem] text-gold">AI SUGGESTED PRICE</span>
            <span className="font-mono text-[0.85rem] text-gold-soft">$482.50/MT ▲2.4%</span>
          </div>
        </div>
      </div>
    );
  if (index === 2)
    return (
      <div className="rounded-2xl border border-hairline bg-elev p-4 shadow-[0_30px_80px_-30px_rgba(11,31,58,0.18)]">
        <div className="flex items-center justify-between px-2 pb-3 pt-1">
          <span className="font-mono text-[0.75rem] tracking-[0.14em] text-ink-faint">MATCH ENGINE — 47 CORRIDORS</span>
          <ScanSearch className="h-4 w-4 text-gold" />
        </div>
        <img src="/corridor-map.svg" alt="Trade corridors from Brazilian ports to Shanghai, Rotterdam, Dubai and Mumbai" className="w-full rounded-xl" />
      </div>
    );
  if (index === 3)
    return (
      <div className={shell}>
        <div className="flex items-center justify-between border-b border-hairline pb-3">
          <span className="font-mono text-[0.75rem] tracking-[0.14em] text-ink-faint">CONTRACT C-3390 · v3</span>
          <Signature className="h-4 w-4 text-gold" />
        </div>
        <div className="mt-5 space-y-4">
          <div className="flex justify-between font-mono text-[0.8rem] text-ink-dim">
            <span>12,500 MT · CFR Shanghai</span>
            <span className="text-gold">$6.03M</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[0.8rem]">
              <span className="text-ink-dim">Seller signature</span>
              <span className="font-mono text-harvest">SIGNED</span>
            </div>
            <div className="flex items-center justify-between text-[0.8rem]">
              <span className="text-ink-dim">Buyer signature</span>
              <span className="font-mono text-harvest">SIGNED</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-panel">
              <div className="h-full w-full rounded-full bg-gradient-to-r from-gold to-gold-soft" />
            </div>
          </div>
          <div className="rounded-[10px] border border-gold/40 bg-gold/10 px-4 py-3 font-mono text-[0.75rem] text-gold">
            ESCROW FUNDED — 30% DEPOSIT LOCKED
          </div>
        </div>
      </div>
    );
  return (
    <div className="overflow-hidden rounded-2xl border border-hairline shadow-[0_30px_80px_-30px_rgba(11,31,58,0.18)]">
      <img
        src={index === 4 ? "/buyer-inspection.jpg" : "/hero-grain-terminal.jpg"}
        alt={index === 4 ? "Quality inspector examining grain samples at a port silo" : "Grain export terminal at Port of Santos at dusk"}
        className="aspect-[16/10] w-full object-cover"
      />
      <div className="flex items-center justify-between border-t border-hairline bg-elev px-5 py-3">
        <span className="font-mono text-[0.75rem] text-ink-faint">
          {index === 4 ? "SGS INSPECTION — SANTOS" : "SETTLEMENT — T+4 DAYS"}
        </span>
        <span className="font-mono text-[0.75rem] text-harvest">{index === 4 ? "PASSED" : "CONFIRMED"}</span>
      </div>
    </div>
  );
}

/* ---------------- Pinned journey ---------------- */

function StepJourney() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const rows = gsap.utils.toArray<HTMLElement>(".journey-row");
      rows.forEach((row, i) => {
        const img = row.querySelector(".journey-visual");
        const text = row.querySelector(".journey-text");
        gsap.fromTo(
          img,
          { clipPath: "inset(12% 12% 12% 12% round 16px)", y: 40 },
          {
            clipPath: "inset(0% 0% 0% 0% round 16px)",
            y: 0,
            ease: "none",
            scrollTrigger: { trigger: row, start: "top 90%", end: "top 35%", scrub: true },
          }
        );
        gsap.fromTo(
          text,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 80%" },
          }
        );

        ScrollTrigger.create({
          trigger: row,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => {
            if (self.isActive) {
              gsap.to(".rail-line", { scaleY: (i + 1) / STEPS.length, duration: 0.4, ease: "power2.out" });
              document.querySelectorAll<HTMLElement>(".rail-step").forEach((el, j) => {
                el.classList.toggle("text-gold", j === i);
                el.classList.toggle("border-gold", j === i);
                el.classList.toggle("text-ink-faint", j !== i);
                el.classList.toggle("border-hairline", j !== i);
              });
            }
          },
        });
      });
      gsap.set(".rail-step", { borderColor: "#E8E8E8" });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative border-t border-hairline">
      <div className="content-wrap grid gap-10 py-[72px] md:py-[120px] lg:grid-cols-[120px_1fr]">
        {/* Left rail */}
        <div className="relative hidden lg:block">
          <div className="sticky top-28 flex flex-col items-start gap-6 self-start">
            <div className="absolute bottom-2 left-[21px] top-2 w-px bg-hairline" />
            <div className="rail-line absolute bottom-2 left-[21px] top-2 w-px origin-top bg-gold" style={{ transform: "scaleY(0.166)" }} />
            {STEPS.map((s, i) => (
              <div key={s.n} className="relative z-10 flex items-center gap-3">
                <span
                  className={`rail-step flex h-[43px] w-[43px] items-center justify-center rounded-full border bg-abyss font-mono text-[0.75rem] transition-colors ${
                    i === 0 ? "border-gold text-gold" : "border-hairline text-ink-faint"
                  }`}
                >
                  {s.n}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-[72px] md:space-y-[120px]">
          {STEPS.map((s, i) => (
            <div
              key={s.n}
              className={`journey-row grid items-center gap-10 lg:grid-cols-2 ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}
            >
              <div className="journey-text">
                <p className="kicker">/// STEP {s.n}</p>
                <h3 className="mt-4 font-display text-[clamp(1.8rem,3vw,2.6rem)] font-bold leading-tight">
                  {s.title}
                </h3>
                <p className="mt-4 text-ink-dim leading-relaxed">{s.desc}</p>
                <ul className="mt-6 space-y-3">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm text-ink-dim">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="journey-visual will-change-transform">
                <StepVisual index={i} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Timeline comparison ---------------- */

function TimelineComparison() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".tl-bar").forEach((bar) => {
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { trigger: bar, start: "top 90%", end: "top 45%", scrub: true },
          }
        );
      });
      gsap.utils.toArray<HTMLElement>(".tl-days").forEach((el) => {
        const target = Number(el.dataset.days || 0);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
          onUpdate: () => {
            el.textContent = String(Math.round(obj.v));
          },
        });
      });
    },
    { scope: root }
  );

  const trad = [
    { label: "Sourcing", days: 18, w: "38%" },
    { label: "Negotiation", days: 12, w: "26%" },
    { label: "Documents", days: 10, w: "21%" },
    { label: "Finance", days: 7, w: "15%" },
  ];
  const agg = [
    { label: "Onboard", days: 2, w: "22%" },
    { label: "Match", days: 2, w: "22%" },
    { label: "Contract", days: 1, w: "12%" },
    { label: "Settle", days: 4, w: "44%" },
  ];

  return (
    <section ref={root} className="section-pad border-t border-hairline bg-panel/40">
      <div className="content-wrap">
        <p className="kicker">/// TIME TO SETTLEMENT</p>
        <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.2rem)] font-bold">
          47 days becomes 9.
        </h2>

        <div className="mt-14 space-y-10">
          <div>
            <div className="mb-3 flex items-baseline justify-between">
              <span className="text-sm font-medium text-ink-dim">Traditional trade</span>
              <span className="font-mono text-2xl font-semibold text-alert">
                <span className="tl-days" data-days={47}>0</span> days
              </span>
            </div>
            <div className="flex h-14 origin-left overflow-hidden rounded-xl border border-hairline">
              {trad.map((s) => (
                <div
                  key={s.label}
                  className="tl-bar flex origin-left flex-col justify-center border-r border-abyss/60 bg-alert/25 px-3"
                  style={{ width: s.w }}
                >
                  <span className="text-[0.7rem] uppercase tracking-wider text-ink-dim">{s.label}</span>
                  <span className="font-mono text-[0.8rem] text-alert">{s.days}d</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-baseline justify-between">
              <span className="text-sm font-medium text-gold">AGGROW Global</span>
              <span className="font-mono text-2xl font-semibold text-gold">
                <span className="tl-days" data-days={9}>0</span> days
              </span>
            </div>
            <div className="flex h-14 w-[45%] min-w-[280px] origin-left overflow-hidden rounded-xl border border-gold/40">
              {agg.map((s) => (
                <div
                  key={s.label}
                  className="tl-bar flex origin-left flex-col justify-center border-r border-abyss/60 bg-gold/20 px-3"
                  style={{ width: s.w }}
                >
                  <span className="text-[0.7rem] uppercase tracking-wider text-ink-dim">{s.label}</span>
                  <span className="font-mono text-[0.8rem] text-gold">{s.days}d</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */

const FAQS = [
  { q: "Who can join?", a: "Verified Brazilian producers and cooperatives on the sell side; verified international buyers, traders and processors on the buy side. Every account passes corporate KYC/KYB before trading." },
  { q: "How does escrow work?", a: "At contract signature the buyer's funds are locked into an escrowed smart contract. Funds are released to the seller only after inspection-confirmed delivery at the destination or load port, per contract terms." },
  { q: "What documents do I need?", a: "Producers: CNPJ, export/sanitary license (PDF ≤10MB) and bank details. Buyers: business registration, import license and a bank reference. All documents are reviewed within 24 hours." },
  { q: "How are prices set?", a: "Prices are negotiated directly between counterparties in the Deal Room. Our AI provides a benchmark suggestion per listing from 12 months of comparable trades and live market data — the final price is always yours." },
  { q: "Which incoterms are supported?", a: "FOB, CFR, CIF, FCA and EXW are supported natively, with freight, insurance and documentation automated per incoterm. Other terms can be handled via our logistics desk." },
  { q: "How do I get paid?", a: "Settlement lands in days via our trade finance rails in USD, BRL, EUR, CNY or AED. Receivables advances of up to 80% of contract value are available from contract signature." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="section-pad border-t border-hairline">
      <div className="content-wrap grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="kicker">/// QUESTIONS</p>
          <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.2rem)] font-bold">
            Frequently asked.
          </h2>
          <p className="mt-4 text-ink-dim">
            Everything else — <a href="mailto:ggabbert@aggrowglobal.com" className="text-gold hover:text-gold-soft">ggabbert@aggrowglobal.com</a>
          </p>
        </div>
        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <motion.div
              key={f.q}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden rounded-2xl border border-hairline bg-panel"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-medium">{f.q}</span>
                <motion.span animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.25 }}>
                  <ChevronDown className={`h-5 w-5 ${open === i ? "text-gold" : "text-ink-faint"}`} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className="px-6 pb-5 text-sm leading-relaxed text-ink-dim">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Page ---------------- */

export default function HowItWorks() {
  const hero = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".hiw-hero-word",
        { y: "110%" },
        { y: "0%", duration: 0.9, ease: "power3.out", stagger: 0.05 }
      );
      gsap.fromTo(".hiw-hero-sub", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" });
    },
    { scope: hero }
  );

  const words = ["Six", "Steps", "From", "Farm", "Gate", "to", "Foreign", "Port."];

  return (
    <div>
      <section ref={hero} className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,162,39,0.08),transparent_60%)]" />
        <div className="content-wrap py-[96px] md:py-[140px]">
          <p className="kicker">/// THE TRADE LIFECYCLE</p>
          <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.8rem,6vw,5rem)] font-bold leading-[1.05]">
            {words.map((w) => (
              <span key={w} className="mr-4 inline-block overflow-hidden align-top">
                <span className="hiw-hero-word inline-block will-change-transform">{w}</span>
              </span>
            ))}
          </h1>
          <p className="hiw-hero-sub mt-8 max-w-2xl text-lg leading-relaxed text-ink-dim">
            One platform handles verification, contracts, finance, freight, and settlement.
          </p>
        </div>
      </section>

      <StepJourney />
      <TimelineComparison />
      <FAQ />

      <section className="relative border-t border-hairline bg-panel/40">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
        <div className="content-wrap section-pad text-center">
          <p className="kicker">/// GET STARTED</p>
          <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.2rem)] font-bold">
            Start step one today.
          </h2>
          <Link
            to="/signup"
            className="mt-10 inline-flex items-center gap-2 rounded-[10px] bg-gold px-7 py-3.5 font-semibold text-navy transition-all hover:scale-[1.02] hover:bg-gold-soft hover:shadow-[0_0_24px_rgba(201,162,39,0.35)]"
          >
            Open Account <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
