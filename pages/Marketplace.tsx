import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Link } from "react-router";
import { Search, X, ArrowUpDown } from "lucide-react";
import ListingCard from "../components/marketplace/ListingCard";
import ListingModal from "../components/marketplace/ListingModal";
import { LISTINGS, COMMODITIES, CERTS } from "../components/marketplace/data";
import type { Listing } from "../components/marketplace/data";

const INCOTERMS = ["FOB", "CIF", "CFR", "EXW"];
const MIN_VOLUMES = [0, 500, 2000, 5000, 10000, 25000];
const SORTS = [
  { id: "newest", label: "Newest" },
  { id: "price-desc", label: "Price ↓" },
  { id: "price-asc", label: "Price ↑" },
  { id: "volume", label: "Volume" },
] as const;

const inputCls =
  "w-full rounded-[10px] border border-hairline bg-elev px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-gold focus:ring-[3px] focus:ring-gold/15";
const labelCls = "mb-1.5 block font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-dim";

function Counter({ to, suffix = "", decimals = 0 }: { to: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1600);
      const eased = 1 - Math.pow(1 - p, 2);
      setVal(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref} className="font-mono text-3xl font-semibold text-gold md:text-4xl">
      {val.toFixed(decimals)}{suffix}
    </span>
  );
}

