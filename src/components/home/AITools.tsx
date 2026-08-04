import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  FileUp,
  Satellite,
  TrendingUp,
  PieChart,
  Warehouse,
  Zap,
  ArrowRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const TOOLS = [
  { icon: FileUp, title: "Upload Invoices", desc: "OCR reads paper invoices into structured costs — no manual entry." },
  { icon: Satellite, title: "Track Your Farm", desc: "Satellite imagery + weather intelligence per field, updated daily." },
  { icon: TrendingUp, title: "Production Forecasting", desc: "Yield prediction per harvest, calibrated to your region." },
  { icon: PieChart, title: "Cost Breakdown", desc: "Per-hectare cost intelligence across inputs, labor and logistics." },
  { icon: Warehouse, title: "Inventory & Stock", desc: "Silo-level stock tracking with volume and quality records." },
  { icon: Zap, title: "Auto-List for Sale", desc: "One-click marketplace listing when international prices peak." },
];

export default function AITools() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".ai-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 85%" },
        }
      );
    },
    { scope: root }
  );

  return (
    <section ref={root} className="section-pad border-t border-hairline">
      <div className="content-wrap">
        <p className="kicker">/// PRODUCER INTELLIGENCE</p>
        <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.2rem)] font-bold">
          An AI back-office for every farm.
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((t) => (
            <div
              key={t.title}
              className="ai-card card-hover group rounded-2xl border border-hairline bg-panel p-7"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 transition-transform duration-500 group-hover:rotate-90">
                <t.icon className="h-5 w-5 text-gold" />
              </div>
              <h3 className="mt-5 font-display text-[1.35rem] font-semibold">{t.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-dim">{t.desc}</p>
              <span className="mt-4 inline-flex translate-y-1 items-center gap-1.5 text-sm font-medium text-gold opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                Learn more <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
