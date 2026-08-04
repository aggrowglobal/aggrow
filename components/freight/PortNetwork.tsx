import { motion } from "framer-motion";
import { Anchor } from "lucide-react";

const PORTS = [
  { name: "Santos", country: "BR", coords: "23.9608°S 46.3336°W", tonnage: "162M t/yr" },
  { name: "Paranaguá", country: "BR", coords: "25.5163°S 48.5224°W", tonnage: "62M t/yr" },
  { name: "Itaqui", country: "BR", coords: "2.5777°S 44.3665°W", tonnage: "34M t/yr" },
  { name: "Rio Grande", country: "BR", coords: "32.0350°S 52.0986°W", tonnage: "51M t/yr" },
  { name: "Suape", country: "BR", coords: "8.3929°S 34.9681°W", tonnage: "26M t/yr" },
  { name: "Shanghai", country: "CN", coords: "31.2304°N 121.4737°E", tonnage: "651M t/yr" },
  { name: "Rotterdam", country: "NL", coords: "51.9556°N 4.1340°E", tonnage: "468M t/yr" },
  { name: "Jebel Ali", country: "AE", coords: "25.0157°N 55.0672°E", tonnage: "135M t/yr" },
  { name: "Mumbai (JNPT)", country: "IN", coords: "18.9490°N 72.9525°E", tonnage: "90M t/yr" },
  { name: "Tokyo", country: "JP", coords: "35.6329°N 139.7570°E", tonnage: "92M t/yr" },
];

export default function PortNetwork() {
  return (
    <section className="content-wrap section-pad">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="kicker">/// PORT NETWORK</p>
        <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.2rem)] font-bold">
          156 ports, berth-level tracking.
        </h2>
      </motion.div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {PORTS.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.6, delay: (i % 5) * 0.07, ease: [0.16, 1, 0.3, 1] }}
            className="card-hover rounded-2xl border border-hairline bg-panel p-5"
          >
            <div className="flex items-center justify-between">
              <Anchor className="h-4 w-4 text-gold" />
              <span className="rounded border border-hairline px-1.5 py-0.5 font-mono text-[0.65rem] text-ink-faint">
                {p.country}
              </span>
            </div>
            <h3 className="mt-4 font-display text-base font-semibold text-ink">{p.name}</h3>
            <p className="mt-1.5 font-mono text-[0.7rem] text-ink-faint">{p.coords}</p>
            <p className="mt-3 border-t border-hairline pt-3 font-mono text-[0.75rem] text-ink-dim">
              {p.tonnage}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
