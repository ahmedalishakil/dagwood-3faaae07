import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Plus, Minus, Trash2, ArrowLeft } from "lucide-react";
import DagwoodHeader from "@/components/DagwoodHeader";
import SmartUpsell from "@/components/SmartUpsell";
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
  if (item.customization.specialNote) parts.push(`"${item.customization.specialNote}"`);
  return parts.join(" · ");
};

const CartPage = () => {
  const { cart, cartCount, cartTotal, updateQuantity, removeItem, addToCart, orderType } = useCart();
  const navigate = useNavigate();
  const deliveryFee = orderType === "delivery" ? 200 : 0;

  return (
    <div className="min-h-screen bg-background">
      <DagwoodHeader />

      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground sm:text-3xl">Your Cart</h1>
            <p className="mt-1 text-sm text-muted-foreground">{cartCount} item{cartCount !== 1 ? "s" : ""}</p>
          </div>
          <Link
            to="/"
            className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card py-20 text-center">
            <ShoppingBag className="mb-4 h-20 w-20 text-muted-foreground/20" />
            <h2 className="font-display text-xl font-bold text-card-foreground">Your cart is empty</h2>
            <p className="mt-2 text-sm text-muted-foreground">Add some delicious items from our menu</p>
            <button
              onClick={() => navigate("/")}
              className="mt-6 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-md"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <>
            {/* Cart items */}
            <div className="space-y-4">
              <AnimatePresence>
                {cart.map((item) => {
                  const customText = formatCustomization(item);
                  const unitPrice = item.price + (item.extrasTotal || 0);
                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="flex gap-4 rounded-2xl border border-border bg-card p-4"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-20 rounded-xl object-cover sm:h-24 sm:w-24"
                      />
                      <div className="flex flex-1 flex-col justify-between min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <h3 className="font-display text-base font-bold text-card-foreground sm:text-lg">
                              {item.name}
                            </h3>
                            {customText && (
                              <p className="mt-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                                {customText}
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="shrink-0 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center gap-1 rounded-full border border-border">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-8 text-center text-sm font-bold text-card-foreground">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <div className="text-right">
                            <p className="text-base font-bold text-primary">
                              Rs. {(unitPrice * item.quantity).toLocaleString()}
                            </p>
                            {item.quantity > 1 && (
                              <p className="text-xs text-muted-foreground">
                                Rs. {unitPrice.toLocaleString()} each
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Smart Upsell */}
            <SmartUpsell />

            {/* Summary (sticky on mobile) */}
            <div className="mt-8 rounded-2xl border border-border bg-card p-6">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-medium text-card-foreground">Rs. {cartTotal.toLocaleString()}</span>
                </div>
                {orderType === "delivery" && (
                  <div className="flex justify-between text-muted-foreground">
                    <span>Delivery Fee</span>
                    <span className="font-medium text-card-foreground">Rs. {deliveryFee.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-border pt-3 text-lg font-bold text-card-foreground">
                  <span>Total</span>
                  <span className="text-primary">Rs. {(cartTotal + deliveryFee).toLocaleString()}</span>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/checkout")}
                className="mt-5 w-full rounded-xl bg-primary py-4 text-sm font-bold text-primary-foreground shadow-lg"
              >
                Proceed to Checkout — Rs. {(cartTotal + deliveryFee).toLocaleString()}
              </motion.button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
