import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, EyeOff, Loader2, X } from "lucide-react";
import { Toaster, toast } from "sonner";
import { Field, inputCls } from "@/components/auth/fields";
import Logo from "@/components/Logo";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SESSION_KEY = "aggrow_demo_session";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
  const [loading, setLoading] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const [resetOpen, setResetOpen] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const err: typeof errors = {};
    if (!EMAIL_RE.test(email.trim())) err.email = "Enter a valid email";
    if (password.length < 8) err.password = "Password must be at least 8 characters";
    if (Object.keys(err).length > 0) {
      setErrors({ ...err, form: "Invalid email or password" });
      setShakeKey((k) => k + 1);
      return;
    }
    setErrors({});
    setLoading(true);
    // Demo auth — no real backend
    setTimeout(() => {
      localStorage.setItem(
        SESSION_KEY,
        JSON.stringify({ email: email.trim(), remember, ts: Date.now() })
      );
      setLoading(false);
      toast.success("Welcome back — your dashboard is being prepared");
    }, 1000);
  };

  return (
    <div className="relative flex min-h-[calc(100dvh-72px)] items-center justify-center px-6 py-16">
      <Toaster theme="light" position="top-center" richColors />
      {/* Gold radial glow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px]"
        style={{
          background:
            "radial-gradient(ellipse 60% 100% at 50% 0%, rgba(201,162,39,0.08), transparent)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[440px]"
      >
        <div className="mb-8 flex justify-center">
          <Link to="/">
            <Logo className="h-10" />
          </Link>
        </div>

        <motion.div
          key={shakeKey}
          animate={shakeKey > 0 ? { x: [0, -8, 8, -5, 5, 0] } : undefined}
          transition={{ duration: 0.35 }}
          className="rounded-[16px] border border-hairline bg-panel p-10"
        >
          <h1 className="font-display text-3xl text-ink">Welcome back.</h1>
          <p className="mt-2 text-sm text-ink-dim">Access your trading desk.</p>

          <motion.form
            onSubmit={handleSubmit}
            noValidate
            className="mt-8 space-y-5"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.06 } } }}
          >
            <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
              <Field label="Email" error={errors.email}>
                <input
                  type="email"
                  className={inputCls(errors.email)}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors((er) => ({ ...er, email: undefined, form: undefined }));
                  }}
                  placeholder="you@company.com"
                  autoComplete="email"
                />
              </Field>
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
              <Field label="Password" error={errors.password}>
                <div className="relative">
                  <input
                    type={showPw ? "text" : "password"}
                    className={`${inputCls(errors.password)} pr-12`}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrors((er) => ({ ...er, password: undefined, form: undefined }));
                    }}
                    placeholder="Minimum 8 characters"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    aria-label={showPw ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint transition-colors hover:text-gold"
                  >
                    {showPw ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </Field>
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={remember}
                  onClick={() => setRemember((v) => !v)}
                  className={`flex h-5 w-5 items-center justify-center rounded-[5px] border transition-all ${
                    remember ? "border-gold bg-gold" : "border-hairline bg-elev"
                  }`}
                >
                  {remember && (
                    <svg viewBox="0 0 12 12" className="h-3 w-3">
                      <path d="M2 6.5 L4.8 9 L10 3" fill="none" stroke="#0B1F3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
                <span className="text-sm text-ink-dim">Remember me</span>
              </div>
              <button
                type="button"
                onClick={() => setResetOpen(true)}
                className="text-sm text-gold underline-offset-2 hover:underline"
              >
                Forgot password?
              </button>
            </motion.div>

            {errors.form && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-[10px] border border-alert/50 bg-alert/10 px-4 py-3 text-sm text-alert"
              >
                {errors.form}
              </motion.p>
            )}

            <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-[10px] bg-gold px-7 py-4 text-sm font-semibold text-navy transition-all hover:scale-[1.02] hover:bg-gold-soft hover:shadow-[0_0_24px_rgba(201,162,39,0.35)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
              >
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                {loading ? "Signing in…" : "Sign In"}
              </button>
            </motion.div>
          </motion.form>

          <div className="my-6 flex items-center gap-4">
            <span className="h-px flex-1 bg-hairline" />
            <span className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-ink-faint">or</span>
            <span className="h-px flex-1 bg-hairline" />
          </div>

          <Link
            to="/signup"
            className="block rounded-[10px] border border-hairline py-3.5 text-center text-sm font-medium text-ink transition-colors hover:border-gold hover:text-gold"
          >
            Create an account
          </Link>
        </motion.div>

        <p className="mt-8 text-center text-[0.8rem] leading-relaxed text-ink-faint">
          Need help? ggabbert@aggrowglobal.com · +55 16 99723-1330 · WhatsApp
        </p>
      </motion.div>

      <ResetModal open={resetOpen} initialEmail={email} onClose={() => setResetOpen(false)} />
    </div>
  );
}

function ResetModal({
  open,
  initialEmail,
  onClose,
}: {
  open: boolean;
  initialEmail: string;
  onClose: () => void;
}) {
  const [email, setEmail] = useState(initialEmail);
  const [error, setError] = useState<string | undefined>();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setEmail(initialEmail);
      setError(undefined);
      setSent(null);
      setSending(false);
    }
  }, [open, initialEmail]);

  const send = (e: FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setError("Enter a valid email");
      return;
    }
    setError(undefined);
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(email.trim());
    }, 900);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-navy/80 p-6 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
            className="w-full max-w-[420px] rounded-[16px] border border-hairline bg-elev p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-start justify-between">
              <h3 className="font-display text-xl text-ink">Reset your password</h3>
              <button onClick={onClose} aria-label="Close" className="text-ink-dim transition-colors hover:text-gold">
                <X className="h-5 w-5" />
              </button>
            </div>

            {sent ? (
              <div className="mt-6 text-center">
                <svg viewBox="0 0 64 64" className="mx-auto h-16 w-16">
                  <motion.circle
                    cx="32" cy="32" r="28" fill="none" stroke="#C9A227" strokeWidth="2.5"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                  <motion.path
                    d="M20 33 l8 8 l16 -17" fill="none" stroke="#C9A227" strokeWidth="3"
                    strokeLinecap="round" strokeLinejoin="round"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
                  />
                </svg>
                <p className="mt-5 text-sm leading-relaxed text-ink-dim">
                  If an account exists for <span className="text-ink">{sent}</span>, a reset link
                  is on its way.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 w-full rounded-[10px] border border-hairline py-3 text-sm font-medium text-ink transition-colors hover:border-gold hover:text-gold"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={send} noValidate className="mt-6 space-y-5">
                <p className="text-sm text-ink-dim">
                  Enter your account email and we'll send you a secure reset link.
                </p>
                <Field label="Email" error={error}>
                  <input
                    type="email"
                    className={inputCls(error)}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError(undefined);
                    }}
                    placeholder="you@company.com"
                    autoComplete="email"
                  />
                </Field>
                <button
                  type="submit"
                  disabled={sending}
                  className="flex w-full items-center justify-center gap-2 rounded-[10px] bg-gold py-3.5 text-sm font-semibold text-navy transition-all hover:bg-gold-soft disabled:opacity-60"
                >
                  {sending && <Loader2 className="h-4 w-4 animate-spin" />}
                  {sending ? "Sending…" : "Send reset link"}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
