import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";

const STORAGE_KEY = "dagwood-cookie-consent";

const PolicyAcceptance = () => {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setDismissed(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setDismissed(true);
  };

  const handleReject = () => {
    localStorage.setItem(STORAGE_KEY, "rejected");
    setDismissed(true);
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
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cookie className="h-5 w-5 text-primary" />
              <h4 className="text-sm font-bold text-card-foreground">Cookie Consent</h4>
            </div>
            <button
              onClick={handleReject}
              className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-secondary"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="mb-4 text-xs leading-relaxed text-muted-foreground">
            We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept", you consent to our use of cookies.
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleReject}
              className="flex-1 rounded-xl border border-border px-4 py-2.5 text-sm font-bold text-muted-foreground transition-colors hover:bg-secondary"
            >
              Reject
            </button>
            <button
              onClick={handleAccept}
              className="flex-1 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Accept
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PolicyAcceptance;
