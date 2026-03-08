import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2, Clock, MessageCircle,
  ChefHat, PackageCheck, Bike, UtensilsCrossed,
} from "lucide-react";
import DagwoodHeader from "@/components/DagwoodHeader";

type Step = {
  icon: typeof CheckCircle2;
  label: string;
  subtitle: string;
};

const DELIVERY_STEPS: Step[] = [
  { icon: CheckCircle2, label: "Order Confirmed", subtitle: "We've received your order" },
  { icon: ChefHat, label: "Preparing", subtitle: "Your food is being made with care" },
  { icon: PackageCheck, label: "Ready for Rider", subtitle: "Packed & handed to delivery" },
  { icon: Bike, label: "On the Way", subtitle: "Rider is heading to your location" },
  { icon: UtensilsCrossed, label: "Delivered!", subtitle: "Enjoy your meal 🎉" },
];

const PICKUP_STEPS: Step[] = [
  { icon: CheckCircle2, label: "Order Confirmed", subtitle: "We've received your order" },
  { icon: ChefHat, label: "Preparing", subtitle: "Your food is being made with care" },
  { icon: PackageCheck, label: "Ready for Pickup!", subtitle: "Head to the counter & collect 🎉" },
];

// Delays between steps (seconds) — simulates real progression
const STEP_DELAYS = [0, 0, 8, 14, 22]; // cumulative-ish; we use intervals

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
  const steps = orderType === "delivery" ? DELIVERY_STEPS : PICKUP_STEPS;
  const [activeCount, setActiveCount] = useState(2); // starts with 2 steps active

  // Auto-advance steps
  useEffect(() => {
    if (activeCount >= steps.length) return;

    // Each subsequent step takes progressively longer
    const delays = orderType === "delivery" ? [6000, 10000, 12000] : [8000];
    const nextDelay = delays[activeCount - 2] ?? 8000;

    const timer = setTimeout(() => {
      setActiveCount((c) => Math.min(c + 1, steps.length));
    }, nextDelay);

    return () => clearTimeout(timer);
  }, [activeCount, steps.length, orderType]);

  const WHATSAPP_LINK = `https://wa.me/923262188824?text=Hi%20Sandy!%20I%20just%20placed%20order%20${encodeURIComponent(orderNumber)}.%20Can%20you%20help%20me%20track%20it%3F`;

  const allDone = activeCount >= steps.length;

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
        <h1 className="font-display text-3xl font-bold text-foreground">Order Placed!</h1>
        <p className="mt-2 text-muted-foreground">
          Thank you for your order. Your food is being prepared with love!
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

        {/* Tracking Timeline */}
        <div className="mt-5 w-full rounded-2xl border border-border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <h3 className="font-display text-base font-bold text-card-foreground">
                {orderType === "delivery" ? "Delivery Tracking" : "Pickup Status"}
              </h3>
            </div>
            {!allDone && (
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                Live
              </span>
            )}
          </div>

          <div className="relative ml-1">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isLast = idx === steps.length - 1;
              const isActive = idx < activeCount;
              const isCurrentStep = idx === activeCount - 1;
              const nextActive = !isLast && idx + 1 < activeCount;

              return (
                <div key={step.label} className="flex items-start gap-3">
                  {/* Dot + Line */}
                  <div className="flex flex-col items-center">
                    <motion.div
                      initial={idx >= 2 ? { scale: 0.5, opacity: 0 } : false}
                      animate={{
                        scale: isActive ? 1 : 0.85,
                        opacity: 1,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                      className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-colors duration-500 ${
                        isActive
                          ? "border-primary bg-primary/10"
                          : "border-border bg-muted"
                      } ${isCurrentStep && !allDone ? "ring-2 ring-primary/20 ring-offset-2 ring-offset-card" : ""}`}
                    >
                      <Icon
                        className={`h-4 w-4 transition-colors duration-500 ${
                          isActive ? "text-primary" : "text-muted-foreground/40"
                        }`}
                      />
                    </motion.div>
                    {!isLast && (
                      <div className="relative w-0.5 overflow-hidden bg-border" style={{ height: "24px" }}>
                        <motion.div
                          className="absolute inset-0 bg-primary"
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: nextActive ? 1 : 0 }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          style={{ transformOrigin: "top" }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Label */}
                  <motion.div
                    className="pb-4 text-left -mt-0.5"
                    animate={{ opacity: isActive ? 1 : 0.4 }}
                    transition={{ duration: 0.4 }}
                  >
                    <p
                      className={`text-sm font-semibold transition-colors duration-500 ${
                        isActive ? "text-card-foreground" : "text-muted-foreground/50"
                      }`}
                    >
                      {step.label}
                      {isCurrentStep && !allDone && (
                        <motion.span
                          className="ml-2 inline-block text-xs font-normal text-primary"
                          animate={{ opacity: [1, 0.4, 1] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                          In Progress…
                        </motion.span>
                      )}
                    </p>
                    <p
                      className={`text-xs transition-colors duration-500 ${
                        isActive ? "text-muted-foreground" : "text-muted-foreground/35"
                      }`}
                    >
                      {step.subtitle}
                    </p>
                  </motion.div>
                </div>
              );
            })}
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
            <p className="text-sm font-bold text-card-foreground">Track with Sandy</p>
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
