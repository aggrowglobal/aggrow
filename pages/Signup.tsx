import { useCallback, useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { Link, useSearchParams } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import type { FileRejection } from "react-dropzone";
import { trpc } from "@/providers/trpc";
import LegalModal from "@/components/auth/LegalModal";
import { Field, SearchableSelect, inputCls } from "@/components/auth/fields";
import Logo from "@/components/Logo";
import {
  FileText,
  Loader2,
  Lock,
  ShieldCheck,
  Sprout,
  Upload,
  X,
} from "lucide-react";

type Role = "producer" | "buyer";

const COMMODITIES = [
  "Soybeans Non-GMO",
  "Corn Yellow #2",
  "Raw Sugar ICUMSA 45",
  "Coffee Arabica 17/18",
  "Beef Frozen 90VL",
  "Chicken Whole Frozen",
  "Wheat Hard Red",
  "Soybean Meal 48%",
  "Ethanol Anhydrous",
  "Cotton Lint 28mm",
  "Other",
];

const COUNTRIES = [
  "Argentina", "Australia", "Austria", "Bahrain", "Bangladesh", "Belgium",
  "Brazil", "Canada", "Chile", "China", "Colombia", "Czech Republic",
  "Denmark", "Egypt", "Ethiopia", "Finland", "France", "Germany", "Ghana",
  "Greece", "Hong Kong", "India", "Indonesia", "Ireland", "Israel", "Italy",
  "Japan", "Kenya", "Malaysia", "Mexico", "Morocco", "Netherlands",
  "New Zealand", "Nigeria", "Norway", "Pakistan", "Paraguay", "Peru",
  "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia",
  "Saudi Arabia", "Singapore", "South Africa", "South Korea", "Spain",
  "Sweden", "Switzerland", "Thailand", "Turkey", "Ukraine",
  "United Arab Emirates", "United Kingdom", "United States", "Uruguay",
  "Vietnam",
];

const DRAFT_KEY = "aggrow_signup_draft";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_FILE = 10 * 1024 * 1024;

function maskCnpj(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 14);
  return d
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
}

function validCnpj(v: string) {
  const d = v.replace(/\D/g, "");
  if (d.length !== 14 || /^(\d)\1{13}$/.test(d)) return false;
  const calc = (len: number) => {
    let sum = 0;
    let pos = len - 7;
    for (let i = len; i >= 1; i--) {
      sum += Number(d[len - i]) * pos--;
      if (pos < 2) pos = 9;
    }
    const r = sum % 11;
    return r < 2 ? 0 : 11 - r;
  };
  return calc(12) === Number(d[12]) && calc(13) === Number(d[13]);
}

function readFileBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result ?? "");
      resolve(result.includes(",") ? result.split(",")[1] : result);
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function formatSize(bytes: number) {
  return bytes >= 1024 * 1024
    ? `${(bytes / 1024 / 1024).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

interface Draft {
  role: Role;
  company: string;
  cnpj: string;
  email: string;
  phone: string;
  country: string;
  commodity: string;
}

const EMPTY: Draft = {
  role: "producer",
  company: "",
  cnpj: "",
  email: "",
  phone: "",
  country: "",
  commodity: "",
};

export default function Signup() {
  const [params] = useSearchParams();
  const [form, setForm] = useState<Draft>(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) return { ...EMPTY, ...(JSON.parse(raw) as Partial<Draft>) };
    } catch {
      /* ignore */
    }
    return EMPTY;
  });
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof Draft | "terms", string>>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [legal, setLegal] = useState<"terms" | "privacy" | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ id: string; email: string } | null>(null);

  const submit = trpc.applications.submit.useMutation();

  // Preselect role via ?role= query param
  useEffect(() => {
    const q = params.get("role");
    if (q === "producer" || q === "buyer") {
      setForm((f) => ({ ...f, role: q }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist draft (file excluded)
  useEffect(() => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(form));
    } catch {
      /* ignore */
    }
  }, [form]);

  const set = useCallback(
    <K extends keyof Draft>(key: K, value: Draft[K]) => {
      setForm((f) => ({ ...f, [key]: value }));
      setErrors((e) => ({ ...e, [key]: undefined }));
      setSubmitError(null);
    },
    []
  );

  const validate = useCallback((): boolean => {
    const e: Partial<Record<keyof Draft | "terms", string>> = {};
    if (form.company.trim().length < 2) e.company = "Enter your company name (min 2 characters)";
    if (form.role === "producer") {
      if (!form.cnpj.trim()) e.cnpj = "CNPJ is required";
      else if (!validCnpj(form.cnpj)) e.cnpj = "Invalid CNPJ — check the number";
    }
    if (!EMAIL_RE.test(form.email.trim())) e.email = "Enter a valid business email";
    if (!form.phone.trim()) e.phone = "Phone is required";
    if (!form.country) e.country = "Select your country";
    if (!form.commodity) e.commodity = "Select a commodity";
    if (!terms) e.terms = "You must accept the terms to continue";
    setErrors(e);
    return Object.keys(e).length === 0;
  }, [form, terms]);

  const isValid = useMemo(() => {
    if (
      form.company.trim().length < 2 ||
      !EMAIL_RE.test(form.email.trim()) ||
      !form.phone.trim() ||
      !form.country ||
      !form.commodity ||
      !terms
    )
      return false;
    if (form.role === "producer" && (!form.cnpj.trim() || !validCnpj(form.cnpj))) return false;
    return true;
  }, [form, terms]);

  const onDrop = useCallback((accepted: File[], rejected: FileRejection[]) => {
    setFileError(null);
    if (rejected.length > 0) {
      const code = rejected[0].errors[0]?.code;
      setFileError(code === "file-too-large" ? "File exceeds 10MB" : "PDF only");
      return;
    }
    const f = accepted[0];
    if (!f) return;
    setFile(f);
    // Simulated upload progress
    setProgress(0);
    const start = Date.now();
    const tick = () => {
      const p = Math.min(100, Math.round(((Date.now() - start) / 1500) * 100));
      setProgress(p);
      if (p < 100) requestAnimationFrame(tick);
      else setTimeout(() => setProgress(null), 300);
    };
    requestAnimationFrame(tick);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxSize: MAX_FILE,
    multiple: false,
  });

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    setSubmitAttempted(true);
    if (!validate()) return;
    setSubmitError(null);
    try {
      let document: { filename: string; mime: string; base64: string } | undefined;
      if (file) {
        const base64 = await readFileBase64(file);
        document = { filename: file.name, mime: file.type || "application/pdf", base64 };
      }
      const res = await submit.mutateAsync({
        role: form.role,
        company: form.company.trim(),
        cnpj: form.cnpj.trim() || undefined,
        email: form.email.trim(),
        phone: form.phone.trim() || undefined,
        country: form.country || undefined,
        commodity: form.commodity || undefined,
        termsAccepted: true,
        document,
      });
      localStorage.removeItem(DRAFT_KEY);
      setSuccess({ id: res.applicationId, email: form.email.trim() });
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? `Submission failed: ${err.message}`
          : "Submission failed. Please try again."
      );
    }
  };

  const roleCopy =
    form.role === "producer"
      ? "List your production on a global institutional marketplace."
      : "Source commodities directly from verified Brazilian producers.";

  return (
    <div className="flex min-h-[calc(100dvh-72px)]">
      {/* Left panel — image (desktop) */}
      <motion.aside
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: "inset(0 0% 0 0)" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative hidden w-[40%] overflow-hidden lg:block"
      >
        <img
          src="/signup-field.jpg"
          alt="Hands cupping rich soil with a young soybean sprout"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/55 to-navy/20" />
        <div className="relative flex h-full flex-col justify-between p-10">
          <Logo className="h-9" variant="dark-bg" />
          <div>
            <p className="font-display text-2xl leading-snug text-white">
              “Verification in under 24 hours — join 12,400+ producers and 3,100+ buyers.”
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                { icon: Lock, label: "Escrow-protected" },
                { icon: ShieldCheck, label: "KYC verified" },
                { icon: Sprout, label: "LGPD compliant" },
              ].map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="flex items-center gap-2 rounded-full border border-white/30 bg-navy/60 px-4 py-2 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-white/80 backdrop-blur-sm"
                >
                  <Icon className="h-3.5 w-3.5 text-gold" />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Right panel — form */}
      <div className="flex flex-1 items-start justify-center px-6 py-12 md:px-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[560px]"
        >
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="rounded-[16px] border border-hairline bg-panel p-10 text-center"
              >
                <svg viewBox="0 0 64 64" className="mx-auto h-20 w-20">
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
                <h2 className="mt-6 font-display text-3xl text-ink">Application received</h2>
                <p className="mt-4 font-mono text-lg tracking-[0.08em] text-gold">{success.id}</p>
                <p className="mt-4 text-sm leading-relaxed text-ink-dim">
                  Our compliance desk will verify your documents within 24 hours and email you
                  at <span className="text-ink">{success.email}</span>.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    to="/marketplace"
                    className="flex-1 rounded-[10px] bg-gold px-5 py-3 text-sm font-semibold text-navy transition-all hover:scale-[1.02] hover:bg-gold-soft"
                  >
                    Browse Marketplace
                  </Link>
                  <Link
                    to="/"
                    className="flex-1 rounded-[10px] border border-hairline px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-gold hover:text-gold"
                  >
                    Back to Home
                  </Link>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
                onSubmit={handleSubmit}
                noValidate
                className="rounded-[16px] border border-hairline bg-panel p-8 md:p-10"
              >
                <p className="kicker">/// Open Account</p>
                <h1 className="mt-3 font-display text-3xl text-ink md:text-4xl">
                  Institutional Onboarding
                </h1>
                <p className="mt-3 text-sm text-ink-dim">{roleCopy}</p>

                {/* Role toggle */}
                <div className="mt-8">
                  <label className="mb-2 block font-mono text-[0.7rem] uppercase tracking-[0.14em] text-ink-dim">
                    Account type
                  </label>
                  <div className="flex rounded-[10px] border border-hairline bg-elev p-1">
                    {(["producer", "buyer"] as Role[]).map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => set("role", r)}
                        className={`relative flex-1 rounded-[8px] px-4 py-2.5 text-sm font-medium transition-colors ${
                          form.role === r ? "text-navy" : "text-ink-dim hover:text-ink"
                        }`}
                      >
                        {form.role === r && (
                          <motion.span
                            layoutId="role-pill"
                            className="absolute inset-0 rounded-[8px] bg-gold"
                            transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                          />
                        )}
                        <span className="relative z-10">
                          I'm a {r === "producer" ? "Producer" : "Buyer"}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <motion.div
                  className="mt-6 space-y-5"
                  initial="hidden"
                  animate="show"
                  variants={{ show: { transition: { staggerChildren: 0.05 } } }}
                >
                  <motion.div variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}>
                    <Field label="Company" error={errors.company}>
                      <input
                        className={inputCls(errors.company)}
                        value={form.company}
                        onChange={(e) => set("company", e.target.value)}
                        placeholder="Fazenda Boa Vista Ltda."
                        autoComplete="organization"
                      />
                    </Field>
                  </motion.div>

                  <motion.div variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}>
                    <Field
                      label={form.role === "producer" ? "CNPJ" : "Company Registration No."}
                      error={errors.cnpj}
                      hint={
                        form.role === "producer"
                          ? "Brazilian company registration — 00.000.000/0000-00"
                          : "Foreign buyers may enter their local registration number."
                      }
                    >
                      <input
                        className={`${inputCls(errors.cnpj)} font-mono`}
                        value={form.cnpj}
                        onChange={(e) =>
                          set("cnpj", form.role === "producer" ? maskCnpj(e.target.value) : e.target.value)
                        }
                        placeholder={form.role === "producer" ? "00.000.000/0000-00" : "Registration number"}
                        inputMode="numeric"
                      />
                    </Field>
                  </motion.div>

                  <motion.div variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}>
                    <Field label="Business Email" error={errors.email}>
                      <input
                        type="email"
                        className={inputCls(errors.email)}
                        value={form.email}
                        onChange={(e) => set("email", e.target.value)}
                        placeholder="you@company.com"
                        autoComplete="email"
                      />
                    </Field>
                  </motion.div>

                  <motion.div variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}>
                    <Field label="Phone" error={errors.phone} hint="International format, e.g. +55 11 90000-0000">
                      <input
                        type="tel"
                        className={`${inputCls(errors.phone)} font-mono`}
                        value={form.phone}
                        onChange={(e) => set("phone", e.target.value)}
                        placeholder="+55 11 90000-0000"
                        autoComplete="tel"
                      />
                    </Field>
                  </motion.div>

                  <motion.div variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}>
                    <Field label="Country" error={errors.country}>
                      <SearchableSelect
                        options={COUNTRIES}
                        value={form.country}
                        onChange={(v) => set("country", v)}
                        placeholder="Select country"
                        error={errors.country}
                      />
                    </Field>
                  </motion.div>

                  <motion.div variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}>
                    <Field label="Commodity of Interest" error={errors.commodity}>
                      <SearchableSelect
                        options={COMMODITIES}
                        value={form.commodity}
                        onChange={(v) => set("commodity", v)}
                        placeholder="Select commodity"
                        error={errors.commodity}
                      />
                    </Field>
                  </motion.div>

                  <motion.div variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}>
                    <Field
                      label="License / Registration Document"
                      hint={!file && !fileError ? "PDF only · max 10MB · optional at this stage" : undefined}
                    >
                      {file ? (
                        <div className="rounded-[10px] border border-hairline bg-elev p-4">
                          <div className="flex items-center gap-3">
                            <FileText className="h-8 w-8 shrink-0 text-gold" />
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm text-ink">{file.name}</p>
                              <p className="font-mono text-[0.72rem] text-ink-faint">
                                {formatSize(file.size)}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setFile(null);
                                setFileError(null);
                              }}
                              aria-label="Remove file"
                              className="rounded-[8px] border border-hairline p-2 text-ink-dim transition-colors hover:border-alert hover:text-alert"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                          {progress !== null && (
                            <div className="mt-3 h-1 overflow-hidden rounded-full bg-hairline">
                              <div
                                className="h-full rounded-full bg-gold transition-[width] duration-150"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          )}
                          <div
                            {...getRootProps({
                              className:
                                "mt-3 cursor-pointer text-center font-mono text-[0.72rem] uppercase tracking-[0.12em] text-ink-dim transition-colors hover:text-gold",
                            })}
                          >
                            <input {...getInputProps()} />
                            Replace file
                          </div>
                        </div>
                      ) : (
                        <div
                          {...getRootProps({
                            className: `flex cursor-pointer flex-col items-center gap-2 rounded-[10px] border border-dashed px-4 py-8 text-center transition-colors ${
                              fileError
                                ? "border-alert"
                                : isDragActive
                                  ? "border-gold bg-gold/5"
                                  : "border-hairline bg-elev hover:border-gold/50"
                            }`,
                          })}
                        >
                          <input {...getInputProps()} />
                          <Upload className={`h-6 w-6 ${isDragActive ? "text-gold" : "text-ink-faint"}`} />
                          <p className="text-sm text-ink-dim">
                            {isDragActive ? "Drop the PDF to attach" : "Drop your PDF here or browse"}
                          </p>
                        </div>
                      )}
                      {fileError && <p className="mt-1.5 text-[0.75rem] text-alert">{fileError}</p>}
                    </Field>
                  </motion.div>

                  <motion.div variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}>
                    <div className="flex items-start gap-3">
                      <button
                        type="button"
                        role="checkbox"
                        aria-checked={terms}
                        onClick={() => {
                          setTerms((v) => !v);
                          setErrors((e) => ({ ...e, terms: undefined }));
                        }}
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] border transition-all ${
                          terms ? "border-gold bg-gold" : errors.terms ? "border-alert" : "border-hairline bg-elev"
                        }`}
                      >
                        {terms && (
                          <svg viewBox="0 0 12 12" className="h-3 w-3">
                            <path d="M2 6.5 L4.8 9 L10 3" fill="none" stroke="#0B1F3A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </button>
                      <p className="text-sm leading-relaxed text-ink-dim">
                        I agree to the{" "}
                        <button type="button" onClick={() => setLegal("terms")} className="text-gold underline-offset-2 hover:underline">
                          Terms of Trade
                        </button>{" "}
                        and{" "}
                        <button type="button" onClick={() => setLegal("privacy")} className="text-gold underline-offset-2 hover:underline">
                          Privacy Policy (LGPD)
                        </button>
                        .
                      </p>
                    </div>
                    {errors.terms && <p className="mt-1.5 text-[0.75rem] text-alert">{errors.terms}</p>}
                  </motion.div>
                </motion.div>

                {submitError && (
                  <motion.div
                    key={submitError}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, x: [0, -6, 6, -4, 4, 0] }}
                    transition={{ duration: 0.35 }}
                    className="mt-5 rounded-[10px] border border-alert/50 bg-alert/10 px-4 py-3 text-sm text-alert"
                  >
                    {submitError}
                  </motion.div>
                )}
                {submitAttempted && Object.keys(errors).length > 0 && !submitError && (
                  <motion.p
                    animate={{ x: [0, -6, 6, -4, 4, 0] }}
                    transition={{ duration: 0.3 }}
                    className="mt-5 text-[0.8rem] text-alert"
                  >
                    Please fix the highlighted fields above.
                  </motion.p>
                )}

                <button
                  type="submit"
                  disabled={!isValid || submit.isPending}
                  className="mt-8 flex w-full items-center justify-center gap-2 rounded-[10px] bg-gold px-7 py-4 text-sm font-semibold text-navy transition-all hover:scale-[1.01] hover:bg-gold-soft hover:shadow-[0_0_24px_rgba(201,162,39,0.35)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100 disabled:hover:shadow-none"
                >
                  {submit.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                  {submit.isPending ? "Submitting application…" : "Create Institutional Account"}
                </button>

                <p className="mt-6 text-center text-sm text-ink-faint">
                  Already verified?{" "}
                  <Link to="/signin" className="text-gold underline-offset-2 hover:underline">
                    Sign In →
                  </Link>
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <LegalModal kind={legal} onClose={() => setLegal(null)} />
    </div>
  );
}
