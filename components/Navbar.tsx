import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import Logo from "./Logo";

const LINKS = [
  { to: "/marketplace", label: "Marketplace" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/platform", label: "Platform" },
  { to: "/producers", label: "Producers" },
  { to: "/buyers", label: "Buyers" },
  { to: "/freight", label: "Freight" },
  { to: "/compliance", label: "Compliance" },
  { to: "/about", label: "About" },
];

const LANGS = ["EN", "PT", "中文", "ES", "AR"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState("EN");
  const [langOpen, setLangOpen] = useState(false);
  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 h-[72px] border-b border-hairline bg-white/85 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? "shadow-[0_10px_40px_-15px_rgba(11,31,58,0.18)]" : ""
      }`}
    >
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-6 md:px-10">
        <Link to="/" className="flex items-center gap-2" aria-label="AGGROW Global home">
          <Logo className="h-8" />
        </Link>

        <nav className="hidden items-center gap-6 xl:flex">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `gold-underline-sweep text-[0.85rem] font-medium transition-colors ${
                  isActive ? "text-gold" : "text-ink-dim hover:text-ink"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="flex items-center gap-1 rounded-[10px] border border-hairline px-3 py-2 font-mono text-[0.75rem] text-ink-dim transition-colors hover:border-gold hover:text-gold"
              aria-label="Select language"
            >
              {lang} <ChevronDown className="h-3.5 w-3.5" />
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-0 top-full mt-2 w-28 overflow-hidden rounded-[10px] border border-hairline bg-elev py-1 shadow-xl"
                >
                  {LANGS.map((l) => (
                    <li key={l}>
                      <button
                        onClick={() => {
                          setLang(l);
                          setLangOpen(false);
                        }}
                        className={`w-full px-4 py-2 text-left font-mono text-[0.75rem] transition-colors hover:bg-panel ${
                          l === lang ? "text-gold" : "text-ink-dim"
                        }`}
                      >
                        {l}
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* AUTH-SLOT */}
          <Link
            to="/signin"
            className="hidden rounded-[10px] border border-hairline px-4 py-2 text-[0.85rem] font-medium text-ink transition-colors hover:border-gold hover:text-gold md:block"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="hidden rounded-[10px] bg-gold px-5 py-2.5 text-[0.85rem] font-semibold text-navy transition-all hover:scale-[1.02] hover:bg-gold-soft hover:shadow-[0_0_24px_rgba(201,162,39,0.35)] md:block"
          >
            Open Account
          </Link>

          <button
            className="text-ink xl:hidden"
            onClick={() => setDrawer(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {createPortal(
        <AnimatePresence>
        {drawer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col bg-white/98 backdrop-blur-xl xl:hidden"
          >
            <div className="flex h-[72px] items-center justify-between border-b border-hairline px-6">
              <Logo className="h-8" />
              <button onClick={() => setDrawer(false)} aria-label="Close menu" className="text-ink">
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col gap-2 overflow-y-auto px-6 py-8">
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.35 }}
                >
                  <NavLink
                    to={l.to}
                    onClick={() => setDrawer(false)}
                    className={({ isActive }) =>
                      `block border-b border-hairline/60 py-4 font-display text-2xl ${
                        isActive ? "text-gold" : "text-ink"
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
              {/* AUTH-SLOT */}
              <div className="mt-8 flex flex-col gap-3">
                <Link
                  to="/signin"
                  onClick={() => setDrawer(false)}
                  className="rounded-[10px] border border-hairline py-3 text-center font-medium text-ink"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setDrawer(false)}
                  className="rounded-[10px] bg-gold py-3 text-center font-semibold text-navy"
                >
                  Open Account
                </Link>
                <div className="mt-2 flex justify-center gap-3">
                  {LANGS.map((l) => (
                    <button
                      key={l}
                      onClick={() => setLang(l)}
                      className={`font-mono text-[0.75rem] ${l === lang ? "text-gold" : "text-ink-faint"}`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            </nav>
          </motion.div>
        )}
        </AnimatePresence>,
        document.body
      )}
    </motion.header>
  );
}
