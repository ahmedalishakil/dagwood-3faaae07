import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, MessageCircle, Copy, Check, Loader2, ShieldCheck, ShieldX } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import DagwoodHeader from "@/components/DagwoodHeader";

interface OrderConfirmationProps {
  orderNumber: string;
  orderType: "delivery" | "pickup";
  orderTotal: number;
  pickupBranch: "vertical" | "pia";
  onBackToMenu: () => void;
  psid?: string | null;
  paymentId?: string | null;
  paymentMethod?: "cod" | "card";
}

const OrderConfirmation = ({
  orderNumber,
  orderType,
  orderTotal,
  pickupBranch,
  onBackToMenu,
  psid,
  paymentId,
  paymentMethod,
}: OrderConfirmationProps) => {
  const [copied, setCopied] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<string>("idle");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const WHATSAPP_LINK = `https://wa.me/923262188824?text=Hi%20there!%20%F0%9F%91%8B%20I%20just%20placed%20order%20${encodeURIComponent(orderNumber)}.%20What%20would%20you%20like%20today%3F`;

  const pollPaymentStatus = async (isManual = false) => {
    if (!paymentId) return;
    if (isManual) setVerifying(true);
    try {
      const res = await fetch(
        "https://pia-dagwood.lucrumerp.com/api/method/lucrum_payments_integrations.apis.asaanbill.get_payment",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ payment_id: paymentId }),
        },
      );
      const data = await res.json();
      const status = data?.message?.data?.status;
      if (status) {
        setPaymentStatus(status);
        if (status === "PROCESSED") {
          toast.success("Payment processed successfully! 🎉");
          if (intervalRef.current) clearInterval(intervalRef.current);
        }
      } else {
        setPaymentStatus("ERROR");
      }
    } catch {
      if (isManual) setPaymentStatus("ERROR");
    } finally {
      if (isManual) setVerifying(false);
    }
  };

  // Auto-poll every 3 seconds for card payments
  useEffect(() => {
    if (paymentMethod !== "card" || !paymentId) return;
    intervalRef.current = setInterval(() => pollPaymentStatus(false), 3000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paymentMethod, paymentId]);

  // Stop polling when PROCESSED
  useEffect(() => {
    if (paymentStatus === "PROCESSED" && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, [paymentStatus]);

  const handleCopy = async () => {
    if (!psid) return;
    try {
      await navigator.clipboard.writeText(psid);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = psid;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DagwoodHeader />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto flex max-w-lg flex-col items-center px-4 py-12 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <CheckCircle2 className="mb-5 h-20 w-20 text-primary" />
        </motion.div>
        <h1 className="font-display text-3xl font-bold text-foreground">Order Placed Successfully!</h1>
        <p className="mt-2 text-muted-foreground">
          {paymentMethod === "card"
            ? "Please complete your payment using the details below."
            : "Please check your WhatsApp for order status or additional information."}
        </p>

        {/* Order details */}
        <div className="mt-5 w-full rounded-2xl border border-border bg-card p-5">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order Number</span>
              <span className="font-bold text-card-foreground">{orderNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Estimated Time</span>
              <span className="font-bold text-card-foreground">
                {orderType === "delivery" ? "35–45 min" : "15–20 min"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{orderType === "delivery" ? "Delivery" : "Pickup"}</span>
              <span className="font-bold text-card-foreground">
                {orderType === "delivery"
                  ? "To your address"
                  : pickupBranch === "vertical"
                    ? "Vertical Branch"
                    : "PIA Branch"}
              </span>
            </div>
            <div className="flex justify-between border-t border-border pt-3">
              <span className="text-muted-foreground">Total</span>
              <span className="text-lg font-bold text-primary">Rs. {orderTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* PSID Payment Section */}
        {paymentMethod === "card" && psid && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-5 w-full rounded-2xl border-2 border-primary/30 bg-card p-5"
          >
            <h2 className="mb-4 font-display text-lg font-bold text-card-foreground">Online Payment Details</h2>

            {/* QR Code */}
            <div
              className="mx-auto mb-4 flex items-center justify-center rounded-xl bg-white p-4"
              style={{ width: "fit-content" }}
            >
              <QRCodeSVG value={psid} size={180} level="H" />
            </div>

            {/* PSID Display */}
            <div className="mb-2">
              <p className="mb-1 text-xs font-medium text-muted-foreground">Payment ID (PSID)</p>
              <div className="flex items-center gap-2 rounded-xl border border-border bg-secondary/50 p-3">
                <span className="flex-1 text-center font-mono text-lg font-bold tracking-wider text-card-foreground">
                  {psid}
                </span>
                <button
                  onClick={handleCopy}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-all hover:bg-primary/90 active:scale-95"
                  title="Copy PSID"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
              {copied && <p className="mt-1 text-xs font-medium text-primary">Copied to clipboard!</p>}
            </div>

            <p className="mt-3 text-xs text-muted-foreground">
              Scan the QR code or use the PSID to complete your payment via your bank app or any payment channel.
            </p>

            {/* Payment Verification */}
            <div className="mt-4 border-t border-border pt-4">
              <button
                onClick={() => pollPaymentStatus(true)}
                disabled={verifying || paymentStatus === "PROCESSED"}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-secondary px-4 py-3 text-sm font-bold text-secondary-foreground transition-all hover:bg-secondary/80 active:scale-[0.98] disabled:opacity-60"
              >
                {verifying ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Verifying…
                  </>
                ) : paymentStatus === "PROCESSED" ? (
                  <>
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    Payment Verified
                  </>
                ) : (
                  <>
                    <ShieldCheck className="h-4 w-4" />
                    Check Payment Status
                  </>
                )}
              </button>

              <AnimatePresence>
                {paymentStatus !== "idle" && !verifying && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-3 flex items-center gap-2 rounded-xl p-3 text-sm font-medium ${
                      paymentStatus === "PROCESSED"
                        ? "bg-primary/10 text-primary"
                        : paymentStatus === "APPROVED"
                          ? "bg-amber-500/10 text-amber-700"
                          : "bg-destructive/10 text-destructive"
                    }`}
                  >
                    {paymentStatus === "PROCESSED" ? (
                      <ShieldCheck className="h-5 w-5 shrink-0" />
                    ) : (
                      <ShieldX className="h-5 w-5 shrink-0" />
                    )}
                    {paymentStatus === "DRAFT" && "PSID not assigned yet. Please wait and try again."}
                    {paymentStatus === "IN_PROCESS" && "Payment is being processed. Please wait a moment."}
                    {paymentStatus === "APPROVED" && "PSID assigned but payment not received yet. Please complete your payment."}
                    {paymentStatus === "PROCESSED" && "Payment received successfully!"}
                    {paymentStatus === "DISCARD" && "This payment link has expired. Please place a new order."}
                    {paymentStatus === "ERRORED" && "Payment processing failed. Please contact support."}
                    {paymentStatus === "ERROR" && "Unable to verify payment. Please try again."}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* Track with Sandy */}
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 flex w-full items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-all hover:shadow-md hover:border-primary/30 group"
        >
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
            <MessageCircle className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-bold text-card-foreground">Track with Sandy AI</p>
            <p className="text-xs text-muted-foreground">
              {orderType === "delivery"
                ? "Get live delivery updates on WhatsApp"
                : "Get notified when your order is ready for pickup"}
            </p>
          </div>
          <span className="flex-shrink-0 rounded-full bg-primary px-3.5 py-1.5 text-xs font-bold text-primary-foreground shadow">
            Chat
          </span>
        </a>

        <button
          onClick={onBackToMenu}
          className="mt-6 rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground shadow-lg"
        >
          Back to Menu
        </button>
      </motion.div>
    </div>
  );
};

export default OrderConfirmation;
