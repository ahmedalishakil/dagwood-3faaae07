import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Shield, X } from "lucide-react";
import { Link } from "react-router-dom";

const STORAGE_KEY = "dagwood-policies-accepted";

const PolicyAcceptance = () => {
  const [accepted, setAccepted] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "true") {
      setAccepted(true);
      setDismissed(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setAccepted(true);
    setTimeout(() => setDismissed(true), 1500);
  };

  if (dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-80 max-w-[calc(100vw-3rem)]"
      >
        <div className="rounded-2xl border border-border bg-card p-5 shadow-2xl">
          {!accepted ? (
            <>
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <h4 className="text-sm font-bold text-card-foreground">Our Policies</h4>
                </div>
                <button
                  onClick={() => setDismissed(true)}
                  className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-secondary"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="mb-4 text-xs leading-relaxed text-muted-foreground">
                By continuing to use Dagwood's services, you agree to our Terms & Conditions, Privacy Policy, Shipping Policy, and Return & Refund Policy.
              </p>
              <button
                onClick={handleAccept}
                className="w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                I Accept All Policies
              </button>
            </>
          ) : (
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-3 py-1"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/10">
                <Check className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-sm font-medium text-card-foreground">Policies accepted!</p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PolicyAcceptance;
