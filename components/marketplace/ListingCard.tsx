import { motion } from "framer-motion";
import { MapPin, TrendingUp, TrendingDown, Eye } from "lucide-react";
import type { Listing } from "./data";

const fmtPrice = (n: number) =>
  "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function ListingCard({
  listing,
  index,
  onOpen,
}: {
  listing: Listing;
  index: number;
  onOpen: (l: Listing) => void;
}) {
  const up = listing.delta >= 0;
  return (
    <motion.article
      layout="position"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.6, delay: Math.min(index, 8) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="card-hover group cursor-pointer overflow-hidden rounded-2xl border border-hairline bg-panel"
      onClick={() => onOpen(listing)}
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={listing.image}
          alt={listing.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />
        <span className="absolute left-4 top-4 rounded-md border border-hairline bg-navy/75 px-2.5 py-1 font-mono text-[0.7rem] uppercase tracking-wider text-gold backdrop-blur-sm">
          {listing.grade}
        </span>
        <div className="absolute inset-x-0 bottom-0 flex translate-y-3 justify-center pb-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="inline-flex items-center gap-2 rounded-[10px] bg-gold px-4 py-2 text-[0.8rem] font-semibold text-navy">
            <Eye className="h-4 w-4" /> View Listing
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-display text-lg font-semibold text-ink">{listing.title}</h3>
        <p className="mt-1.5 flex items-center gap-1.5 text-[0.8rem] text-ink-dim">
          <MapPin className="h-3.5 w-3.5 text-ink-faint" />
          {listing.origin}, Brazil · {listing.volumeMt.toLocaleString("en-US")} MT
        </p>
        <div className="mt-4 flex items-end justify-between border-t border-hairline pt-4">
          <div className="font-mono">
            <div className="text-xl font-semibold text-ink">{fmtPrice(listing.price)}<span className="text-[0.7rem] text-ink-faint">/MT</span></div>
            <div className={`mt-0.5 inline-flex items-center gap-1 text-[0.75rem] ${up ? "text-harvest" : "text-alert"}`}>
              {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {up ? "+" : ""}{listing.delta.toFixed(1)}% 24h
            </div>
          </div>
          <span className="rounded-md border border-hairline px-2.5 py-1 font-mono text-[0.7rem] uppercase text-ink-dim">
            {listing.incoterm}
          </span>
        </div>
      </div>
    </motion.article>
  );
}
