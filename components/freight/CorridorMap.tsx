import { motion } from "framer-motion";

const CORRIDORS = [
  { origin: "Santos", destination: "Shanghai", days: "22–26", vessel: "Bulk Carrier", rate: 8.68 },
  { origin: "Santos", destination: "Rotterdam", days: "10–14", vessel: "Bulk Carrier", rate: 4.05 },
  { origin: "Santos", destination: "Jebel Ali", days: "12–16", vessel: "Bulk Carrier", rate: 4.93 },
  { origin: "Paranaguá", destination: "Shanghai", days: "23–27", vessel: "Capesize", rate: 8.81 },
  { origin: "Itaqui", destination: "Rotterdam", days: "11–15", vessel: "Capesize", rate: 4.36 },
  { origin: "Itaqui", destination: "Mumbai", days: "15–19", vessel: "Bulk Carrier", rate: 5.90 },
  { origin: "Rio Grande", destination: "Tokyo", days: "22–26", vessel: "Container Feeder", rate: 8.34 },
  { origin: "Suape", destination: "Jebel Ali", days: "13–17", vessel: "Container Feeder", rate: 5.17 },
  { origin: "Santos", destination: "Mumbai", days: "14–18", vessel: "Bulk Carrier", rate: 5.59 },
  { origin: "Paranaguá", destination: "Rotterdam", days: "11–15", vessel: "Bulk Carrier", rate: 4.11 },
];

export default function CorridorMap() {
  return (
    <section className="border-t border-hairline bg-panel">
      <div className="content-wrap section-pad">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="kicker">/// TRADE CORRIDORS</p>
          <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.2rem)] font-bold">
            47 corridors. One network.
          </h2>
          <p className="mt-4 max-w-2xl text-ink-dim">
            Gold arcs link Brazil's export terminals to the world's demand centers — Santos,
            Paranaguá, and Itaqui to Shanghai, Rotterdam, Dubai, and Mumbai.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 overflow-hidden rounded-2xl border border-hairline bg-abyss"
        >
          <img
            src="/corridor-map.svg"
            alt="Stylized world map of AGGROW trade corridors from Brazilian ports to global destinations"
            className="h-auto w-full"
          />
        </motion.div>

        <div className="mt-10 overflow-x-auto rounded-2xl border border-hairline">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-hairline bg-elev font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-faint">
                <th className="px-5 py-3.5 font-medium">Origin</th>
                <th className="px-5 py-3.5 font-medium">Destination</th>
                <th className="px-5 py-3.5 font-medium">Transit days</th>
                <th className="px-5 py-3.5 font-medium">Vessel class</th>
                <th className="px-5 py-3.5 text-right font-medium">Indicative $/MT</th>
              </tr>
            </thead>
            <tbody>
              {CORRIDORS.map((c, i) => (
                <motion.tr
                  key={`${c.origin}-${c.destination}-${i}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-5% 0px" }}
                  transition={{ duration: 0.5, delay: (i % 5) * 0.06 }}
                  className="border-b border-hairline/60 bg-panel transition-colors last:border-0 hover:bg-elev"
                >
                  <td className="px-5 py-3.5 font-medium text-ink">{c.origin}</td>
                  <td className="px-5 py-3.5 text-ink-dim">{c.destination}</td>
                  <td className="px-5 py-3.5 font-mono text-ink-dim">{c.days}</td>
                  <td className="px-5 py-3.5 text-ink-dim">{c.vessel}</td>
                  <td className="px-5 py-3.5 text-right font-mono font-medium text-gold">
                    ${c.rate.toFixed(2)}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
