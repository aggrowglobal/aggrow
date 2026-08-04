import { motion } from "framer-motion";
import { FileText, Leaf, Globe2, Receipt, Package, ShieldCheck } from "lucide-react";

const DOCS = [
  { icon: FileText, name: "Bill of Lading", desc: "Auto-drafted from booking data and issued at vessel departure." },
  { icon: Leaf, name: "Phytosanitary Certificate", desc: "MAPA-linked application filed with inspection results attached." },
  { icon: Globe2, name: "Certificate of Origin", desc: "Chamber-certified origin proof generated per destination rules." },
  { icon: Receipt, name: "Commercial Invoice", desc: "Contract-priced invoice issued on deal confirmation, multi-currency." },
  { icon: Package, name: "Packing List", desc: "Container-level weights and seals compiled from load-port telemetry." },
  { icon: ShieldCheck, name: "Insurance Certificate", desc: "Marine cargo cover bound and evidenced in the deal room." },
];

export default function DocsAutomation() {
  return (
    <section className="content-wrap section-pad">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="kicker">/// DOCUMENTATION AUTOMATION</p>
        <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.2rem)] font-bold">
          Export docs, generated in minutes.
        </h2>
        <p className="mt-4 max-w-2xl text-ink-dim">
          Every booking triggers a compliant document pack — drafted, signed, and shared with
          banks, customs, and counterparties automatically.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {DOCS.map((d, i) => (
          <motion.div
            key={d.name}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="card-hover flex gap-4 rounded-2xl border border-hairline bg-panel p-6"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold/30 bg-gold/10">
              <d.icon className="h-5 w-5 text-gold" />
            </div>
            <div>
              <h3 className="font-display text-[0.95rem] font-semibold text-ink">{d.name}</h3>
              <p className="mt-1.5 text-[0.8rem] leading-relaxed text-ink-dim">{d.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
