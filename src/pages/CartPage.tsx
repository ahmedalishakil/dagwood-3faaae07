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
  const { cart, cartCount, cartTotal, updateQuantity, removeItem, addToCart } = useCart();
  const navigate = useNavigate();
  const deliveryFee = 200;

  const upsellItems = useMemo(() => {
    if (cart.length === 0) return [];
    const cartBaseIds = new Set(cart.map((i) => i.id.replace(/-\d+$/, "")));
    const cartCategories = new Set(
      cart.map((i) => {
        const baseId = i.id.replace(/-\d+$/, "");
        return menuItems.find((m) => m.id === baseId)?.category;
      }).filter(Boolean) as string[]
    );
    const suggestedCats = new Set<string>();
    cartCategories.forEach((cat) => {
      CATEGORY_PAIRING[cat]?.forEach((p) => suggestedCats.add(p));
    });
    const candidates = menuItems.filter(
      (m) => suggestedCats.has(m.category) && !cartBaseIds.has(m.id)
    );
    return [...candidates].sort(() => Math.random() - 0.5).slice(0, 4);
  }, [cart]);

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

            {/* Upsell */}
            {upsellItems.length > 0 && (
              <div className="mt-8">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="h-5 w-5 text-accent" />
                  <h3 className="font-display text-lg font-bold text-foreground">Complete Your Meal</h3>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {upsellItems.map((upsell) => (
                    <motion.button
                      key={upsell.id}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => addToCart(upsell)}
                      className="flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-card-hover"
                    >
                      <div className="relative aspect-[3/2] w-full overflow-hidden">
                        <img src={upsell.image} alt={upsell.name} className="h-full w-full object-cover" />
                        <span className="absolute bottom-1.5 right-1.5 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground shadow">
                          + Add
                        </span>
                      </div>
                      <div className="px-2.5 py-2 text-left">
                        <p className="text-xs font-semibold text-card-foreground leading-tight line-clamp-1">{upsell.name}</p>
                        <p className="mt-0.5 text-xs font-bold text-primary">Rs. {upsell.price.toLocaleString()}</p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Summary (sticky on mobile) */}
            <div className="mt-8 rounded-2xl border border-border bg-card p-6">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-medium text-card-foreground">Rs. {cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery Fee</span>
                  <span className="font-medium text-card-foreground">Rs. {deliveryFee.toLocaleString()}</span>
                </div>
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
