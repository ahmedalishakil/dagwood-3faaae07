import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import DagwoodHeader from "@/components/DagwoodHeader";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderNumber, amount } = (location.state as { orderNumber?: string; amount?: number }) || {};

  return (
    <div className="min-h-screen bg-background">
      <DagwoodHeader />
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 15 }}
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100"
        >
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </motion.div>

        <h1 className="font-display text-2xl font-bold text-foreground">Payment Successful!</h1>
        <p className="mt-2 text-sm text-muted-foreground">Your payment has been processed successfully.</p>

        {orderNumber && (
          <div className="mt-6 rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground">Order Number</p>
            <p className="text-lg font-bold text-card-foreground">{orderNumber}</p>
            {amount && (
              <>
                <p className="mt-2 text-xs text-muted-foreground">Amount Paid</p>
                <p className="text-lg font-bold text-primary">Rs. {amount.toLocaleString()}</p>
              </>
            )}
          </div>
        )}

        <button
          onClick={() => navigate("/")}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Menu
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
