import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { XCircle, ArrowLeft, RotateCcw } from "lucide-react";
import DagwoodHeader from "@/components/DagwoodHeader";

const PaymentFailed = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderNumber, error } = (location.state as { orderNumber?: string; error?: string }) || {};

  return (
    <div className="min-h-screen bg-background">
      <DagwoodHeader />
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 15 }}
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100"
        >
          <XCircle className="h-10 w-10 text-red-600" />
        </motion.div>

        <h1 className="font-display text-2xl font-bold text-foreground">Payment Failed</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {error || "Something went wrong with your payment. Please try again."}
        </p>

        {orderNumber && (
          <div className="mt-6 rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground">Order Number</p>
            <p className="text-lg font-bold text-card-foreground">{orderNumber}</p>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={() => navigate("/checkout")}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground"
          >
            <RotateCcw className="h-4 w-4" />
            Try Again
          </button>
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

export default PaymentFailed;
