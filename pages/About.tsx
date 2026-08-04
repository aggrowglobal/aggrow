import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MessageCircle, MapPin, Languages, Eye, BadgeCheck, Zap, Sprout, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { trpc } from "@/providers/trpc";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const rise = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE, delay: i * 0.08 },
  }),
};

const TIMELINE = [
  { year: "2021", text: "Founded in São Paulo by commodity traders and engineers." },
  { year: "2022", text: "First 100 producers onboarded across Mato Grosso and Paraná." },
  { year: "2023", text: "Trade finance launch — $500M in cumulative volume." },
  { year: "2024", text: "47 trade corridors live; AI producer tools launched." },
  { year: "2025", text: "$2.4B+ cumulative volume across 156 ports." },
];

const VALUES = [
  { icon: Eye, title: "Transparency", desc: "Live pricing, public fees, and no hidden margins — ever." },
  { icon: BadgeCheck, title: "Verification", desc: "Every counterparty KYC-verified, every cargo inspected." },
  { icon: Zap, title: "Speed", desc: "Nine-day average deal close versus a 47-day industry norm." },
  { icon: Sprout, title: "Producer-First", desc: "We exist so the people who grow the food keep more of its value." },
];

const TOPICS = ["Producer", "Buyer", "Other"];

const inputCls =
  "w-full rounded-[10px] border border-hairline bg-elev px-4 py-3.5 text-ink placeholder:text-ink-faint transition-colors focus:border-gold focus:outline-none focus:ring-[3px] focus:ring-gold/15";

