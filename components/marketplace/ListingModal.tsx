import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router";
import { X, ShieldCheck, MessageSquare, Lock, TrendingUp, TrendingDown } from "lucide-react";
import type { Listing } from "./data";

const fmtUSD = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

function Sparkline({ seed }: { seed: number }) {
  const points = useMemo(() => {
    const pts: string[] = [];
    let v = 50 + ((seed * 37) % 20);
    for (let i = 0; i <= 24; i++) {
      v += Math.sin(seed * 3 + i * 1.7) * 6 - 1.5;
      v = Math.max(15, Math.min(85, v));
      pts.push(`${(i / 24) * 300},${90 - v * 0.8}`);
    }
    return pts.join(" ");
  }, [seed]);
  return (
    <svg viewBox="0 0 300 100" className="h-24 w-full" preserveAspectRatio="none" aria-hidden>
      <motion.polyline
        points={points}
        fill="none"
        stroke="#C9A227"
        strokeWidth={2}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
    </svg>
  );
}

export default function ListingModal({
  listing,
  onClose,
}: {
  listing: Listing | null;
  onClose: () => void;
}) {
  const [volume, setVolume] = useState(1000);
  const up = (listing?.delta ?? 0) >= 0;

  const specs = listing
    ? [
        ["Grade", listing.grade],
        ["Moisture", listing.moisture],
        ["Protein", listing.protein],
        ["Origin", `${listing.origin}, Brazil`],
        ["Certificates", listing.certs.join(" · ")],
        ["Inspection agency", listing.inspection],
        ["Load window", listing.loadWindow],
        ["Available volume", `${listing.volumeMt.toLocaleString("en-US")} MT`],
        ["Incoterm", listing.incoterm],
      ]
    : [];

  return (
    <AnimatePresence>
      {listing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-navy/80 p-4 backdrop-blur-sm md:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.94, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            className="max-h-[90dvh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-hairline bg-elev"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid md:grid-cols-2">
              <div className="relative h-64 md:h-auto md:min-h-full">
                <img src={listing.image} alt={listing.title} className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-elev via-transparent to-transparent" />
                <span className="absolute left-5 top-5 rounded-md border border-hairline bg-navy/75 px-2.5 py-1 font-mono text-[0.7rem] uppercase tracking-wider text-gold backdrop-blur-sm">
                  {listing.grade}
                </span>
              </div>

              <div className="p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl font-semibold">{listing.title}</h3>
                    <p className="mt-1 font-mono text-[0.8rem] text-ink-faint">LISTING #{String(listing.id).padStart(4, "0")} · {listing.origin}, BR</p>
                  </div>
                  <button onClick={onClose} aria-label="Close" className="text-ink-dim transition-colors hover:text-ink">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-4 flex items-end gap-3">
                  <span className="font-mono text-3xl font-semibold text-gold">
                    ${listing.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </span>
                  <span className="pb-1 font-mono text-[0.8rem] text-ink-faint">/MT</span>
                  <span className={`mb-1 inline-flex items-center gap-1 font-mono text-[0.8rem] ${up ? "text-harvest" : "text-alert"}`}>
                    {up ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                    {up ? "+" : ""}{listing.delta.toFixed(1)}% 24h
                  </span>
                </div>

                <Sparkline seed={listing.id} />

                <dl className="mt-4 divide-y divide-hairline/70 border-y border-hairline text-[0.85rem]">
                  {specs.map(([k, v], i) => (
                    <motion.div
                      key={k}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.04 }}
                      className="flex justify-between gap-4 py-2"
                    >
                      <dt className="text-ink-faint">{k}</dt>
                      <dd className="text-right font-medium text-ink">{v}</dd>
                    </motion.div>
                  ))}
                </dl>

                <div className="mt-5">
                  <div className="flex justify-between font-mono text-[0.75rem]">
                    <span className="text-ink-faint">Estimate volume</span>
                    <span className="text-ink">{volume.toLocaleString("en-US")} MT → {fmtUSD(volume * listing.price)}</span>
                  </div>
                  <input
                    type="range"
                    min={100}
                    max={listing.volumeMt}
                    step={100}
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="mt-2 w-full accent-[#C9A227]"
                    aria-label="Volume estimator"
                  />
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <Link
                    to="/signin"
                    className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-gold px-4 py-3 text-[0.85rem] font-semibold text-navy transition-all hover:bg-gold-soft hover:shadow-[0_0_24px_rgba(201,162,39,0.35)]"
                  >
                    <Lock className="h-4 w-4" /> Open Deal Room
                  </Link>
                  <Link
                    to="/signin"
                    className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-hairline px-4 py-3 text-[0.85rem] font-medium text-ink transition-colors hover:border-gold hover:text-gold"
                  >
                    <MessageSquare className="h-4 w-4" /> Message Producer
                  </Link>
                </div>
                <p className="mt-3 flex items-center gap-1.5 text-[0.75rem] text-ink-faint">
                  <ShieldCheck className="h-3.5 w-3.5 text-harvest" /> KYC-verified counterparty · Sign in to transact
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
