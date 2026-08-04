import { Link } from "react-router";
import { Mail, Phone, MessageCircle } from "lucide-react";
import Logo from "./Logo";

const PLATFORM_LINKS = [
  { to: "/marketplace", label: "Marketplace" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/platform", label: "Platform" },
  { to: "/freight", label: "Freight & Logistics" },
  { to: "/producers", label: "For Producers" },
  { to: "/buyers", label: "For Buyers" },
];

const COMPANY_LINKS = [
  { to: "/about", label: "About" },
  { to: "/compliance", label: "Compliance" },
  { to: "/about", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-navy bg-navy">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
      <div className="content-wrap grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo className="h-10" variant="dark-bg" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">
            Premier digital infrastructure connecting Brazilian agricultural producers with
            international buyers.
          </p>
          <p className="mt-4 font-mono text-[0.75rem] leading-relaxed text-white/50">
            HQ — Av. Paulista 1000, Bela Vista
            <br />
            São Paulo, SP — Brazil
          </p>
        </div>

        <div>
          <h4 className="caption-label text-white/50">Platform</h4>
          <ul className="mt-5 space-y-3">
            {PLATFORM_LINKS.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="text-sm text-white/70 transition-colors hover:text-gold-soft">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="caption-label text-white/50">Company</h4>
          <ul className="mt-5 space-y-3">
            {COMPANY_LINKS.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="text-sm text-white/70 transition-colors hover:text-gold-soft">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-2">
            {["EN", "PT", "中文", "ES", "AR"].map((l) => (
              <span
                key={l}
                className="rounded-md border border-white/20 px-2 py-1 font-mono text-[0.7rem] text-white/50"
              >
                {l}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="caption-label text-white/50">Contact</h4>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a
                href="mailto:ggabbert@aggrowglobal.com"
                className="inline-flex items-center gap-2 text-white/70 transition-colors hover:text-gold-soft"
              >
                <Mail className="h-4 w-4 text-gold" /> ggabbert@aggrowglobal.com
              </a>
            </li>
            <li>
              <a
                href="tel:+5516997231330"
                className="inline-flex items-center gap-2 font-mono text-white/70 transition-colors hover:text-gold-soft"
              >
                <Phone className="h-4 w-4 text-gold" /> +55 16 99723-1330
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/5516997231330"
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center gap-2 rounded-[10px] bg-harvest px-4 py-2.5 font-medium text-white transition-all hover:brightness-110"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp our desk
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="content-wrap flex flex-col items-center justify-between gap-4 py-6 text-[0.8rem] text-white/50 md:flex-row">
          <span className="font-mono">© 2025 AGGROW Global. All rights reserved.</span>
          <div className="flex gap-6">
            <Link to="/about" className="transition-colors hover:text-gold-soft">Terms</Link>
            <Link to="/about" className="transition-colors hover:text-gold-soft">Privacy</Link>
            <Link to="/compliance" className="transition-colors hover:text-gold-soft">LGPD</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
