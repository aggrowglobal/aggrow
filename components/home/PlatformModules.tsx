import { useState } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const MODULES = [
  {
    id: "kyc",
    label: "KYC Onboarding",
    bullets: [
      "24h corporate verification across 40+ jurisdictions",
      "CNPJ, sanctions and UBO screening built in",
      "Tiered account limits matched to trade history",
    ],
    visual: { title: "KYC STATUS", rows: ["Identity verified", "Sanctions clear", "UBO confirmed"], status: "APPROVED · 18h 42m" },
  },
  {
    id: "listing",
    label: "Listing & Inspection",
    bullets: [
      "Structured listings: specs, volume, certificates",
      "Third-party inspection at origin and load port",
      "AI price benchmark against 12 months of trades",
    ],
    visual: { title: "LISTING #A-2481", rows: ["Soybeans Non-GMO · 12,500 MT", "SGS inspection booked", "Benchmark +2.1% vs index"], status: "LIVE ON MARKETPLACE" },
  },
  {
    id: "deal",
    label: "Deal Room",
    bullets: [
      "Encrypted negotiation with full audit trail",
      "Escrowed smart contract protects both parties",
      "Milestone tracking from offer to settlement",
    ],
    visual: { title: "DEAL ROOM", rows: ["Buyer: counter-offer $486/MT", "Contract v3 signed by seller", "Escrow funded — 30% deposit"], status: "CONTRACT ACTIVE" },
  },
  {
    id: "finance",
    label: "Trade Finance",
    bullets: [
      "Receivables advances in days, not months",
      "Letters of credit issued through partner banks",
      "FX hedging on BRL, CNY, EUR and AED corridors",
    ],
    visual: { title: "FINANCE DESK", rows: ["LC confirmed — HSBC HK", "Advance: 70% of contract", "Hedge: USD/BRL 5.08 locked"], status: "FACILITY AVAILABLE" },
  },
  {
    id: "logistics",
    label: "Logistics",
    bullets: [
      "Freight booking across 156 ports and 47 corridors",
      "Vessel tracking with AIS position updates",
      "Documents: B/L, phytosanitary, certificates of origin",
    ],
    visual: { title: "SHIPMENT SS-1142", rows: ["MV Pacific Grain — Santos", "ETA Shanghai: 24 days", "Docs: 6/7 issued"], status: "IN TRANSIT" },
  },
  {
    id: "ai",
    label: "AI Intelligence",
    bullets: [
      "Price forecasting per commodity and corridor",
      "Counterparty risk scoring in real time",
      "Market signals from satellite and trade-flow data",
    ],
    visual: { title: "SIGNAL ENGINE", rows: ["Soy CFR China: bullish 7d", "Counterparty score: 94/100", "Freight index: −1.2% w/w"], status: "MODEL v4.2 LIVE" },
  },
];

export default function PlatformModules() {
  const [active, setActive] = useState(MODULES[2]);
  const words = ["Six", "modules.", "One", "trading", "infrastructure."];

  return (
    <section className="section-pad border-t border-hairline bg-panel/60">
      <div className="content-wrap">
        <p className="kicker">/// THE PLATFORM</p>
        <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.2rem)] font-bold">
          {words.map((w) => (
            <motion.span
              key={w}
              className="mr-3 inline-block"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {w}
            </motion.span>
          ))}
        </h2>

        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-b border-hairline">
          {MODULES.map((m) => (
            <button
              key={m.id}
              onClick={() => setActive(m)}
              className={`relative pb-4 text-[0.95rem] font-medium transition-colors ${
                active.id === m.id ? "text-gold" : "text-ink-dim hover:text-ink"
              }`}
            >
              {m.label}
              {active.id === m.id && (
                <motion.span
                  layoutId="module-tab-underline"
                  className="absolute inset-x-0 -bottom-px h-[2px] bg-gold"
                />
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 grid gap-10 lg:grid-cols-2"
          >
            <ul className="space-y-4">
              {active.bullets.map((b, i) => (
                <motion.li
                  key={b}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.4 }}
                  className="flex items-start gap-3 text-ink-dim"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <span>{b}</span>
                </motion.li>
              ))}
              <li className="pt-4">
                <Link
                  to="/platform"
                  className="inline-flex items-center gap-2 font-medium text-gold transition-colors hover:text-gold-soft"
                >
                  Explore the platform <ArrowRight className="h-4 w-4" />
                </Link>
              </li>
            </ul>

            <div className="rounded-2xl border border-hairline bg-elev p-6">
              <div className="flex items-center justify-between border-b border-hairline pb-3">
                <span className="font-mono text-[0.75rem] tracking-[0.14em] text-ink-faint">{active.visual.title}</span>
                <span className="flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-alert/70" />
                  <span className="h-2 w-2 rounded-full bg-gold/70" />
                  <span className="h-2 w-2 rounded-full bg-harvest/70" />
                </span>
              </div>
              <div className="space-y-3 py-5">
                {active.visual.rows.map((r) => (
                  <div key={r} className="flex items-center gap-3 rounded-lg border border-hairline/60 bg-panel px-4 py-3">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                    <span className="font-mono text-[0.8rem] text-ink-dim">{r}</span>
                  </div>
                ))}
              </div>
              <div className="rounded-lg bg-gold/10 px-4 py-3 font-mono text-[0.8rem] text-gold">
                ● {active.visual.status}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
