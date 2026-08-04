import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Ship, X } from "lucide-react";

const ORIGINS = ["Santos", "Paranaguá", "Itaqui", "Rio Grande", "Suape"];
const DESTINATIONS = ["Shanghai", "Rotterdam", "Dubai/Jebel Ali", "Mumbai", "Tokyo"];
const TYPES = ["Bulk", "Container", "Break-bulk"] as const;
const INCOTERMS = ["FOB", "CIF", "CFR", "EXW"];

const DEST_NM: Record<string, number> = {
  Shanghai: 11800,
  Rotterdam: 5500,
  "Dubai/Jebel Ali": 6700,
  Mumbai: 7600,
  Tokyo: 11200,
};
const ORIGIN_OFFSET: Record<string, number> = {
  Santos: 0,
  "Paranaguá": 180,
  Itaqui: 420,
  "Rio Grande": 640,
  Suape: 320,
};
const TYPE_FACTOR: Record<(typeof TYPES)[number], number> = {
  Bulk: 1,
  Container: 1.35,
  "Break-bulk": 1.15,
};

const fmtUSD = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

function vesselClass(type: (typeof TYPES)[number], volume: number) {
  if (type === "Container") return "Container Feeder";
  if (type === "Break-bulk") return "General Cargo";
  return volume >= 60000 ? "Capesize Bulk Carrier" : "Bulk Carrier";
}

type Booking = { ref: string; name: string } | null;

