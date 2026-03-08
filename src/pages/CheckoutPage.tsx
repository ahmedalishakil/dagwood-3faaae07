import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, MapPin, Truck, CreditCard, Banknote, CheckCircle2, Package } from "lucide-react";
import DagwoodHeader from "@/components/DagwoodHeader";
import { useCart } from "@/context/CartContext";
import type { CartItem } from "@/types/cart";

const formatCustomization = (item: CartItem): string | null => {
  if (!item.customization) return null;
  const parts: string[] = [];
  parts.push(item.customization.breadType === "brown" ? "Brown Bread" : "White Bread");
  item.customization.removals.forEach((r) => parts.push(r));
  item.customization.extras.forEach((e) =>
    parts.push(e.price > 0 ? `${e.name} +Rs.${e.price}` : e.name)
  );
  item.customization.preferences.forEach((p) => parts.push(p));
  return parts.join(" · ");
};

const CheckoutPage = () => {
  const { cart, cartCount, cartTotal, orderType, setOrderType, clearCart } = useCart();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [pickupBranch, setPickupBranch] = useState<"vertical" | "pia">("vertical");
  const [notes, setNotes] = useState("");
  const [payment, setPayment] = useState<"cod" | "card">("cod");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderTotal, setOrderTotal] = useState(0);
  const [orderNumber] = useState(() => `DW-${Math.floor(100000 + Math.random() * 900000)}`);

  const deliveryFee = orderType === "delivery" ? 200 : 0;
  const total = cartTotal + deliveryFee;

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-background">
        <DagwoodHeader />
        <div className="flex flex-col items-center justify-center py-32 text-center px-4">
          <Package className="mb-4 h-16 w-16 text-muted-foreground/30" />
          <h2 className="font-display text-xl font-bold text-foreground">Nothing to checkout</h2>
          <p className="mt-2 text-sm text-muted-foreground">Add some items first</p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground"
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  // Order placed success
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background">
        <DagwoodHeader />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mx-auto flex max-w-lg flex-col items-center px-4 py-20 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <CheckCircle2 className="mb-6 h-24 w-24 text-primary" />
          </motion.div>
          <h1 className="font-display text-3xl font-bold text-foreground">Order Placed!</h1>
          <p className="mt-3 text-muted-foreground">
            Thank you for your order. Your food is being prepared with love!
          </p>
          <div className="mt-6 rounded-2xl border border-border bg-card p-6 w-full">
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
                  {orderType === "delivery" ? "To your address" : pickupBranch === "vertical" ? "Vertical Branch" : "PIA Branch"}
                </span>
              </div>
              <div className="flex justify-between border-t border-border pt-3">
                <span className="text-muted-foreground">Total Paid</span>
                <span className="text-lg font-bold text-primary">Rs. {orderTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => navigate("/")}
            className="mt-8 rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground shadow-lg"
          >
            Back to Menu
          </button>
        </motion.div>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    if (orderType === "delivery" && !address.trim()) return;
    setOrderTotal(total);
    setOrderPlaced(true);
    clearCart();
    setOrderPlaced(true);
    clearCart();
  };

  const canPlaceOrder = orderType === "pickup" || address.trim().length > 0;

  return (
    <div className="min-h-screen bg-background pb-32 sm:pb-8">
      <DagwoodHeader />

      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">Checkout</h1>
          <Link to="/cart" className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
            <ArrowLeft className="h-4 w-4" />
            Edit Cart
          </Link>
        </div>

        <div className="space-y-6">
          {/* Order Summary */}
          <section className="rounded-2xl border border-border bg-card p-5">
            <h2 className="mb-4 font-display text-lg font-bold text-card-foreground">
              Order Summary ({cartCount} items)
            </h2>
            <div className="space-y-3">
              {cart.map((item) => {
                const customText = formatCustomization(item);
                const unitPrice = item.price + (item.extrasTotal || 0);
                return (
                  <div key={item.id} className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="h-12 w-12 rounded-lg object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-card-foreground">{item.name}</p>
                      {customText && (
                        <p className="truncate text-[11px] text-muted-foreground">{customText}</p>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-card-foreground">
                        Rs. {(unitPrice * item.quantity).toLocaleString()}
                      </p>
                      <p className="text-[11px] text-muted-foreground">×{item.quantity}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Delivery / Pickup */}
          <section className="rounded-2xl border border-border bg-card p-5">
            <h2 className="mb-4 font-display text-lg font-bold text-card-foreground">Delivery Method</h2>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setOrderType("delivery")}
                className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all ${
                  orderType === "delivery"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-muted-foreground/30"
                }`}
              >
                <Truck className="h-6 w-6 text-primary" />
                <span className="text-sm font-bold text-card-foreground">Delivery</span>
                <span className="text-xs text-muted-foreground">Rs. 200 fee</span>
              </button>
              <button
                onClick={() => setOrderType("pickup")}
                className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all ${
                  orderType === "pickup"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-muted-foreground/30"
                }`}
              >
                <MapPin className="h-6 w-6 text-primary" />
                <span className="text-sm font-bold text-card-foreground">Pickup</span>
                <span className="text-xs text-muted-foreground">Free · Lahore</span>
              </button>
            </div>

            <AnimatePresence>
              {orderType === "delivery" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 space-y-3">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-card-foreground">
                        Delivery Address <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="House #, Street, Area, Lahore"
                        className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              {orderType === "pickup" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4">
                    <label className="mb-2 block text-sm font-medium text-card-foreground">
                      Select Branch
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setPickupBranch("vertical")}
                        className={`flex flex-col items-center gap-1.5 rounded-xl border-2 p-3 transition-all ${
                          pickupBranch === "vertical"
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-muted-foreground/30"
                        }`}
                      >
                        <MapPin className="h-5 w-5 text-primary" />
                        <span className="text-sm font-bold text-card-foreground">Vertical</span>
                        <span className="text-[11px] text-muted-foreground text-center">M.M. Alam Road</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPickupBranch("pia")}
                        className={`flex flex-col items-center gap-1.5 rounded-xl border-2 p-3 transition-all ${
                          pickupBranch === "pia"
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-muted-foreground/30"
                        }`}
                      >
                        <MapPin className="h-5 w-5 text-primary" />
                        <span className="text-sm font-bold text-card-foreground">PIA</span>
                        <span className="text-[11px] text-muted-foreground text-center">PIA Housing Society</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* Order Notes */}
          <section className="rounded-2xl border border-border bg-card p-5">
            <h2 className="mb-4 font-display text-lg font-bold text-card-foreground">Order Notes</h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any special instructions? e.g. Don't ring doorbell, call on arrival..."
              rows={2}
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </section>

          {/* Payment */}
          <section className="rounded-2xl border border-border bg-card p-5">
            <h2 className="mb-4 font-display text-lg font-bold text-card-foreground">Payment Method</h2>
            <div className="space-y-3">
              <button
                onClick={() => setPayment("cod")}
                className={`flex w-full items-center gap-3 rounded-xl border-2 p-4 text-left transition-all ${
                  payment === "cod"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-muted-foreground/30"
                }`}
              >
                <Banknote className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-sm font-bold text-card-foreground">Cash on Delivery</p>
                  <p className="text-xs text-muted-foreground">Pay when you receive your order</p>
                </div>
              </button>
              <button
                disabled
                className="flex w-full items-center gap-3 rounded-xl border-2 border-border p-4 text-left opacity-50 cursor-not-allowed"
              >
                <CreditCard className="h-6 w-6 text-muted-foreground" />
                <div>
                  <p className="text-sm font-bold text-muted-foreground">Online Payment</p>
                  <p className="text-xs text-muted-foreground">Coming soon</p>
                </div>
              </button>
            </div>
          </section>

          {/* Totals */}
          <section className="rounded-2xl border border-border bg-card p-5">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="font-medium text-card-foreground">Rs. {cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Delivery Fee</span>
                <span className="font-medium text-card-foreground">
                  {deliveryFee > 0 ? `Rs. ${deliveryFee.toLocaleString()}` : "Free"}
                </span>
              </div>
              <div className="flex justify-between border-t border-border pt-3 text-lg font-bold text-card-foreground">
                <span>Total</span>
                <span className="text-primary">Rs. {total.toLocaleString()}</span>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Fixed bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur-lg px-4 py-4 sm:static sm:mt-6 sm:border-0 sm:bg-transparent sm:backdrop-blur-none sm:px-0">
        <div className="mx-auto max-w-3xl sm:px-6">
          <motion.button
            whileHover={{ scale: canPlaceOrder ? 1.02 : 1 }}
            whileTap={{ scale: canPlaceOrder ? 0.98 : 1 }}
            onClick={handlePlaceOrder}
            disabled={!canPlaceOrder}
            className={`w-full rounded-xl py-4 text-sm font-bold shadow-lg transition-all ${
              canPlaceOrder
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            {canPlaceOrder
              ? `Place Order — Rs. ${total.toLocaleString()}`
              : "Enter delivery address to continue"}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
