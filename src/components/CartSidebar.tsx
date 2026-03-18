import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Plus, Minus, Trash2, X, Sparkles } from "lucide-react";
import type { CartItem } from "@/types/cart";
import { menuItems, type MenuItem } from "@/data/menu";

type Props = {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onQuickAdd: (item: MenuItem) => void;
};

const UPSELL_CATEGORIES = ["Beverages", "Desserts", "Condiments", "Chicken with Fries"];

const CATEGORY_PAIRING: Record<string, string[]> = {
  "Sandwich with Fries": ["Beverages", "Desserts", "Condiments"],
  "Chicken with Fries": ["Beverages", "Desserts", "Condiments"],
  Beverages: ["Sandwich with Fries", "Desserts", "Chicken with Fries"],
  Desserts: ["Beverages", "Sandwich with Fries"],
  Condiments: ["Sandwich with Fries", "Chicken with Fries", "Beverages"],
};

const formatCustomization = (item: CartItem): string | null => {
  if (!item.customization) return null;
  const parts: string[] = [];
  parts.push(item.customization.breadType === "bran" ? "Bran Bread" : "White Bread");
  item.customization.removals.forEach((r) => parts.push(r));
  item.customization.extras.forEach((e) =>
    parts.push(e.price > 0 ? `${e.name} +Rs.${e.price}` : e.name)
  );
  item.customization.preferences.forEach((p) => parts.push(p));
  return parts.join(", ");
};

const CartSidebar = ({ items, isOpen, onClose, onUpdateQuantity, onRemoveItem, onQuickAdd }: Props) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price + (item.extrasTotal || 0)) * item.quantity, 0);
  const gst = Math.round(subtotal * 0.16);
  const delivery = subtotal > 0 ? 150 : 0;
  const total = subtotal + gst + delivery;

  const upsellItems = useMemo(() => {
    if (items.length === 0) return [];

    // Get categories in cart (strip unique id suffixes for sandwiches)
    const cartBaseIds = new Set(items.map((i) => i.id.replace(/-\d+$/, "")));
    const cartCategories = new Set(
      items
        .map((i) => {
          const baseId = i.id.replace(/-\d+$/, "");
          return menuItems.find((m) => m.id === baseId)?.category;
        })
        .filter(Boolean) as string[]
    );

    // Build prioritized suggestion categories
    const suggestedCats = new Set<string>();
    cartCategories.forEach((cat) => {
      const pairings = CATEGORY_PAIRING[cat];
      if (pairings) pairings.forEach((p) => suggestedCats.add(p));
    });

    // If no pairings found, fallback to upsell categories
    if (suggestedCats.size === 0) {
      UPSELL_CATEGORIES.forEach((c) => suggestedCats.add(c));
    }

    // Filter menu items: not already in cart, from suggested categories
    const candidates = menuItems.filter(
      (m) => suggestedCats.has(m.category) && !cartBaseIds.has(m.id)
    );

    // Shuffle and pick up to 4
    const shuffled = [...candidates].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 4);
  }, [items]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm lg:hidden"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-border bg-card shadow-2xl lg:sticky lg:top-0 lg:z-10 lg:h-screen"
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-primary" />
                <h2 className="font-display text-lg font-bold text-card-foreground">Your Order</h2>
                <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">
                  {items.reduce((sum, i) => sum + i.quantity, 0)}
                </span>
              </div>
              <button onClick={onClose} className="rounded-full p-1 text-muted-foreground hover:bg-secondary lg:hidden">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <ShoppingBag className="mb-4 h-16 w-16 text-muted-foreground/30" />
                  <p className="text-lg font-medium text-muted-foreground">Your cart is empty</p>
                  <p className="mt-1 text-sm text-muted-foreground/70">Add items to get started</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => {
                    const customText = formatCustomization(item);
                    const unitPrice = item.price + (item.extrasTotal || 0);
                    return (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex gap-3 rounded-xl border border-border bg-background p-3"
                      >
                        <img src={item.image} alt={item.name} className="h-16 w-16 rounded-lg object-cover" />
                        <div className="flex flex-1 flex-col justify-between min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="min-w-0 flex-1">
                              <h4 className="text-sm font-semibold text-card-foreground">{item.name}</h4>
                              {customText && (
                                <p className="mt-0.5 truncate text-[11px] leading-tight text-muted-foreground">
                                  {customText}
                                </p>
                              )}
                            </div>
                            <button onClick={() => onRemoveItem(item.id)} className="ml-2 text-muted-foreground hover:text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 rounded-full border border-border">
                              <button
                                onClick={() => onUpdateQuantity(item.id, -1)}
                                className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="text-sm font-semibold text-card-foreground">{item.quantity}</span>
                              <button
                                onClick={() => onUpdateQuantity(item.id, 1)}
                                className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <span className="text-sm font-bold text-primary">Rs. {(unitPrice * item.quantity).toLocaleString()}</span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}

                  {/* Upsell Suggestions */}
                  {upsellItems.length > 0 && (
                    <div className="mt-2 pt-4 border-t border-border">
                      <div className="flex items-center gap-1.5 mb-3">
                        <Sparkles className="h-4 w-4 text-accent" />
                        <h4 className="text-sm font-bold text-card-foreground">Complete Your Meal</h4>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {upsellItems.map((upsell) => (
                          <motion.button
                            key={upsell.id}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => onQuickAdd(upsell)}
                            className="flex flex-col overflow-hidden rounded-xl border border-border bg-background transition-shadow hover:shadow-card-hover"
                          >
                            <div className="relative aspect-[3/2] w-full overflow-hidden">
                              <img
                                src={upsell.image}
                                alt={upsell.name}
                                className="h-full w-full object-cover"
                              />
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
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-border px-6 py-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>Rs. {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>GST (16%)</span>
                    <span>Rs. {gst.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Delivery</span>
                    <span>Rs. {delivery.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-2 text-base font-bold text-card-foreground">
                    <span>Total</span>
                    <span className="text-primary">Rs. {total.toLocaleString()}</span>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-4 w-full rounded-xl bg-primary py-3.5 text-sm font-bold text-primary-foreground shadow-lg transition-shadow hover:shadow-xl"
                >
                  Place Order — Rs. {total.toLocaleString()}
                </motion.button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