export default function Marketplace() {
  const [query, setQuery] = useState("");
  const [commodity, setCommodity] = useState("");
  const [incoterm, setIncoterm] = useState("");
  const [minVol, setMinVol] = useState(0);
  const [cert, setCert] = useState("");
  const [sort, setSort] = useState<(typeof SORTS)[number]["id"]>("newest");
  const [active, setActive] = useState<Listing | null>(null);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filtered = useMemo(() => {
    let out = LISTINGS.filter((l) => {
      const q = query.trim().toLowerCase();
      if (q && !`${l.title} ${l.origin} ${l.grade}`.toLowerCase().includes(q)) return false;
      if (commodity && l.commodity !== commodity) return false;
      if (incoterm && !l.incoterm.startsWith(incoterm)) return false;
      if (l.volumeMt < minVol) return false;
      if (cert && !l.certs.includes(cert)) return false;
      return true;
    });
    out = [...out];
    if (sort === "price-desc") out.sort((a, b) => b.price - a.price);
    else if (sort === "price-asc") out.sort((a, b) => a.price - b.price);
    else if (sort === "volume") out.sort((a, b) => b.volumeMt - a.volumeMt);
    else out.sort((a, b) => a.id - b.id);
    return out;
  }, [query, commodity, incoterm, minVol, cert, sort]);

  const chips: { key: string; label: string; clear: () => void }[] = [];
  if (commodity) chips.push({ key: "c", label: commodity, clear: () => setCommodity("") });
  if (incoterm) chips.push({ key: "i", label: incoterm, clear: () => setIncoterm("") });
  if (minVol > 0) chips.push({ key: "v", label: `≥ ${minVol.toLocaleString()} MT`, clear: () => setMinVol(0) });
  if (cert) chips.push({ key: "ct", label: cert, clear: () => setCert("") });
  if (query.trim()) chips.push({ key: "q", label: `“${query.trim()}”`, clear: () => setQuery("") });

  return (
    <div>
      {/* S1 Hero */}
      <section className="relative flex min-h-[60vh] items-end overflow-hidden">
        <img
          src="/hero-grain-terminal.jpg"
          alt="Grain export terminal at the Port of Santos"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,162,39,0.08),transparent_60%)]" />
        <div className="content-wrap relative pb-16 pt-40">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="kicker"
          >
            /// LIVE MARKETPLACE
          </motion.p>
          <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.4rem,5vw,4rem)] font-bold leading-[1.05] text-white">
            {"Verified Brazilian Commodities. Live Prices.".split(" ").map((w, i) => (
              <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  {w}&nbsp;
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-5 max-w-xl text-white/80"
          >
            Every listing is KYC-verified, inspected, and ready to contract.
          </motion.p>
        </div>
      </section>

      {/* S2 Filters bar */}
      <div
        className={`sticky top-[72px] z-40 border-b border-hairline transition-all duration-300 ${
          stuck ? "bg-white/85 shadow-[0_10px_40px_-15px_rgba(11,31,58,0.15)] backdrop-blur-md" : "bg-abyss"
        }`}
      >
        <div className="content-wrap py-4">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            <div className="relative col-span-2 md:col-span-3 lg:col-span-2">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
              <input
                className={`${inputCls} pl-10`}
                placeholder="Search commodity, origin…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search listings"
              />
            </div>
            <div>
              <label className={labelCls} htmlFor="f-commodity">Commodity</label>
              <select id="f-commodity" className={inputCls} value={commodity} onChange={(e) => setCommodity(e.target.value)}>
                <option value="">All</option>
                {COMMODITIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls} htmlFor="f-incoterm">Incoterm</label>
              <select id="f-incoterm" className={inputCls} value={incoterm} onChange={(e) => setIncoterm(e.target.value)}>
                <option value="">All</option>
                {INCOTERMS.map((i) => <option key={i}>{i}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls} htmlFor="f-vol">Min volume</label>
              <select id="f-vol" className={inputCls} value={minVol} onChange={(e) => setMinVol(Number(e.target.value))}>
                {MIN_VOLUMES.map((v) => (
                  <option key={v} value={v}>{v === 0 ? "Any" : `≥ ${v.toLocaleString("en-US")} MT`}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls} htmlFor="f-sort">Sort</label>
              <div className="relative">
                <ArrowUpDown className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-faint" />
                <select
                  id="f-sort"
                  className={`${inputCls} pl-9`}
                  value={sort}
                  onChange={(e) => setSort(e.target.value as (typeof SORTS)[number]["id"])}
                >
                  {SORTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <select
              className="rounded-[10px] border border-hairline bg-elev px-3 py-1.5 text-[0.8rem] text-ink outline-none focus:border-gold"
              value={cert}
              onChange={(e) => setCert(e.target.value)}
              aria-label="Certification"
            >
              <option value="">Certification: all</option>
              {CERTS.map((c) => <option key={c}>{c}</option>)}
            </select>
            <AnimatePresence>
              {chips.map((ch) => (
                <motion.button
                  key={ch.key + ch.label}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={ch.clear}
                  className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 font-mono text-[0.75rem] text-gold"
                >
                  {ch.label} <X className="h-3 w-3" />
                </motion.button>
              ))}
            </AnimatePresence>
            <span className="ml-auto font-mono text-[0.75rem] text-ink-faint">
              {filtered.length} listing{filtered.length === 1 ? "" : "s"}
            </span>
          </div>
        </div>
      </div>

      {/* S3 Grid */}
      <section className="content-wrap section-pad">
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((l, i) => (
              <ListingCard key={l.id} listing={l} index={i} onOpen={setActive} />
            ))}
          </AnimatePresence>
        </motion.div>
        {filtered.length === 0 && (
          <p className="py-20 text-center font-mono text-sm text-ink-faint">
            No listings match your filters.
          </p>
        )}
      </section>

      {/* S5 Why trade here */}
      <section className="border-y border-hairline bg-panel">
        <div className="content-wrap grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { value: 100, suffix: "%", label: "KYC-verified counterparties", decimals: 0 },
            { value: 2.4, suffix: "B+", prefix: "$", label: "Escrow-protected settlement volume", decimals: 1 },
            { value: 156, suffix: "", label: "Third-party inspections at load ports", decimals: 0 },
            { value: 9, suffix: "", label: "Avg days to deal close (vs 47 industry)", decimals: 0 },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="border-l border-hairline pl-6"
            >
              {"prefix" in s && <span className="font-mono text-3xl font-semibold text-gold md:text-4xl">$</span>}
              <Counter to={s.value} suffix={s.suffix} decimals={s.decimals} />
              <p className="mt-2 text-sm text-ink-dim">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* S6 CTA */}
      <section className="content-wrap section-pad text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="kicker">/// FOR PRODUCERS</p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.2rem)] font-bold">
            Want to list your production?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-dim">
            Join 1,200+ verified Brazilian producers selling directly to international buyers.
          </p>
          <Link
            to="/signup"
            className="mt-8 inline-block rounded-[10px] bg-gold px-8 py-3.5 font-semibold text-navy transition-all hover:scale-[1.02] hover:bg-gold-soft hover:shadow-[0_0_28px_rgba(201,162,39,0.35)]"
          >
            Open a Producer Account
          </Link>
        </motion.div>
      </section>

      <ListingModal listing={active} onClose={() => setActive(null)} />
    </div>
  );
}
