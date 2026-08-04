import { useRef } from "react";
import { Link } from "react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ---------------- Module data ---------------- */

const MODULES = [
  {
    n: "01",
    id: "kyc",
    title: "KYC Onboarding",
    bullets: [
      "Document upload — CNPJ, export license PDF ≤10MB",
      "Sanctions + PEP screening on every principal and UBO",
      "24-hour approval SLA with tiered account limits",
      "Verification across 40+ jurisdictions",
    ],
    visual: {
      title: "KYC STATUS",
      rows: ["Identity verified", "Sanctions clear", "UBO confirmed"],
      status: "APPROVED · 18h 42m",
    },
  },
  {
    n: "02",
    id: "listing",
    title: "Listing & Inspection",
    bullets: [
      "Structured grade specs for all ten commodities",
      "Certificate vault with tamper-proof hashes",
      "Third-party inspection scheduling — SGS, Intertek",
      "AI price benchmark against 12 months of trades",
    ],
    visual: {
      title: "LISTING #A-2481",
      rows: ["Soybeans Non-GMO · 12,500 MT", "SGS inspection booked", "Benchmark +2.1% vs index"],
      status: "LIVE ON MARKETPLACE",
    },
  },
  {
    n: "03",
    id: "deal",
    title: "Deal Room",
    bullets: [
      "Real-time negotiation with full audit trail",
      "Offer / counter-offer versioning per round",
      "Contract generation from agreed terms",
      "E-signature valid in 40+ jurisdictions",
    ],
    visual: {
      title: "DEAL ROOM",
      rows: ["Buyer: counter-offer $486/MT", "Contract v3 signed by seller", "Escrow funded — 30% deposit"],
      status: "CONTRACT ACTIVE",
    },
  },
  {
    n: "04",
    id: "finance",
    title: "Trade Finance",
    bullets: [
      "Escrowed smart contracts protect both parties",
      "Letters of credit issued through partner banks",
      "Receivables advance up to 80% of contract value",
      "FX hedging on BRL, CNY, EUR and AED corridors",
    ],
    visual: {
      title: "FINANCE DESK",
      rows: ["LC confirmed — HSBC HK", "Advance: 70% of contract", "Hedge: USD/BRL 5.08 locked"],
      status: "FACILITY AVAILABLE",
    },
  },
  {
    n: "05",
    id: "logistics",
    title: "Logistics",
    bullets: [
      "Instant freight quotes across 156 ports",
      "Vessel booking with AIS tracking updates",
      "Document automation — B/L, phytosanitary, origin",
      "Corridor-optimized routing across 47 lanes",
    ],
    visual: {
      title: "SHIPMENT SS-1142",
      rows: ["MV Pacific Grain — Santos", "ETA Shanghai: 24 days", "Docs: 6/7 issued"],
      status: "IN TRANSIT",
    },
  },
  {
    n: "06",
    id: "ai",
    title: "AI Intelligence",
    bullets: [
      "Price forecasting per commodity and corridor",
      "Buyer matching on verified trade history",
      "Fraud anomaly detection on listings and payments",
      "Demand heatmaps from satellite and trade-flow data",
    ],
    visual: {
      title: "SIGNAL ENGINE",
      rows: ["Soy CFR China: bullish 7d", "Counterparty score: 94/100", "Freight index: −1.2% w/w"],
      status: "MODEL v4.2 LIVE",
    },
  },
];

/* ---------------- Module section ---------------- */

