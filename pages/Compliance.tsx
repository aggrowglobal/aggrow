import { useRef } from "react";
import { Link } from "react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ArrowRight,
  Award,
  FileCheck2,
  Landmark,
  Lock,
  Mail,
  Radar,
  ShieldCheck,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* ---------------- Six pillars ---------------- */

const PILLARS = [
  {
    icon: ShieldCheck,
    title: "Sanctions Screening",
    desc: "OFAC, EU and UN lists screened at onboarding and re-screened on every transaction.",
    points: ["OFAC SDN + consolidated lists", "EU and UN sanctions regimes", "Real-time re-screening per deal"],
  },
  {
    icon: FileCheck2,
    title: "KYC / KYB Verification",
    desc: "CNPJ validation, beneficial-ownership checks and export license verification (PDF review ≤24h).",
    points: ["CNPJ checksum + registry lookup", "UBO identification to natural person", "Export license review within 24h"],
  },
  {
    icon: Lock,
    title: "End-to-End Encryption",
    desc: "AES-256 at rest, TLS 1.3 in transit, HSM-managed keys with strict rotation policy.",
    points: ["AES-256 storage encryption", "TLS 1.3 for all connections", "HSM key management + rotation"],
  },
  {
    icon: Landmark,
    title: "Customs Integration",
    desc: "Direct integration with Brazilian customs (Siscomex) and destination authorities.",
    points: ["Siscomex export declarations", "Destination authority e-filing", "Automated phytosanitary routing"],
  },
  {
    icon: Radar,
    title: "Fraud Detection AI",
    desc: "Anomaly scoring on listings, documents and payment behavior, with a manual review queue.",
    points: ["Document forgery detection", "Behavioral anomaly scoring", "Human review on every flag"],
  },
  {
    icon: Award,
    title: "Smart Contract Escrow",
    desc: "Funds locked on-chain; released only on inspection-confirmed delivery.",
    points: ["Funds locked at signature", "Release tied to inspection proof", "Immutable settlement audit trail"],
  },
];

