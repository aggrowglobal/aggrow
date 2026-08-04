import { motion } from "framer-motion";
import { Link } from "react-router";
import FreightCalculatorFull from "../components/freight/FreightCalculatorFull";
import CorridorMap from "../components/freight/CorridorMap";
import PortNetwork from "../components/freight/PortNetwork";
import IncotermExplainer from "../components/freight/IncotermExplainer";
import DocsAutomation from "../components/freight/DocsAutomation";

export default function Freight() {
  return (
    <div>
      {/* S1 Hero */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden">
        <motion.img
          src="/freight-bulk-carrier.jpg"
          alt="Loaded Panamax bulk carrier crossing open ocean"
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ scale: 1 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 20, ease: "linear" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/55 to-navy/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,162,39,0.08),transparent_60%)]" />
        <div className="content-wrap relative pb-20 pt-44">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="kicker"
          >
            /// FREIGHT & LOGISTICS
          </motion.p>
          <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.4rem,5vw,4.2rem)] font-bold leading-[1.05] text-white">
            {"Ocean Freight, Priced in Seconds. Tracked to the Berth.".split(" ").map((w, i) => (
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
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-5 max-w-xl text-white/80"
          >
            Instant quotes across 156 ports, vessel booking, and automated export documentation.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-8"
          >
            <a
              href="#calculator"
              className="inline-block rounded-[10px] bg-gold px-7 py-3.5 font-semibold text-navy transition-all hover:scale-[1.02] hover:bg-gold-soft hover:shadow-[0_0_28px_rgba(201,162,39,0.35)]"
            >
              Get an Instant Quote
            </a>
          </motion.div>
        </div>
      </section>

      {/* S2 Calculator */}
      <FreightCalculatorFull />

      {/* S3 Corridor map */}
      <CorridorMap />

      {/* S4 Port network */}
      <PortNetwork />

      {/* S5 Incoterms */}
      <IncotermExplainer />

      {/* S6 Documentation */}
      <DocsAutomation />

      {/* Imagery band */}
      <section className="relative overflow-hidden border-t border-hairline">
        <img
          src="/buyer-port.jpg"
          alt="Container port at blue hour"
          className="h-[38vh] w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="content-wrap pb-8">
            <p className="font-mono text-[0.75rem] uppercase tracking-[0.22em] text-white/80">
              156 ports · 47 corridors · berth-level telemetry
            </p>
          </div>
        </div>
      </section>

      {/* S7 CTA */}
      <section className="content-wrap section-pad text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="kicker">/// LANDED COST, LOCKED IN</p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.2rem)] font-bold">
            Get an all-in landed cost for your cargo.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ink-dim">
            Run the calculator, book capacity, and let our desk handle the paperwork.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="#calculator"
              className="rounded-[10px] bg-gold px-8 py-3.5 font-semibold text-navy transition-all hover:scale-[1.02] hover:bg-gold-soft hover:shadow-[0_0_28px_rgba(201,162,39,0.35)]"
            >
              Open Calculator
            </a>
            <Link
              to="/signup"
              className="rounded-[10px] border border-hairline px-8 py-3.5 font-medium text-ink transition-colors hover:border-gold hover:text-gold"
            >
              Open Account
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
