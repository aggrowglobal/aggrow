import { motion } from "framer-motion";
import { Link } from "react-router";
import {
  ArrowRight,
  FileUp,
  MapPin,
  TrendingUp,
  PieChart,
  Warehouse,
  ListChecks,
  CheckCircle2,
} from "lucide-react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const rise = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE, delay: i * 0.08 },
  }),
};

const PAINS = [
  { pain: "Middlemen take a 20–30% discount", gain: "Direct buyer contracts" },
  { pain: "60–90 day payment delays", gain: "Settlement in days, escrowed" },
  { pain: "No price transparency", gain: "Live market pricing on screen" },
  { pain: "Export paperwork burden", gain: "Automated documentation" },
];

const AI_TOOLS = [
  {
    icon: FileUp,
    title: "Upload Invoices",
    bullets: ["AI reads NF-e invoices in seconds", "Instant cost & margin extraction", "Auto-linked to your cargo lots"],
  },
  {
    icon: MapPin,
    title: "Track Your Farm",
    bullets: ["Satellite crop monitoring", "Geo-tagged production records", "Export-grade traceability"],
  },
  {
    icon: TrendingUp,
    title: "Production Forecasting",
    bullets: ["Yield forecasts per field", "Sell windows vs. price curves", "Hedge timing suggestions"],
  },
  {
    icon: PieChart,
    title: "Cost Breakdown",
    bullets: ["Per-hectare cost analysis", "Freight & tax modeling", "Net price vs. local sale"],
  },
  {
    icon: Warehouse,
    title: "Inventory & Stock",
    bullets: ["Silo-level stock tracking", "Quality grades per lot", "Expiry & moisture alerts"],
  },
  {
    icon: ListChecks,
    title: "Auto-List for Sale",
    bullets: ["One-click cargo listings", "Matched to verified buyers", "Smart reserve pricing"],
  },
];

const STATS = [
  { value: "12,400+", label: "Producers onboarded" },
  { value: "+18%", label: "Avg net price vs. local sale" },
  { value: "9-day", label: "Average deal close" },
  { value: "R$0", label: "Listing fee" },
];

const STEPS = [
  { n: "01", title: "Register with CNPJ", desc: "Five-minute onboarding with your company registration." },
  { n: "02", title: "Upload export license", desc: "Single PDF — verified within 24 hours." },
  { n: "03", title: "List your first cargo", desc: "AI-matched to verified international buyers." },
];

