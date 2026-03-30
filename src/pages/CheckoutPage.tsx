import { useState } from "react";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, MapPin, Truck, Banknote, CreditCard, Package, Loader2, Smartphone, Shield } from "lucide-react";
import DagwoodHeader from "@/components/DagwoodHeader";
import SmartUpsell from "@/components/SmartUpsell";
import OrderConfirmation from "@/components/OrderConfirmation";
import { useCart } from "@/context/CartContext";
import { useDeliveryCharges } from "@/hooks/useDeliveryCharges";
import { useXPayCheckout } from "@/hooks/useXPayCheckout";
import type { CartItem } from "@/types/cart";

const formatCustomization = (item: CartItem): string | null => {
  if (!item.customization) return null;
  const parts: string[] = [];
  parts.push(item.customization.breadType === "bran" ? "Bran Bread" : "White Bread");
  item.customization.removals.forEach((r) => parts.push(r));
  item.customization.extras.forEach((e) => parts.push(e.price > 0 ? `${e.name} +Rs.${e.price}` : e.name));
  item.customization.preferences.forEach((p) => parts.push(p));
  return parts.join(" · ");
};

const CheckoutPage = () => {
  const { cart, cartCount, cartTotal, orderType, setOrderType, deliveryLocation, clearCart } = useCart();
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState(deliveryLocation?.address || "");
  const [pickupBranch, setPickupBranch] = useState<"vertical" | "pia">("pia");
  const [pickupTime, setPickupTime] = useState("asap");
  const [notes, setNotes] = useState("");
  const [payment, setPayment] = useState<"cod" | "card" | "xpay_card" | "xpay_jazzcash">("cod");
  const [modeType, setModeType] = useState<"Cash" | "Bank">("Cash");
  const xpay = useXPayCheckout();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderTotal, setOrderTotal] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrderNumber, setConfirmedOrderNumber] = useState("");
  const [psid, setPsid] = useState<string | null>(null);
  const [paymentId, setPaymentId] = useState<string | null>(null);

  const {
    deliveryFee,
    shippingAccount,
    loading: deliveryFeeLoading,
  } = useDeliveryCharges(
    orderType === "delivery" ? deliveryLocation?.nearestBranch : undefined,
    orderType === "delivery" ? deliveryLocation?.distanceKm : undefined,
  );
  const gstRate = modeType === "Bank" ? 0.05 : 0.16;
  const gst = Math.round(cartTotal * gstRate);
  const total = cartTotal + deliveryFee + gst;

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

  if (orderPlaced) {
    return (
      <OrderConfirmation
        orderNumber={confirmedOrderNumber}
        orderType={orderType}
        orderTotal={orderTotal}
        pickupBranch={pickupBranch}
        onBackToMenu={() => navigate("/")}
        psid={psid}
        paymentId={paymentId}
        paymentMethod={payment}
      />
    );
  }

  const handlePlaceOrder = async () => {
    if (orderType === "delivery" && !address.trim()) return;
    if (!customerName.trim() || !phone.trim()) return;

    setIsSubmitting(true);

    // Build API payload
    const customerIdStr = `${customerName.trim()}/+${phone.replace(/\D/g, "")}`;

    // Lookup map for removal item_codes
    const REMOVAL_CODES: Record<string, string> = {
      "Without Veggies": "TP-00001",
      "Without Jalapenos": "TP-00002",
      "Without Olives": "TP-00003",
      "Without Tomatoes": "TP-00004",
      "Without Iceberg": "TP-00005",
      "Without Onions": "TP-00006",
      "Without Mushrooms": "TP-00007",
      "Extra Saucy": "TP-00008",
      "No Sauce": "TP-00009",
      "Without Mayo": "TP-00010",
      "Without\u00a0Cheese": "TP-00011",
    };

    const orderItems = cart.map((item) => {
      const itemCode = item.item_code || item.id;

      // First addon is always the item itself
      const addons: { item_code: string; item_name: string; item_group: string; qty: number; rate: number }[] = [
        {
          item_code: itemCode,
          item_name: item.name,
          item_group: "",
          qty: item.quantity,
          rate: item.price,
        },
      ];

      // Then customization: removals (with real item_codes, rate 0) and paid extras
      if (item.customization) {
        item.customization.removals.forEach((r) => {
          addons.push({
            item_code: REMOVAL_CODES[r] || "",
            item_name: r,
            item_group: "Extra Topping",
            qty: 1,
            rate: 0,
          });
        });
        item.customization.extras.forEach((e) => {
          addons.push({
            item_code: e.item_code,
            item_name: e.name,
            item_group: "Extra Topping",
            qty: 1,
            rate: e.price,
          });
        });
      }

      return {
        item: {
          item_code: itemCode,
          item_name: item.name,
          description: item.customization
            ? `${item.customization.breadType === "bran" ? "Bran Bread" : "White Bread"}, ${[...item.customization.removals, ...item.customization.extras.map((e) => e.name), ...item.customization.preferences, item.customization.specialNote].filter(Boolean).join(", ")}`
            : "",
          rate: item.price,
          currency: "PKR",
          qty: item.quantity,
          netTotal: item.price * item.quantity,
        },
        has_addons: addons.length > 1 ? 1 : 0,
        addons,
      };
    });

    const payload = {
      order_data: {
        items: orderItems,
        customer_info: {
          customer_id: customerIdStr,
          customer_name: customerIdStr,
          mobile_no: `+${phone.replace(/\D/g, "")}`,
          email: "",
          address_line1:
            orderType === "delivery"
              ? address.length > 140
                ? address.substring(0, 137) + "..."
                : address
              : `Pickup: ${pickupBranch === "pia" ? "PIA Branch" : "Vertical Branch"}`,
          city: "Lahore",
          country: "Pakistan",
        },
        taxes:
          orderType === "delivery"
            ? [
                {
                  charge_type: "Actual",
                  account_head: shippingAccount,
                  description: "Delivery Charges",
                  tax_amount: deliveryFee,
                },
              ]
            : [],
        delivery_charges: "PIA Delivery Charges",
        branch: (() => {
          if (orderType === "pickup") {
            return pickupBranch === "vertical" ? "Dagwood PINE AVENUE" : "Dagwood PIA Take Away";
          }
          if (deliveryLocation) {
            const piaDist = Math.hypot(
              deliveryLocation.lat - 31.44530798235614,
              deliveryLocation.lng - 74.2806119771848,
            );
            const pineDist = Math.hypot(
              deliveryLocation.lat - 31.3809727527684,
              deliveryLocation.lng - 74.25553485857607,
            );
            return pineDist < piaDist ? "Dagwood PINE AVENUE" : "Dagwood PIA Take Away";
          }
          return "Dagwood PIA Take Away";
        })(),
        order_type: orderType === "delivery" ? "Delivery" : "Take Away",
        mode_type: orderType === "pickup" ? "Cash" : modeType,
        pos_profile: "PIA Take Away and Delivery",
        origin: "Website",
        company: "Dagwood PIA",
      },
    };

    try {
      const res = await fetch("https://dagwood-chatbot.lucrumerp.com/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data?.message === "Order created successfully" && data?.erp_response?.message) {
        const erpOrderNumber = data.erp_response.message;
        setConfirmedOrderNumber(erpOrderNumber);

        // If online payment, fetch PSID
        if (payment === "card") {
          try {
            const today = new Date().toISOString().split("T")[0];
            const psidRes = await fetch(
              "https://pia-dagwood.lucrumerp.com/api/method/lucrum_payments_integrations.apis.asaanbill.add_payment",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  payment_body: {
                    payment: {
                      title: "Online Payment",
                      identifier: erpOrderNumber,
                      dueDate: today,
                      amount: String(total),
                      amountAfterDueDate: String(total + 20),
                    },
                  },
                  generation_type: "",
                }),
              },
            );
            const psidData = await psidRes.json();
            if (psidData?.message?.data?.psid) {
              setPsid(psidData.message.data.psid);
              if (psidData.message.data.id) {
                setPaymentId(String(psidData.message.data.id));
              }
            } else if (typeof psidData?.message === "string") {
              setPsid(psidData.message);
            }
          } catch {
            console.error("Failed to fetch PSID");
          }
        }

        toast.success("Thank you for your order! 🎉", {
          description:
            payment === "card"
              ? "Your online payment details are ready. Please complete the payment."
              : "Please check your WhatsApp for further details. Sandy will assist you there.",
          duration: 6000,
        });
        setOrderTotal(total);
        setOrderPlaced(true);
        clearCart();
      } else {
        const errMsg = data?.detail || data?.message || "Something went wrong. Please try again.";
        toast.error("Order failed", { description: errMsg, duration: 6000 });
      }
    } catch {
      toast.error("Network error", {
        description: "Could not reach the server. Please check your connection and try again.",
        duration: 6000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const canPlaceOrder =
    customerName.trim().length > 0 && phone.trim().length > 0 && (orderType === "pickup" || address.trim().length > 0);

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
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-12 w-12 rounded-lg object-cover"
                      loading="lazy"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-card-foreground">{item.name}</p>
                      {customText && <p className="truncate text-[11px] text-muted-foreground">{customText}</p>}
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

          {/* Smart Upsell */}
          <SmartUpsell compact />

          {/* Customer Info */}
          <section className="rounded-2xl border border-border bg-card p-5">
            <h2 className="mb-4 font-display text-lg font-bold text-card-foreground">Your Details</h2>
            <div className="space-y-3">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-card-foreground">
                  Name <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-card-foreground">
                  Phone <span className="text-primary">*</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="03XX-XXXXXXX"
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
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
                <span className="text-xs text-muted-foreground">
                  {deliveryFeeLoading ? "Calculating..." : `Rs. ${deliveryFee} fee`}
                </span>
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
                  <div className="mt-4">
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
                </motion.div>
              )}
              {orderType === "pickup" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-card-foreground">Select Branch</label>
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
                          <span className="text-[11px] text-muted-foreground text-center">
                            94 Pine Ave, Block B, Khayaban E Amin
                          </span>
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
                          <span className="text-[11px] text-muted-foreground text-center">
                            9-D PIA Road, Main Blvd, near Wapda Town
                          </span>
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-card-foreground">
                        When will you pick up?
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { value: "asap", label: "ASAP", sub: "~20 min" },
                          { value: "30min", label: "In 30 min", sub: "" },
                          { value: "1hr", label: "In 1 hour", sub: "" },
                        ].map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => setPickupTime(opt.value)}
                            className={`flex flex-col items-center gap-0.5 rounded-xl border-2 px-2 py-3 text-center transition-all ${
                              pickupTime === opt.value
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-muted-foreground/30"
                            }`}
                          >
                            <span className="text-sm font-bold text-card-foreground">{opt.label}</span>
                            {opt.sub && <span className="text-[10px] text-muted-foreground">{opt.sub}</span>}
                          </button>
                        ))}
                      </div>
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
                onClick={() => {
                  setPayment("cod");
                  setModeType("Cash");
                }}
                className={`flex w-full items-center gap-3 rounded-xl border-2 p-4 text-left transition-all ${
                  payment === "cod" ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground/30"
                }`}
              >
                <Banknote className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-sm font-bold text-card-foreground">Cash on Delivery</p>
                  <p className="text-xs text-muted-foreground">Pay when you receive your order (16% GST)</p>
                </div>
              </button>

              {/* Payment mode radio buttons — only for delivery + COD */}
              {/* <AnimatePresence>
                {payment === "cod" && orderType === "delivery" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="ml-1 mt-1 space-y-2 rounded-xl border border-border bg-secondary/50 p-4">
                      <p className="text-sm font-medium text-card-foreground">Payment Mode</p>
                      <label className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-secondary">
                        <input
                          type="radio"
                          name="modeType"
                          checked={modeType === "Cash"}
                          onChange={() => setModeType("Cash")}
                          className="h-4 w-4 accent-[hsl(var(--primary))]"
                        />
                        <span className="text-sm text-card-foreground">Cash</span>
                      </label>
                      <label className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-secondary">
                        <input
                          type="radio"
                          name="modeType"
                          checked={modeType === "Bank"}
                          onChange={() => setModeType("Bank")}
                          className="h-4 w-4 accent-[hsl(var(--primary))]"
                        />
                        <span className="text-sm text-card-foreground">Online Transfer</span>
                      </label>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence> */}

              <button
                onClick={() => {
                  setPayment("card");
                  setModeType("Bank");
                }}
                className={`flex w-full items-center gap-3 rounded-xl border-2 p-4 text-left transition-all ${
                  payment === "card" ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground/30"
                }`}
              >
                <CreditCard className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-sm font-bold text-card-foreground">Online Payment</p>
                  <p className="text-xs text-muted-foreground">Pay via bank transfer (5% GST)</p>
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
              {orderType === "delivery" && (
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery Fee</span>
                  <span className="font-medium text-card-foreground">
                    {deliveryFeeLoading ? "Calculating..." : `Rs. ${deliveryFee.toLocaleString()}`}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-muted-foreground">
                <span>GST ({Math.round(gstRate * 100)}%)</span>
                <span className="font-medium text-card-foreground">Rs. {gst.toLocaleString()}</span>
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
            whileHover={{ scale: canPlaceOrder && !isSubmitting ? 1.02 : 1 }}
            whileTap={{ scale: canPlaceOrder && !isSubmitting ? 0.98 : 1 }}
            onClick={handlePlaceOrder}
            disabled={!canPlaceOrder || isSubmitting}
            className={`w-full rounded-xl py-4 text-sm font-bold shadow-lg transition-all flex items-center justify-center gap-2 ${
              canPlaceOrder && !isSubmitting
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Placing Order...
              </>
            ) : canPlaceOrder ? (
              `Place Order — Rs. ${total.toLocaleString()}`
            ) : (
              "Fill in your details to continue"
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
