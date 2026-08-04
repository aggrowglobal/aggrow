import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Search } from "lucide-react";

export const inputCls = (error?: string) =>
  `w-full rounded-[10px] border bg-elev px-4 py-3.5 text-sm text-ink placeholder:text-ink-faint outline-none transition-all focus:border-gold focus:shadow-[0_0_0_3px_rgba(201,162,39,0.15)] ${
    error ? "border-alert" : "border-hairline"
  }`;

export function Field({
  label,
  error,
  hint,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-dim">
        {label}
      </label>
      {children}
      {error ? (
        <p className="mt-1.5 text-[0.75rem] text-alert">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-[0.75rem] text-ink-faint">{hint}</p>
      ) : null}
    </div>
  );
}

export function SearchableSelect({
  options,
  value,
  onChange,
  placeholder,
  error,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  error?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const filtered = useMemo(
    () => options.filter((o) => o.toLowerCase().includes(query.toLowerCase())),
    [options, query]
  );

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`${inputCls(error)} flex items-center justify-between text-left ${
          value ? "text-ink" : "text-ink-faint"
        }`}
      >
        <span className="truncate">{value || placeholder}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-ink-dim transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18 }}
            className="absolute z-40 mt-2 w-full overflow-hidden rounded-[10px] border border-hairline bg-elev shadow-xl"
          >
            <div className="flex items-center gap-2 border-b border-hairline px-3 py-2.5">
              <Search className="h-4 w-4 text-ink-faint" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search…"
                className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-faint"
              />
            </div>
            <ul className="max-h-56 overflow-y-auto py-1">
              {filtered.length === 0 && (
                <li className="px-4 py-3 text-sm text-ink-faint">No matches</li>
              )}
              {filtered.map((o) => (
                <li key={o}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(o);
                      setOpen(false);
                      setQuery("");
                    }}
                    className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors hover:bg-panel ${
                      o === value ? "text-gold" : "text-ink-dim"
                    }`}
                  >
                    {o}
                    {o === value && <Check className="h-4 w-4" />}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