export default function Producers() {
  return (
    <div className="bg-abyss">
      {/* S1 — Hero */}
      <section className="content-wrap grid items-center gap-12 py-[72px] md:grid-cols-2 md:py-[120px]">
        <div>
          <motion.p variants={rise} initial="hidden" animate="show" className="kicker">
            /// FOR PRODUCERS
          </motion.p>
          <h1 className="mt-6 font-display text-[clamp(2.4rem,5vw,4.2rem)] font-bold leading-[1.05]">
            {"Sell Direct to the World. Keep the 25% You're Losing.".split(" ").map((w, i) => (
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
            className="mt-6 max-w-xl text-lg leading-relaxed text-ink-dim"
          >
            No middlemen. No 90-day waits. Verified international buyers, escrowed payment, and
            freight handled.
          </motion.p>
          <motion.div
            variants={rise}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              to="/signup?role=producer"
              className="rounded-[10px] bg-gold px-7 py-3.5 font-semibold text-navy transition-all hover:scale-[1.02] hover:bg-gold-soft hover:shadow-[0_0_24px_rgba(201,162,39,0.35)]"
            >
              Sign Up as Producer
            </Link>
            <Link
              to="/how-it-works"
              className="rounded-[10px] border border-hairline px-7 py-3.5 font-medium text-ink transition-colors hover:border-gold hover:text-gold"
            >
              See how it works
            </Link>
          </motion.div>
        </div>
        <motion.div
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
          className="overflow-hidden rounded-2xl border border-hairline"
        >
          <motion.img
            src="/producer-portrait.jpg"
            alt="Brazilian soybean producer in field at dawn"
            className="h-full w-full object-cover"
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.6, ease: EASE }}
          />
        </motion.div>
      </section>

      {/* S2 — Pain → Gain */}
      <section className="border-t border-hairline">
        <div className="content-wrap section-pad">
          <p className="kicker">/// THE SHIFT</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.2rem)] font-bold">
            Every pain, flipped.
          </h2>
          <div className="mt-12 space-y-4">
            {PAINS.map((p, i) => (
              <motion.div
                key={p.pain}
                variants={rise}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.6 }}
                custom={i}
                className="grid overflow-hidden rounded-2xl border border-hairline bg-panel md:grid-cols-2"
              >
                <div className="flex items-center gap-3 border-b border-hairline p-6 opacity-50 md:border-b-0 md:border-r">
                  <span className="font-mono text-[0.75rem] text-alert">OLD WAY</span>
                  <span className="text-ink-dim line-through decoration-alert/50">{p.pain}</span>
                </div>
                <div className="flex items-center gap-3 p-6">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-gold" />
                  <span className="font-medium text-gold">{p.gain}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* S3 — AI Tools Grid */}
      <section className="relative border-t border-hairline">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url(/producer-drone.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy via-navy/80 to-navy" />
        <div className="content-wrap section-pad relative">
          <p className="kicker">/// AI TOOLKIT</p>
          <h2 className="mt-4 max-w-2xl font-display text-[clamp(2rem,4vw,3.2rem)] font-bold text-white">
            Precision tools for the modern fazenda.
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {AI_TOOLS.map((t, i) => (
              <motion.div
                key={t.title}
                variants={rise}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                custom={i}
                whileHover={{ rotateX: 1.5, rotateY: -1.5 }}
                className="card-hover rounded-2xl border border-hairline bg-panel/90 p-7 backdrop-blur"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold/30 bg-gold/10">
                  <t.icon className="h-6 w-6 text-gold" />
                </div>
                <h3 className="mt-5 font-display text-[1.35rem] font-semibold">{t.title}</h3>
                <ul className="mt-4 space-y-2">
                  {t.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-ink-dim">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* S4 — Testimonial */}
      <section className="border-t border-hairline">
        <div className="content-wrap section-pad flex flex-col items-center gap-10 text-center">
          <motion.img
            src="/producer-portrait.jpg"
            alt="Ricardo M., soybean producer"
            className="h-28 w-28 rounded-full border-2 border-gold object-cover object-top"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
          />
          <blockquote className="max-w-4xl font-display text-[1.6rem] leading-snug font-semibold">
            {"“We sold 12,000 MT of non-GMO soy to a buyer in Shanghai in eleven days — at 22% above our local cooperative price.”"
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
          <p className="font-mono text-[0.8rem] uppercase tracking-[0.14em] text-ink-faint">
            Ricardo M. — Soybean Producer, Mato Grosso
          </p>
        </div>
      </section>

      {/* S5 — Numbers Band */}
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

      {/* S6 — Onboarding Steps */}
      <section className="border-t border-hairline">
        <div className="content-wrap section-pad">
          <p className="kicker">/// GET STARTED</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.2rem)] font-bold">
            Selling globally in three steps.
          </h2>
          <div className="relative mt-12 grid gap-8 md:grid-cols-3">
            <motion.div
              className="absolute left-0 top-6 hidden h-px w-full bg-gradient-to-r from-gold/60 via-gold/20 to-transparent md:block"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: EASE }}
              style={{ transformOrigin: "left" }}
            />
            {STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                variants={rise}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i}
                className="relative"
              >
                <div className="font-mono text-5xl font-semibold text-gold/40">{s.n}</div>
                <h3 className="mt-4 font-display text-[1.35rem] font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-dim">{s.desc}</p>
              </motion.div>
            ))}
          </div>
          <Link
            to="/signup?role=producer"
            className="mt-12 inline-flex items-center gap-2 rounded-[10px] bg-gold px-7 py-3.5 font-semibold text-navy transition-all hover:scale-[1.02] hover:bg-gold-soft hover:shadow-[0_0_24px_rgba(201,162,39,0.35)]"
          >
            Start now <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* S7 — CTA Band */}
      <section className="border-t border-gold/30 bg-gradient-to-r from-gold/15 via-gold/8 to-transparent">
        <div className="content-wrap flex flex-col items-start justify-between gap-8 py-20 md:flex-row md:items-center">
          <h2 className="max-w-2xl font-display text-[clamp(2rem,4vw,3.2rem)] font-bold">
            Your harvest deserves a world market.
          </h2>
          <Link
            to="/signup?role=producer"
            className="shrink-0 rounded-[10px] bg-gold px-8 py-4 font-semibold text-navy transition-all hover:scale-[1.02] hover:bg-gold-soft hover:shadow-[0_0_24px_rgba(201,162,39,0.35)]"
          >
            Sign Up as Producer
          </Link>
        </div>
      </section>
    </div>
  );
}
