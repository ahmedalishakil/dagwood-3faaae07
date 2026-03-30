import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, ArrowLeft, RefreshCw, Loader2 } from "lucide-react";
import DagwoodHeader from "@/components/DagwoodHeader";
import { retrievePaymentIntent } from "@/services/xpayService";

const PaymentPending = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderNumber, amount, piId } = (location.state as { orderNumber?: string; amount?: number; piId?: string }) || {};
  const [checking, setChecking] = useState(false);

  const checkStatus = async () => {
    if (!piId) return;
    setChecking(true);
    try {
      const result = await retrievePaymentIntent(piId);
      if (result.status === "succeeded" || result.status === "captured") {
        navigate("/payment/success", { state: { orderNumber, amount }, replace: true });
      } else if (result.status === "failed" || result.status === "canceled") {
        navigate("/payment/failed", { state: { orderNumber, error: "Payment was declined" }, replace: true });
      }
    } catch {
      // stay on pending page
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DagwoodHeader />
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 15 }}
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-100"
        >
          <Clock className="h-10 w-10 text-amber-600" />
        </motion.div>

        <h1 className="font-display text-2xl font-bold text-foreground">Payment Pending</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Your payment is being verified. This usually takes a few moments.
        </p>

        {orderNumber && (
          <div className="mt-6 rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground">Order Number</p>
            <p className="text-lg font-bold text-card-foreground">{orderNumber}</p>
            {amount && (
              <>
                <p className="mt-2 text-xs text-muted-foreground">Amount</p>
                <p className="text-lg font-bold text-primary">Rs. {amount.toLocaleString()}</p>
              </>
            )}
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          {piId && (
            <button
              onClick={checkStatus}
              disabled={checking}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground disabled:opacity-50"
            >
              {checking ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              Check Status
            </button>
          )}
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-bold text-card-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPending;
