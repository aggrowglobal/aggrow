import { motion } from "framer-motion";
import { Link } from "react-router";
import { ShieldCheck, FileCheck, Scale, BadgeCheck } from "lucide-react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const rise = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE, delay: i * 0.08 },
  }),
};

const PAIRS = [
  { pain: "Months to find suppliers", gain: "AI-matched verified producers" },
  { pain: "No quality visibility", gain: "Third-party inspection before payment" },
  { pain: "Fraud risk", gain: "Escrowed smart contracts" },
  { pain: "Opaque freight", gain: "Instant all-in landed cost" },
];

const CORRIDORS = [
  { route: "Santos → Shanghai", time: "22–26 days" },
  { route: "Santos → Rotterdam", time: "14–18 days" },
  { route: "Paranaguá → Dubai", time: "24–28 days" },
  { route: "Itaqui → Mumbai", time: "26–30 days" },
];

const STATS = [
  { value: "3,100+", label: "Verified producers" },
  { value: "100%", label: "Escrow-protected" },
  { value: "9-day", label: "Avg close vs. 47 industry" },
  { value: "156", label: "Ports served" },
];

const BADGES = ["SGS", "Intertek", "GAFTA"];

export default function Buyers() {
  return (
    <div className="bg-abyss">
      {/* S1 — Hero */}
      <section className="relative flex min-h-[100dvh] items-center overflow-hidden pt-[72px]">
        <motion.img
          src="/buyer-port.jpg"
          alt="Container port at blue hour"
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: EASE }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-navy/40" />
        <div className="content-wrap relative">
          <motion.p variants={rise} initial="hidden" animate="show" className="kicker">
            /// FOR BUYERS
          </motion.p>
          <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.4rem,5vw,4.2rem)] font-bold leading-[1.05] text-white">
            {"Source Verified Brazilian Commodities in Days, Not Months.".split(" ").map((w, i) => (
              <motion.span
                key={i}
                className="mr-[0.28em] inline-block"
                initial={{ opacity: 0, y: "110%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.1 + i * 0.05 }}
              >
                {w}
              </motion.span>
            ))}
          </h1>
          <motion.p
            variants={rise}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/80"
          >
            KYC-verified producers, inspected cargo, escrowed contracts, and transparent freight —
            across 47 trade corridors.
          </motion.p>
          <motion.div
            variants={rise}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              to="/signup?role=buyer"
              className="rounded-[10px] bg-gold px-7 py-3.5 font-semibold text-navy transition-all hover:scale-[1.02] hover:bg-gold-soft hover:shadow-[0_0_24px_rgba(201,162,39,0.35)]"
            >
              Sign Up as Buyer
            </Link>
            <Link
              to="/marketplace"
              className="rounded-[10px] border border-white/40 bg-white/15 px-7 py-3.5 font-medium text-white backdrop-blur transition-colors hover:border-gold hover:text-gold-soft"
            >
              Browse Marketplace
            </Link>
          </motion.div>
        </div>
      </section>

      {/* S2 — Pain → Solutions */}
      <section className="content-wrap section-pad">
        <p className="kicker">/// SOURCING, FIXED</p>
        <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.2rem)] font-bold">
          From friction to contract.
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PAIRS.map((p, i) => (
            <motion.div
              key={p.pain}
              initial={{ opacity: 0, rotateX: 8, y: 30 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
              className="card-hover rounded-2xl border border-hairline bg-panel p-7"
              style={{ transformPerspective: 800 }}
            >
              <p className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-alert">
                {p.pain}
              </p>
              <div className="my-4 h-px w-full bg-gradient-to-r from-gold/60 to-transparent" />
              <p className="font-display text-[1.1rem] font-semibold text-gold">{p.gain}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* S3 — Corridor Showcase */}
      <section className="border-t border-hairline">
        <div className="content-wrap section-pad grid items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: EASE }}
            className="overflow-hidden rounded-2xl border border-hairline bg-panel"
          >
            <img src="/corridor-map.svg" alt="Trade corridor map from Brazilian ports" className="w-full" />
          </motion.div>
          <div>
            <p className="kicker">/// TRADE CORRIDORS</p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.2rem)] font-bold">
              47 corridors. 156 ports.
            </h2>
            <div className="mt-8 divide-y divide-hairline rounded-2xl border border-hairline bg-panel">
              {CORRIDORS.map((c, i) => (
                <motion.div
                  key={c.route}
                  variants={rise}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  custom={i}
                  className="flex items-center justify-between px-6 py-4"
                >
                  <span className="font-medium">{c.route}</span>
                  <span className="font-mono text-[0.85rem] text-gold">{c.time}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* S4 — Quality & Inspection */}
      <section className="border-t border-hairline">
        <div className="content-wrap section-pad grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ clipPath: "inset(0 0 0 100%)" }}
            whileInView={{ clipPath: "inset(0 0 0 0%)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.1, ease: EASE }}
            className="overflow-hidden rounded-2xl border border-hairline"
          >
            <img
              src="/buyer-inspection.jpg"
              alt="Quality inspector examining grain samples at port silo"
              className="w-full object-cover"
            />
          </motion.div>
          <div>
            <p className="kicker">/// QUALITY & INSPECTION</p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.2rem)] font-bold">
              Every cargo, inspected. Every contract, certified.
            </h2>
            <ul className="mt-8 space-y-5">
              {[
                { icon: ShieldCheck, text: "SGS / Intertek inspection at load port, before payment releases" },
                { icon: FileCheck, text: "Digital quality certificates attached to every contract" },
                { icon: Scale, text: "Dedicated dispute-resolution desk with arbitration support" },
              ].map((f, i) => (
                <motion.li
                  key={f.text}
                  variants={rise}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  custom={i}
                  className="flex items-start gap-4"
                >
                  <f.icon className="mt-1 h-5 w-5 shrink-0 text-gold" />
                  <span className="text-ink-dim">{f.text}</span>
                </motion.li>
              ))}
            </ul>
            <div className="mt-10 flex gap-4">
              {BADGES.map((b, i) => (
                <motion.span
                  key={b}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: EASE, delay: i * 0.1 }}
                  className="flex items-center gap-2 rounded-[10px] border border-gold/40 bg-gold/10 px-5 py-2.5 font-mono text-[0.85rem] text-gold"
                >
                  <BadgeCheck className="h-4 w-4" /> {b}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* S5 — Buyer Numbers */}
      <section className="border-t border-hairline bg-panel">
        <div className="content-wrap grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              variants={rise}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i}
              className="text-center"
            >
              <div className="font-mono text-4xl font-semibold text-gold md:text-5xl">{s.value}</div>
              <div className="mt-3 text-sm text-ink-dim">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* S6 — Testimonial */}
      <section className="border-t border-hairline">
        <div className="content-wrap section-pad text-center">
          <motion.div
            className="mx-auto mb-10 h-px w-24 bg-gold"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
          />
          <blockquote className="mx-auto max-w-4xl font-display text-[1.6rem] leading-snug font-semibold">
            {"“AGGROW replaced three brokers and a month of emails. Our ICUMSA 45 supply is now contracted quarterly with full inspection reports.”"
              .split(" ")
              .map((w, i) => (
                <motion.span
                  key={i}
                  className="mr-[0.28em] inline-block"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: EASE, delay: i * 0.02 }}
                >
                  {w}
                </motion.span>
              ))}
          </blockquote>
          <p className="mt-8 font-mono text-[0.8rem] uppercase tracking-[0.14em] text-ink-faint">
            Li Wei — Procurement Director, Shanghai
          </p>
        </div>
      </section>

      {/* S7 — CTA Band */}
      <section className="border-t border-gold/30 bg-gradient-to-r from-gold/15 via-gold/8 to-transparent">
        <div className="content-wrap flex flex-col items-start justify-between gap-8 py-20 md:flex-row md:items-center">
          <h2 className="max-w-2xl font-display text-[clamp(2rem,4vw,3.2rem)] font-bold">
            Contract your next cargo this week.
          </h2>
          <Link
            to="/signup?role=buyer"
            className="shrink-0 rounded-[10px] bg-gold px-8 py-4 font-semibold text-navy transition-all hover:scale-[1.02] hover:bg-gold-soft hover:shadow-[0_0_24px_rgba(201,162,39,0.35)]"
          >
            Sign Up as Buyer
          </Link>
        </div>
      </section>
    </div>
  );
}