function ModuleSection({ m, flip }: { m: (typeof MODULES)[number]; flip: boolean }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".mod-panel",
        { clipPath: "inset(10% 10% 10% 10% round 16px)", y: 60 },
        {
          clipPath: "inset(0% 0% 0% 0% round 16px)",
          y: 0,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top 90%", end: "top 30%", scrub: true },
        }
      );
      gsap.fromTo(
        ".mod-bullet",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 80%" },
        }
      );
      gsap.fromTo(
        ".mod-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top 60%", end: "bottom 40%", scrub: true },
        }
      );
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative border-t border-hairline">
      <div className="mod-line absolute left-6 top-0 h-full w-px origin-top bg-gradient-to-b from-transparent via-gold/30 to-transparent md:left-12" />
      <div className={`content-wrap grid items-center gap-12 py-[72px] md:py-[120px] lg:grid-cols-2`}>
        <div className={flip ? "lg:order-2" : ""}>
          <p className="font-mono text-[0.85rem] text-gold">{m.n}</p>
          <h3 className="mt-3 font-display text-[clamp(1.8rem,3vw,2.6rem)] font-bold">{m.title}</h3>
          <ul className="mt-8 space-y-4">
            {m.bullets.map((b) => (
              <li key={b} className="mod-bullet flex items-start gap-3 text-ink-dim">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mod-panel rounded-2xl border border-hairline bg-elev p-6 will-change-transform">
          <div className="flex items-center justify-between border-b border-hairline pb-3">
            <span className="font-mono text-[0.75rem] tracking-[0.14em] text-ink-faint">{m.visual.title}</span>
            <span className="flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-alert/70" />
              <span className="h-2 w-2 rounded-full bg-gold/70" />
              <span className="h-2 w-2 rounded-full bg-harvest/70" />
            </span>
          </div>
          <div className="mt-5 space-y-3">
            {m.visual.rows.map((r) => (
              <div key={r} className="flex items-center gap-3 rounded-[10px] border border-hairline bg-panel px-4 py-3">
                <span className="h-1.5 w-1.5 rounded-full bg-harvest" />
                <span className="font-mono text-[0.8rem] text-ink-dim">{r}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 border-t border-hairline pt-3">
            <span className="font-mono text-[0.75rem] text-gold">{m.visual.status}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Architecture band ---------------- */

const ARCH = [
  { k: "AES-256", v: "encryption at rest" },
  { k: "SOC 2", v: "Type II controls" },
  { k: "99.9%", v: "uptime SLA" },
  { k: "LGPD/GDPR", v: "compliant by design" },
];

function ArchitectureBand() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.fromTo(
        ".arch-cell",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 80%" },
        }
      );
      gsap.fromTo(
        ".arch-img",
        { scale: 1 },
        {
          scale: 1.12,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        }
      );
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative overflow-hidden border-t border-hairline">
      <img
        src="/compliance-datacenter.jpg"
        alt=""
        aria-hidden
        className="arch-img absolute inset-0 h-full w-full object-cover opacity-20 will-change-transform"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy/70 to-navy" />
      <div className="content-wrap relative section-pad">
        <p className="kicker">/// ARCHITECTURE</p>
        <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.2rem)] font-bold text-white">
          Enterprise-grade by design.
        </h2>
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
          {ARCH.map((a) => (
            <div key={a.k} className="arch-cell bg-panel/90 p-8">
              <p className="font-mono text-2xl font-semibold text-gold">{a.k}</p>
              <p className="mt-2 text-sm text-ink-dim">{a.v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- API teaser ---------------- */

const CODE = `GET /v1/prices/soybeans_non_gmo

{
  "symbol": "SOY_NGMO_BR",
  "price": 482.50,
  "currency": "USD",
  "unit": "MT",
  "delta_24h_pct": +2.4,
  "corridor": "Santos → Shanghai",
  "timestamp": "2025-11-21T14:32:08Z"
}`;

function APITeaser() {
  const root = useRef<HTMLElement>(null);
  const codeRef = useRef<HTMLPreElement>(null);

  useGSAP(
    () => {
      const el = codeRef.current;
      if (!el) return;
      const obj = { i: 0 };
      gsap.to(obj, {
        i: CODE.length,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top 75%",
          end: "top 20%",
          scrub: true,
        },
        onUpdate: () => {
          el.textContent = CODE.slice(0, Math.round(obj.i));
        },
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="section-pad border-t border-hairline">
      <div className="content-wrap grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="kicker">/// INTEGRATION</p>
          <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.2rem)] font-bold">
            Plug the market into your stack.
          </h2>
          <p className="mt-4 max-w-lg text-ink-dim leading-relaxed">
            Stream prices, freight indices and settlement events through a REST API built for
            treasury and risk systems.
          </p>
          <a
            href="mailto:ggabbert@aggrowglobal.com?subject=API%20access%20request"
            className="mt-8 inline-flex items-center gap-2 rounded-[10px] border border-hairline px-6 py-3 font-medium text-ink transition-colors hover:border-gold hover:text-gold"
          >
            Request API access <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="overflow-hidden rounded-2xl border border-hairline bg-panel">
          <div className="flex items-center gap-2 border-b border-hairline px-5 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-alert/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-gold/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-harvest/70" />
            <span className="ml-3 font-mono text-[0.75rem] text-ink-faint">aggrow-api · bash</span>
          </div>
          <pre
            ref={codeRef}
            className="min-h-[300px] whitespace-pre-wrap p-6 font-mono text-[0.85rem] leading-relaxed text-harvest"
          />
        </div>
      </div>
    </section>
  );
}

/* ---------------- Page ---------------- */

export default function Platform() {
  const hero = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".pf-hero-word",
        { y: "110%" },
        { y: "0%", duration: 0.9, ease: "power3.out", stagger: 0.05 }
      );
      gsap.fromTo(".pf-hero-sub", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" });
      const paths = gsap.utils.toArray<SVGPathElement>(".grid-draw");
      paths.forEach((p) => {
        const len = p.getTotalLength();
        gsap.fromTo(
          p,
          { strokeDasharray: len, strokeDashoffset: len },
          { strokeDashoffset: 0, duration: 2, ease: "power2.out", delay: 0.3 }
        );
      });
    },
    { scope: hero }
  );

  const words = ["The", "Operating", "System", "for", "Global", "Agri-Trade."];

  return (
    <div>
      <section ref={hero} className="relative overflow-hidden">
        <svg
          className="pointer-events-none absolute right-0 top-1/2 hidden w-[520px] -translate-y-1/2 opacity-30 lg:block"
          viewBox="0 0 200 200"
          fill="none"
          aria-hidden
        >
          {[
            "M10 10 H90 V50 H10 Z",
            "M110 10 H190 V50 H110 Z",
            "M10 70 H90 V110 H10 Z",
            "M110 70 H190 V110 H110 Z",
            "M10 130 H90 V170 H10 Z",
            "M110 130 H190 V170 H110 Z",
            "M100 30 H110 M100 90 H110 M100 150 H110",
          ].map((d) => (
            <path key={d} className="grid-draw" d={d} stroke="#C9A227" strokeWidth="1" />
          ))}
        </svg>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,162,39,0.08),transparent_60%)]" />
        <div className="content-wrap relative py-[96px] md:py-[140px]">
          <p className="kicker">/// ONE INFRASTRUCTURE</p>
          <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.8rem,6vw,5rem)] font-bold leading-[1.05]">
            {words.map((w) => (
              <span key={w} className="mr-4 inline-block overflow-hidden align-top">
                <span className="pf-hero-word inline-block will-change-transform">{w}</span>
              </span>
            ))}
          </h1>
          <p className="pf-hero-sub mt-8 max-w-2xl text-lg leading-relaxed text-ink-dim">
            Six integrated modules replace brokers, spreadsheets, and wire-transfer risk.
          </p>
        </div>
      </section>

      {MODULES.map((m, i) => (
        <ModuleSection key={m.id} m={m} flip={i % 2 === 1} />
      ))}

      <ArchitectureBand />
      <APITeaser />

      <section className="relative border-t border-hairline bg-panel/40">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
        <div className="content-wrap section-pad text-center">
          <p className="kicker">/// GET STARTED</p>
          <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.2rem)] font-bold">
            See it with your own cargo.
          </h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/signup"
              className="rounded-[10px] bg-gold px-7 py-3.5 font-semibold text-navy transition-all hover:scale-[1.02] hover:bg-gold-soft hover:shadow-[0_0_24px_rgba(201,162,39,0.35)]"
            >
              Open Account
            </Link>
            <Link
              to="/signin"
              className="rounded-[10px] border border-hairline px-7 py-3.5 font-medium text-ink transition-colors hover:border-gold hover:text-gold"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