export default function About() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("Producer");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const send = trpc.contact.send.useMutation();

  const validate = () => {
    const e: Record<string, string> = {};
    if (name.trim().length < 2) e.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Please enter a valid email.";
    if (message.trim().length < 10) e.message = "Message must be at least 10 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    send.mutate({ name: name.trim(), email: email.trim(), topic, message: message.trim() });
  };

  return (
    <div className="bg-abyss">
      {/* S1 — Hero */}
      <section className="relative flex min-h-[90dvh] items-center overflow-hidden pt-[72px]">
        <motion.img
          src="/about-saopaulo.jpg"
          alt="São Paulo skyline at dusk"
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: EASE }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/40" />
        <div className="content-wrap relative">
          <motion.p variants={rise} initial="hidden" animate="show" className="kicker">
            /// ABOUT AGGROW GLOBAL
          </motion.p>
          <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.4rem,5vw,4.2rem)] font-bold leading-[1.05] text-white">
            {"Institutional Infrastructure, Built in São Paulo for the World's Tables.".split(" ").map((w, i) => (
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
            className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80"
          >
            Our mission is to democratize global market access for Brazilian agriculture — replacing
            opaque broker chains with verified, escrowed, data-driven trade.
          </motion.p>
        </div>
      </section>

      {/* S2 — Timeline */}
      <section className="content-wrap section-pad">
        <p className="kicker">/// OUR STORY</p>
        <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.2rem)] font-bold">
          From São Paulo to 156 ports.
        </h2>
        <div className="relative mt-14">
          <motion.div
            className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-gold via-gold/40 to-transparent md:left-1/2"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.6, ease: EASE }}
            style={{ transformOrigin: "top" }}
          />
          <div className="space-y-12">
            {TIMELINE.map((t, i) => (
              <motion.div
                key={t.year}
                variants={rise}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.5 }}
                custom={i}
                className={`relative flex md:w-1/2 ${
                  i % 2 === 0 ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"
                } pl-12 md:pl-0 ${i % 2 !== 0 ? "md:pl-12" : ""}`}
              >
                <span className="absolute left-[9px] top-2 h-3 w-3 rounded-full border-2 border-gold bg-abyss md:hidden" />
                <div>
                  <div className="font-mono text-2xl font-semibold text-gold">{t.year}</div>
                  <p className="mt-2 text-ink-dim">{t.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* S3 — Team / Office */}
      <section className="border-t border-hairline">
        <div className="content-wrap section-pad grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.1, ease: EASE }}
            className="overflow-hidden rounded-2xl border border-hairline"
          >
            <img src="/about-team.jpg" alt="AGGROW team in a working session" className="w-full object-cover" />
          </motion.div>
          <motion.div variants={rise} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <p className="kicker">/// THE TEAM</p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.2rem)] font-bold">
              Traders, engineers, and compliance officers.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-dim">
              A senior team of commodity traders, software engineers, and compliance officers across
              São Paulo, Singapore, and Dubai — building the rails for institutional-grade
              agricultural trade, 24 hours a day.
            </p>
          </motion.div>
        </div>
      </section>

      {/* S4 — Values */}
      <section className="border-t border-hairline">
        <div className="content-wrap section-pad">
          <p className="kicker">/// VALUES</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.2rem)] font-bold">What we trade on.</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                variants={rise}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                custom={i}
                className="card-hover rounded-2xl border border-hairline bg-panel p-7"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold/30 bg-gold/10">
                  <v.icon className="h-6 w-6 text-gold" />
                </div>
                <h3 className="mt-5 font-display text-[1.35rem] font-semibold">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-dim">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* S5 — Contact */}
      <section className="border-t border-hairline">
        <div className="content-wrap section-pad">
          <p className="kicker">/// CONTACT</p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.2rem)] font-bold">Talk to us.</h2>
          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {/* Info card */}
            <motion.div
              variants={rise}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="rounded-2xl border border-hairline bg-panel p-8"
            >
              <h3 className="font-display text-xl font-semibold">AGGROW Global HQ</h3>
              <div className="mt-8 space-y-6">
                <a
                  href="mailto:ggabbert@aggrowglobal.com"
                  className="flex items-center gap-4 text-ink-dim transition-colors hover:text-gold"
                >
                  <Mail className="h-5 w-5 shrink-0 text-gold" />
                  ggabbert@aggrowglobal.com
                </a>
                <a
                  href="tel:+5516997231330"
                  className="flex items-center gap-4 text-ink-dim transition-colors hover:text-gold"
                >
                  <Phone className="h-5 w-5 shrink-0 text-gold" />
                  +55 16 99723-1330
                </a>
                <a
                  href="https://wa.me/5516997231330"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 rounded-[10px] bg-harvest px-5 py-3 font-semibold text-white transition-all hover:scale-[1.02] hover:brightness-110"
                >
                  <MessageCircle className="h-5 w-5" /> WhatsApp us
                </a>
                <div className="flex items-start gap-4 text-ink-dim">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold" />
                  <span>
                    Av. Faria Lima, São Paulo, BR
                    <br />
                    <span className="font-mono text-[0.8rem] text-ink-faint">
                      Offices: São Paulo · Singapore · Dubai
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-4 border-t border-hairline pt-6 text-ink-dim">
                  <Languages className="h-5 w-5 shrink-0 text-gold" />
                  <div className="flex flex-wrap gap-2">
                    {["EN", "PT", "中文", "ES", "AR"].map((l) => (
                      <span
                        key={l}
                        className="rounded-md border border-hairline px-2 py-1 font-mono text-[0.7rem] text-ink-faint"
                      >
                        {l}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.form
              onSubmit={onSubmit}
              noValidate
              variants={rise}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={1}
              className="rounded-2xl border border-hairline bg-panel p-8"
            >
              {send.isSuccess ? (
                <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: EASE }}
                  >
                    <CheckCircle2 className="h-14 w-14 text-harvest" />
                  </motion.div>
                  <h3 className="mt-6 font-display text-xl font-semibold">Message sent</h3>
                  <p className="mt-2 text-sm text-ink-dim">
                    We reply within one business day.
                  </p>
                </div>
              ) : (
                <div className="space-y-5">
                  <div>
                    <label htmlFor="contact-name" className="caption-label mb-2 block font-mono text-[0.7rem]">
                      Name
                    </label>
                    <input
                      id="contact-name"
                      className={`${inputCls} ${errors.name ? "border-alert" : ""}`}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                    />
                    {errors.name && <p className="mt-1.5 text-[0.8rem] text-alert">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="caption-label mb-2 block font-mono text-[0.7rem]">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      className={`${inputCls} ${errors.email ? "border-alert" : ""}`}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                    />
                    {errors.email && <p className="mt-1.5 text-[0.8rem] text-alert">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="contact-topic" className="caption-label mb-2 block font-mono text-[0.7rem]">
                      I am a
                    </label>
                    <select
                      id="contact-topic"
                      className={inputCls}
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                    >
                      {TOPICS.map((t) => (
                        <option key={t} value={t} className="bg-elev">
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="caption-label mb-2 block font-mono text-[0.7rem]">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      className={`${inputCls} resize-none ${errors.message ? "border-alert" : ""}`}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can we help?"
                    />
                    {errors.message && <p className="mt-1.5 text-[0.8rem] text-alert">{errors.message}</p>}
                  </div>

                  {send.isError && (
                    <div className="flex items-center gap-2 rounded-[10px] border border-alert/40 bg-alert/10 px-4 py-3 text-sm text-alert">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      Something went wrong — please try again or email us directly.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={send.isPending}
                    className="flex w-full items-center justify-center gap-2 rounded-[10px] bg-gold px-7 py-3.5 font-semibold text-navy transition-all hover:scale-[1.02] hover:bg-gold-soft hover:shadow-[0_0_24px_rgba(201,162,39,0.35)] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {send.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </div>
              )}
            </motion.form>
          </div>
        </div>
      </section>
    </div>
  );
}
