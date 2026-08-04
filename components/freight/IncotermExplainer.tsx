import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Segment = { label: string };
const SEGMENTS: Segment[] = [
  { label: "Farm gate" },
  { label: "Inland haulage" },
  { label: "Origin port" },
  { label: "Ocean freight" },
  { label: "Destination port" },
];

type IncotermDef = {
  id: string;
  name: string;
  blurb: string;
  sellerPays: number; // number of segments covered by seller
  riskTransfer: number; // segment index where risk transfers
};

const INCOTERMS: IncotermDef[] = [
  {
    id: "EXW", name: "Ex Works",
    blurb: "Buyer collects at the farm gate. Seller's only duty is making goods available — all transport, export clearance, freight, and insurance sit with the buyer.",
    sellerPays: 1, riskTransfer: 0,
  },
  {
    id: "FOB", name: "Free On Board",
    blurb: "Seller delivers and clears goods loaded on board at the origin port (e.g. Santos). Buyer charters and pays ocean freight, insurance, and destination handling.",
    sellerPays: 3, riskTransfer: 3,
  },
  {
    id: "CFR", name: "Cost & Freight",
    blurb: "Seller pays the ocean freight to the destination port, but risk transfers once goods are on board at origin. Buyer insures and handles discharge.",
    sellerPays: 4, riskTransfer: 3,
  },
  {
    id: "CIF", name: "Cost, Insurance & Freight",
    blurb: "Seller pays freight plus marine insurance to the destination port. Risk still transfers on board at origin — the buyer owns the voyage outcome.",
    sellerPays: 5, riskTransfer: 3,
  },
];

export default function IncotermExplainer() {
  const [active, setActive] = useState("FOB");
  const def = INCOTERMS.find((i) => i.id === active)!;

  return (
    <section className="border-t border-hairline bg-panel">
      <div className="content-wrap section-pad">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="kicker">/// INCOTERMS 2020</p>
          <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.2rem)] font-bold">
            Who pays what, where.
          </h2>
          <p className="mt-4 max-w-2xl text-ink-dim">
            Select an incoterm to see cost and risk allocation from farm gate to destination port.
          </p>
        </motion.div>

        <div className="mt-10 flex flex-wrap gap-3">
          {INCOTERMS.map((i) => (
            <button
              key={i.id}
              onClick={() => setActive(i.id)}
              className={`rounded-[10px] border px-6 py-3 font-mono text-sm font-semibold transition-all ${
                active === i.id
                  ? "border-gold bg-gold/10 text-gold shadow-[0_0_20px_rgba(201,162,39,0.2)]"
                  : "border-hairline text-ink-dim hover:border-gold/50 hover:text-ink"
              }`}
            >
              {i.id}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={def.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="mt-8 rounded-2xl border border-hairline bg-elev p-7"
          >
            <div className="flex flex-wrap items-baseline gap-3">
              <h3 className="font-display text-xl font-semibold text-ink">
                {def.id} — {def.name}
              </h3>
              <span className="font-mono text-[0.75rem] text-ink-faint">
                risk transfers at: {SEGMENTS[def.riskTransfer].label}
              </span>
            </div>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-dim">{def.blurb}</p>

            {/* Route bar */}
            <div className="mt-8">
              <div className="grid grid-cols-5 gap-1.5">
                {SEGMENTS.map((seg, i) => {
                  const seller = i < def.sellerPays;
                  const risk = i === def.riskTransfer;
                  return (
                    <motion.div
                      key={seg.label}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                    >
                      <div
                        className={`h-2.5 rounded-full ${
                          seller ? "bg-gradient-to-r from-gold to-gold-soft" : "bg-hairline"
                        }`}
                      />
                      <p className={`mt-2.5 text-[0.7rem] font-medium ${seller ? "text-gold" : "text-ink-faint"}`}>
                        {seg.label}
                      </p>
                      <p className="mt-0.5 font-mono text-[0.65rem] text-ink-faint">
                        {seller ? "Seller pays" : "Buyer pays"}
                      </p>
                      {risk && (
                        <p className="mt-1 inline-block rounded border border-alert/50 bg-alert/10 px-1.5 py-0.5 font-mono text-[0.6rem] uppercase text-alert">
                          Risk → buyer
                        </p>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