function Pillars() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.fromTo(
        ".pillar-card",
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
      gsap.utils.toArray<SVGSVGElement>(".pillar-icon").forEach((svg) => {
        const strokes = svg.querySelectorAll("path, circle, line, polyline, rect");
        gsap.fromTo(
          strokes,
          { strokeDasharray: 60, strokeDashoffset: 60 },
          {
            strokeDashoffset: 0,
            duration: 1.4,
            ease: "power2.out",
            scrollTrigger: { trigger: svg, start: "top 85%" },
          }
        );
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="section-pad border-t border-hairline">
      <div className="content-wrap">
        <p className="kicker">/// SIX PILLARS</p>
        <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.2rem)] font-bold">
          Trust, engineered layer by layer.
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {PILLARS.map((p) => (
            <div
              key={p.title}
              className="pillar-card card-hover rounded-2xl border border-hairline bg-panel p-8"
            >
              <p.icon className="pillar-icon h-8 w-8 text-gold" strokeWidth={1.5} />
              <h3 className="mt-5 font-display text-[1.35rem] font-semibold">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-dim">{p.desc}</p>
              <ul className="mt-5 space-y-2">
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-3 text-[0.85rem] text-ink-dim">
                    <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Certifications ---------------- */

const CERTS = ["SOC 2 Type II", "ISO 27001", "LGPD", "GDPR", "GAFTA Member"];

function Certifications() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.fromTo(
        ".cert-badge",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 85%" },
        }
      );
    },
    { scope: root }
  );

  return (
    <section ref={root} className="border-t border-hairline bg-panel/40">
      <div className="content-wrap flex flex-wrap items-center justify-center gap-4 py-14 md:gap-6">
        {CERTS.map((c) => (
          <span
            key={c}
            className="cert-badge rounded-full border border-hairline px-6 py-3 font-mono text-[0.8rem] tracking-[0.1em] text-ink-faint grayscale transition-all duration-300 hover:border-gold/60 hover:text-gold hover:grayscale-0"
          >
            {c}
          </span>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Security numbers ---------------- */

const STATS = [
  { value: 0, prefix: "", suffix: "", label: "fraud losses to date" },
  { value: 100, prefix: "", suffix: "%", label: "escrowed contracts" },
  { value: 24, prefix: "<", suffix: "h", label: "KYC approval SLA" },
  { value: 99.9, prefix: "", suffix: "%", label: "platform uptime", decimals: 1 },
];

function SecurityNumbers() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
        const target = Number(el.dataset.value || 0);
        const decimals = Number(el.dataset.decimals || 0);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
          onUpdate: () => {
            el.textContent = obj.v.toFixed(decimals);
          },
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="section-pad border-t border-hairline">
      <div className="content-wrap">
        <p className="kicker">/// BY THE NUMBERS</p>
        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-panel p-8 text-center">
              <p className="font-mono text-4xl font-semibold text-gold">
                {s.prefix}
                <span className="stat-num" data-value={s.value} data-decimals={s.decimals || 0}>
                  0
                </span>
                {s.suffix}
              </p>
              <p className="mt-3 text-sm text-ink-dim">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Document requirements ---------------- */

const DOCS = [
  { role: "Producer", docs: ["CNPJ (validated against federal registry)", "Export / sanitary license — PDF ≤10MB", "Bank details for settlement"] },
  { role: "Buyer", docs: ["Business registration certificate", "Import license for destination market", "Bank reference letter"] },
];

function DocumentRequirements() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      gsap.fromTo(
        ".doc-row",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 80%" },
        }
      );
    },
    { scope: root }
  );

  return (
    <section ref={root} className="section-pad border-t border-hairline bg-panel/40">
      <div className="content-wrap grid gap-12 lg:grid-cols-[1fr_1.5fr]">
        <div>
          <p className="kicker">/// ONBOARDING DOCUMENTS</p>
          <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.2rem)] font-bold">
            What you'll need.
          </h2>
          <p className="mt-4 text-ink-dim leading-relaxed">
            Every document is reviewed by the compliance desk within 24 hours of submission.
          </p>
          <Link
            to="/signup"
            className="mt-8 inline-flex items-center gap-2 rounded-[10px] bg-gold px-6 py-3 font-semibold text-navy transition-all hover:scale-[1.02] hover:bg-gold-soft hover:shadow-[0_0_24px_rgba(201,162,39,0.35)]"
          >
            Start verification <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="overflow-hidden rounded-2xl border border-hairline bg-panel">
          <div className="grid grid-cols-[140px_1fr] border-b border-hairline bg-elev px-6 py-4 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-ink-faint">
            <span>Role</span>
            <span>Required documents</span>
          </div>
          {DOCS.map((d) => (
            <div key={d.role} className="doc-row grid grid-cols-[140px_1fr] gap-4 border-b border-hairline px-6 py-6 last:border-0">
              <span className="font-mono text-[0.85rem] text-gold">{d.role}</span>
              <ul className="space-y-2.5">
                {d.docs.map((doc) => (
                  <li key={doc} className="flex items-start gap-3 text-sm text-ink-dim">
                    <FileCheck2 className="mt-0.5 h-4 w-4 shrink-0 text-harvest" />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Page ---------------- */

export default function Compliance() {
  const hero = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".cmp-hero-word",
        { y: "110%" },
        { y: "0%", duration: 0.9, ease: "power3.out", stagger: 0.05 }
      );
      gsap.fromTo(".cmp-hero-sub", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power3.out" });
      gsap.fromTo(
        ".cmp-hero-bg",
        { y: -40 },
        {
          y: 40,
          ease: "none",
          scrollTrigger: { trigger: hero.current, start: "top top", end: "bottom top", scrub: true },
        }
      );
    },
    { scope: hero }
  );

  const words = ["Built", "for", "Institutions.", "Audited", "for", "Regulators."];

  return (
    <div>
      <section ref={hero} className="relative overflow-hidden pt-[72px]">
        <img
          src="/compliance-datacenter.jpg"
          alt="Dark server room corridor with gold LED accents"
          className="cmp-hero-bg absolute inset-0 h-[calc(100%+80px)] w-full object-cover will-change-transform"
        />
        <div className="absolute inset-0 bg-navy/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,162,39,0.1),transparent_60%)]" />
        <div className="content-wrap relative py-[96px] md:py-[160px]">
          <p className="kicker">/// TRUST INFRASTRUCTURE</p>
          <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.8rem,6vw,5rem)] font-bold leading-[1.05] text-white">
            {words.map((w) => (
              <span key={w} className="mr-4 inline-block overflow-hidden align-top">
                <span className="cmp-hero-word inline-block will-change-transform">{w}</span>
              </span>
            ))}
          </h1>
          <p className="cmp-hero-sub mt-8 max-w-2xl text-lg leading-relaxed text-white/80">
            Every counterparty verified. Every contract escrowed. Every byte encrypted.
          </p>
        </div>
      </section>

      <Pillars />
      <Certifications />
      <SecurityNumbers />
      <DocumentRequirements />

      <section className="relative border-t border-hairline bg-panel/40">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
        <div className="content-wrap section-pad text-center">
          <p className="kicker">/// COMPLIANCE DESK</p>
          <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.2rem)] font-bold">
            Compliance questions?
          </h2>
          <p className="mt-4 text-ink-dim">Our compliance desk answers within one business day.</p>
          <a
            href="mailto:ggabbert@aggrowglobal.com?subject=Compliance%20desk"
            className="mt-10 inline-flex items-center gap-2 rounded-[10px] border border-hairline px-7 py-3.5 font-medium text-ink transition-colors hover:border-gold hover:text-gold"
          >
            <Mail className="h-4 w-4" /> ggabbert@aggrowglobal.com
          </a>
        </div>
      </section>
    </div>
  );
}
