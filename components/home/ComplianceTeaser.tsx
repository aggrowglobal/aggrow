import { useRef } from "react";
import { Link } from "react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ShieldCheck,
  UserCheck,
  Lock,
  FileCheck,
  ScanSearch,
  FileLock2,
  ArrowRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ITEMS = [
  { icon: ShieldCheck, title: "Sanctions Screening", desc: "OFAC, EU and UN lists checked on every counterparty." },
  { icon: UserCheck, title: "KYC/KYB Verification", desc: "Corporate identity and UBO verification in under 24h." },
  { icon: Lock, title: "End-to-End Encryption", desc: "AES-256 at rest, TLS 1.3 in transit, across the platform." },
  { icon: FileCheck, title: "Customs Integration", desc: "Direct integration with Brazilian and destination customs." },
  { icon: ScanSearch, title: "Fraud Detection AI", desc: "Anomaly scoring on documents, payments and behavior." },
  { icon: FileLock2, title: "Smart Contract Escrow", desc: "Funds released only on verified milestone completion." },
];

export default function ComplianceTeaser() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".comp-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 85%" },
        }
      );
      gsap.fromTo(
        ".comp-icon",
        { strokeDashoffset: 48, opacity: 0 },
        {
          strokeDashoffset: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: root.current, start: "top 85%" },
        }
      );
    },
    { scope: root }
  );

  return (
    <section ref={root} className="section-pad border-t border-hairline bg-panel/40">
      <div className="content-wrap">
        <p className="kicker">/// TRUST INFRASTRUCTURE</p>
        <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.2rem)] font-bold">
          Built for institutions. Audited for regulators.
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((it) => (
            <div key={it.title} className="comp-card card-hover rounded-2xl border border-hairline bg-panel p-6">
              <it.icon className="comp-icon h-6 w-6 text-gold" strokeDasharray={48} />
              <h3 className="mt-4 font-display text-[1.35rem] font-semibold">{it.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-dim">{it.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link
            to="/compliance"
            className="inline-flex items-center gap-2 font-medium text-gold transition-colors hover:text-gold-soft"
          >
            Our compliance stack <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