export default function FreightCalculator() {
  const [origin, setOrigin] = useState("Santos");
  const [destination, setDestination] = useState("Shanghai");
  const [volume, setVolume] = useState(10000);
  const [cargoType, setCargoType] = useState<(typeof TYPES)[number]>("Bulk");
  const [incoterm, setIncoterm] = useState("FOB");
  const [loadDate, setLoadDate] = useState("2025-03-15");
  const [flash, setFlash] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [booking, setBooking] = useState<Booking>(null);

  const result = useMemo(() => {
    const dist = (DEST_NM[destination] ?? 8000) + (ORIGIN_OFFSET[origin] ?? 0);
    const vol = Math.max(100, volume || 100);
    const volFactor = Math.min(1.6, Math.max(0.85, Math.pow(10000 / vol, 0.08)));
    const rate = 8.68 * (dist / 11800) * TYPE_FACTOR[cargoType] * volFactor;
    const portFees = 45000 * Math.pow(dist / 11800, 0.3) * (1 + (ORIGIN_OFFSET[origin] ?? 0) / 40000);
    const insurance = vol * 0.7 * (incoterm === "EXW" ? 1.3 : 1);
    const docs = 35000;
    const ocean = rate * vol;
    const total = ocean + portFees + insurance + docs;
    const low = Math.round(dist / 540);
    return {
      dist,
      rate,
      portFees,
      insurance,
      docs,
      ocean,
      total,
      perMT: total / vol,
      transit: `${low}–${low + 4} days`,
      vessel: vesselClass(cargoType, vol),
    };
  }, [origin, destination, volume, cargoType, incoterm]);

  const onChange = () => setFlash((f) => f + 1);

  const inputCls =
    "w-full rounded-[10px] border border-hairline bg-elev px-3.5 py-3 text-sm text-ink outline-none transition focus:border-gold focus:ring-[3px] focus:ring-gold/15";
  const labelCls = "mb-2 block font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-dim";

  const submitBooking = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "");
    setBooking({ ref: `BKF-2025-${String(Math.floor(10000 + Math.random() * 89999))}`, name });
  };

  const breakdown = [
    { label: "Ocean freight", value: result.ocean },
    { label: "Port fees", value: result.portFees },
    { label: "Insurance", value: result.insurance },
    { label: "Documentation", value: result.docs },
  ];
  const maxPart = Math.max(...breakdown.map((b) => b.value));

  return (
    <section className="section-pad border-t border-hairline">
      <div className="content-wrap">
        <p className="kicker">/// FREIGHT & LOGISTICS</p>
        <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.2rem)] font-bold">
          Live freight intelligence.
        </h2>
        <p className="mt-4 max-w-2xl text-ink-dim">
          Real-time ocean rates across our corridors. Configure your shipment and book capacity
          directly with our desk.
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Form panel */}
          <div className="rounded-2xl border border-hairline bg-panel p-7">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={labelCls} htmlFor="fc-origin">Origin port</label>
                <select id="fc-origin" className={inputCls} value={origin}
                  onChange={(e) => { setOrigin(e.target.value); onChange(); }}>
                  {ORIGINS.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls} htmlFor="fc-dest">Destination</label>
                <select id="fc-dest" className={inputCls} value={destination}
                  onChange={(e) => { setDestination(e.target.value); onChange(); }}>
                  {DESTINATIONS.map((d) => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls} htmlFor="fc-vol">Volume (MT)</label>
                <input id="fc-vol" type="number" min={100} className={inputCls} value={volume}
                  onChange={(e) => { setVolume(Number(e.target.value)); onChange(); }} />
              </div>
              <div>
                <label className={labelCls} htmlFor="fc-type">Cargo type</label>
                <select id="fc-type" className={inputCls} value={cargoType}
                  onChange={(e) => { setCargoType(e.target.value as (typeof TYPES)[number]); onChange(); }}>
                  {TYPES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls} htmlFor="fc-inc">Incoterm</label>
                <select id="fc-inc" className={inputCls} value={incoterm}
                  onChange={(e) => { setIncoterm(e.target.value); onChange(); }}>
                  {INCOTERMS.map((i) => <option key={i}>{i}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls} htmlFor="fc-date">Load date</label>
                <input id="fc-date" type="date" className={inputCls} value={loadDate}
                  onChange={(e) => { setLoadDate(e.target.value); onChange(); }} />
              </div>
            </div>
            <button
              onClick={() => { setModalOpen(true); setBooking(null); }}
              className="mt-7 w-full rounded-[10px] bg-gold py-3.5 font-semibold text-navy transition-all hover:scale-[1.01] hover:bg-gold-soft hover:shadow-[0_0_28px_rgba(201,162,39,0.35)]"
            >
              Book Freight
            </button>
          </div>

          {/* Results panel */}
          <div key={flash} className="rounded-2xl border border-hairline bg-elev p-7">
            <motion.div
              key={`r-${flash}`}
              initial={{ opacity: 0.4 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between">
                <span className="caption-label">Ocean rate</span>
                <span className="font-mono text-4xl font-semibold text-gold">
                  ${result.rate.toFixed(2)}<span className="text-base text-ink-dim">/MT</span>
                </span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-hairline pt-6 font-mono text-sm">
                <div><span className="text-ink-faint">Port fees</span><br /><span className="text-ink">{fmtUSD(result.portFees)}</span></div>
                <div><span className="text-ink-faint">Insurance</span><br /><span className="text-ink">{fmtUSD(result.insurance)}</span></div>
                <div><span className="text-ink-faint">Documentation</span><br /><span className="text-ink">{fmtUSD(result.docs)}</span></div>
                <div><span className="text-ink-faint">Transit</span><br /><span className="text-ink">{result.transit}</span></div>
                <div><span className="text-ink-faint">Vessel</span><br /><span className="text-ink">{result.vessel}</span></div>
                <div><span className="text-ink-faint">Distance</span><br /><span className="text-ink">{result.dist.toLocaleString("en-US")} NM</span></div>
              </div>

              <div className="mt-6 space-y-3 border-t border-hairline pt-6">
                {breakdown.map((b) => (
                  <div key={b.label}>
                    <div className="flex justify-between font-mono text-[0.75rem]">
                      <span className="text-ink-faint">{b.label}</span>
                      <span className="text-ink-dim">{fmtUSD(b.value)}</span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-panel">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-gold to-gold-soft"
                        initial={{ width: 0 }}
                        animate={{ width: `${(b.value / maxPart) * 100}%` }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-end justify-between rounded-xl border border-gold/30 bg-gold/5 px-5 py-4">
                <span className="caption-label">Total landed cost</span>
                <div className="text-right font-mono">
                  <div className="text-2xl font-semibold text-gold">{fmtUSD(result.total)}</div>
                  <div className="text-[0.75rem] text-ink-dim">${result.perMT.toFixed(2)}/MT all-in</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Book Freight modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-navy/80 p-6 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 26 }}
              className="w-full max-w-md rounded-2xl border border-hairline bg-elev p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between">
                <h3 className="font-display text-xl font-semibold">
                  {booking ? "Booking received" : "Book Freight"}
                </h3>
                <button onClick={() => setModalOpen(false)} aria-label="Close" className="text-ink-dim hover:text-ink">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {booking ? (
                <div className="mt-6 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-harvest/15">
                    <Ship className="h-6 w-6 text-harvest" />
                  </div>
                  <p className="mt-4 text-sm text-ink-dim">
                    Thank you{booking.name ? `, ${booking.name}` : ""}. Your booking reference:
                  </p>
                  <p className="mt-2 font-mono text-xl font-semibold text-gold">{booking.ref}</p>
                  <p className="mt-3 text-sm text-ink-dim">Our desk will confirm within 24h.</p>
                  <button
                    onClick={() => setModalOpen(false)}
                    className="mt-6 w-full rounded-[10px] border border-hairline py-3 text-sm font-medium text-ink transition-colors hover:border-gold hover:text-gold"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={submitBooking} className="mt-6 space-y-4">
                  <p className="font-mono text-[0.75rem] text-ink-faint">
                    {origin} → {destination} · {Number(volume).toLocaleString("en-US")} MT · {cargoType} · {incoterm}
                  </p>
                  {(["name", "company", "email"] as const).map((f) => (
                    <div key={f}>
                      <label className={labelCls} htmlFor={`bk-${f}`}>
                        {f === "name" ? "Name" : f === "company" ? "Company" : "Email"}
                      </label>
                      <input
                        id={`bk-${f}`}
                        name={f}
                        type={f === "email" ? "email" : "text"}
                        required
                        className={inputCls}
                        placeholder={f === "email" ? "you@company.com" : ""}
                      />
                    </div>
                  ))}
                  <button
                    type="submit"
                    className="w-full rounded-[10px] bg-gold py-3.5 font-semibold text-navy transition-all hover:bg-gold-soft"
                  >
                    Confirm Booking Request
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
