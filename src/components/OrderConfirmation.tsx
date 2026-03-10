import { motion } from "framer-motion";
import { CheckCircle2, MessageCircle } from "lucide-react";
import DagwoodHeader from "@/components/DagwoodHeader";

interface OrderConfirmationProps {
  orderNumber: string;
  orderType: "delivery" | "pickup";
  orderTotal: number;
  pickupBranch: "vertical" | "pia";
  onBackToMenu: () => void;
}

const OrderConfirmation = ({
  orderNumber,
  orderType,
  orderTotal,
  pickupBranch,
  onBackToMenu,
}: OrderConfirmationProps) => {
  const WHATSAPP_LINK = `https://wa.me/923262188824?text=Hi%20Sandy%20AI!%20I%20just%20placed%20order%20${encodeURIComponent(orderNumber)}.%20Can%20you%20help%20me%20track%20it%3F`;

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
          Please check your WhatsApp for order status or additional information.
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
              <span className="text-muted-foreground">
                {orderType === "delivery" ? "Delivery" : "Pickup"}
              </span>
              <span className="font-bold text-card-foreground">
                {orderType === "delivery"
                  ? "To your address"
                  : pickupBranch === "vertical"
                  ? "Vertical Branch"
                  : "PIA Branch"}
              </span>
            </div>
            <div className="flex justify-between border-t border-border pt-3">
              <span className="text-muted-foreground">Total Paid</span>
              <span className="text-lg font-bold text-primary">
                Rs. {orderTotal.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

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
