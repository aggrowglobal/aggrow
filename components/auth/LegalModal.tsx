import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const LEGAL_TEXT: Record<"terms" | "privacy", { title: string; body: string[] }> = {
  terms: {
    title: "Terms of Trade",
    body: [
      "These Terms of Trade govern access to and use of the AGGROW Global institutional commodity trading platform. By submitting an application, you represent that you are duly authorized to act on behalf of the legal entity identified in your application.",
      "All trades executed through the platform are subject to documentary verification, KYC/AML screening, and sanctions compliance review. AGGROW Global acts as a trade infrastructure provider and does not take title to commodities unless expressly agreed in a separate trade confirmation.",
      "Escrow settlement, inspection, and logistics services are provided pursuant to individual trade agreements. Placeholder legal text — final terms are provided during onboarding by our compliance desk.",
    ],
  },
  privacy: {
    title: "Privacy Policy (LGPD)",
    body: [
      "AGGROW Global processes personal and corporate data in accordance with the Brazilian Lei Geral de Proteção de Dados (LGPD, Law 13.709/2018) and applicable international data protection regulations.",
      "Data submitted through this application — including company registration numbers, contact details, and licensing documents — is used exclusively for identity verification, compliance screening, and platform provisioning. Data is encrypted in transit (TLS 1.3) and at rest (AES-256).",
      "You may request access, correction, or deletion of your data at any time by contacting ggabbert@aggrowglobal.com. Placeholder legal text — the full policy is provided during onboarding.",
    ],
  },
};

export default function LegalModal({
  kind,
  onClose,
}: {
  kind: "terms" | "privacy" | null;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {kind && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-navy/80 p-6 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-lg rounded-[16px] border border-hairline bg-elev p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-start justify-between">
              <h3 className="font-display text-xl text-ink">{LEGAL_TEXT[kind].title}</h3>
              <button
                onClick={onClose}
                aria-label="Close"
                className="text-ink-dim transition-colors hover:text-gold"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-5 max-h-[50vh] space-y-4 overflow-y-auto pr-2">
              {LEGAL_TEXT[kind].body.map((p, i) => (
                <p key={i} className="text-sm leading-relaxed text-ink-dim">
                  {p}
                </p>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
