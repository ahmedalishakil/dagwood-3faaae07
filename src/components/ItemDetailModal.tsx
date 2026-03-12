import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ChevronDown, RotateCcw } from "lucide-react";
import type { MenuItem } from "@/data/menu";
import type { SandwichCustomization } from "@/types/cart";

type Props = {
  item: MenuItem;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: MenuItem, qty: number) => void;
  onAddToCartCustomized?: (item: MenuItem, customization: SandwichCustomization, extrasTotal: number) => void;
};

// Sandwich customization options
const REMOVALS = [
  { name: "Without Veggies", item_code: "TP-00001" },
  { name: "Without Jalapenos", item_code: "TP-00002" },
  { name: "Without Olives", item_code: "TP-00003" },
  { name: "Without Tomatoes", item_code: "TP-00004" },
  { name: "Without Iceberg", item_code: "TP-00005" },
  { name: "Without Onions", item_code: "TP-00006" },
  { name: "Without Mushrooms", item_code: "TP-00007" },
  { name: "Extra Saucy", item_code: "TP-00008" },
  { name: "No Sauce", item_code: "TP-00009" },
  { name: "Without Mayo", item_code: "TP-00010" },
  { name: "Without\u00a0Cheese", item_code: "TP-00011" },
];

const EXTRAS = [
  { name: "Extra Mayo", price: 80, item_code: "SD-00028" },
  { name: "Extra Chicken", price: 120, item_code: "SD-00030" },
  { name: "Cheese Sauce", price: 100, item_code: "SD-00022" },
  { name: "Extra Jalapenos", price: 80, item_code: "SD-00027" },
  { name: "Extra Olives", price: 80, item_code: "SD-00024" },
  { name: "Extra Mushrooms", price: 80, item_code: "SD-00026" },
  { name: "Extra Veggies", price: 80, item_code: "SD-00025" },
  { name: "Dynamite Sauce", price: 90, item_code: "SD-00021" },
];

const BRAN_BREAD_PRICE = 80;
const BRAN_BREAD_ITEM_CODE = "SD-00023";

const PREFERENCES = ["Cut 1/4"];

const defaultCustomization: SandwichCustomization = {
  breadType: "white",
  removals: [],
  extras: [],
  preferences: [],
  specialNote: "",
};

const ItemDetailModal = ({ item, isOpen, onClose, onAddToCart, onAddToCartCustomized }: Props) => {
  const [selectedSize, setSelectedSize] = useState(0);
  const [qty, setQty] = useState(1);
  const [showCustomize, setShowCustomize] = useState(false);
  const [customization, setCustomization] = useState<SandwichCustomization>({ ...defaultCustomization });

  // Reset state when modal opens
  const [lastOpen, setLastOpen] = useState(false);
  if (isOpen && !lastOpen) {
    setSelectedSize(0);
    setQty(1);
    setShowCustomize(false);
    setCustomization({ ...defaultCustomization });
  }
  if (isOpen !== lastOpen) setLastOpen(isOpen);

  const isCustomizable = item ? item.category === "Sandwiches" : false;
  const currentPrice = item ? (item.sizes ? item.sizes[selectedSize].price : item.price) : 0;

  const extrasTotal = useMemo(
    () => customization.extras.reduce((sum, e) => sum + e.price, 0) + (customization.breadType === "bran" ? BRAN_BREAD_PRICE : 0),
    [customization.extras, customization.breadType]
  );

  const totalPrice = (currentPrice + (isCustomizable ? extrasTotal : 0)) * qty;

  if (!item) return null;

  const toggleRemoval = (r: string) => {
    setCustomization((prev) => ({
      ...prev,
      removals: prev.removals.includes(r) ? prev.removals.filter((x) => x !== r) : [...prev.removals, r],
    }));
  };

  const toggleExtra = (extra: { name: string; price: number; item_code: string }) => {
    setCustomization((prev) => ({
      ...prev,
      extras: prev.extras.find((e) => e.name === extra.name)
        ? prev.extras.filter((e) => e.name !== extra.name)
        : [...prev.extras, extra],
    }));
  };

  const togglePreference = (p: string) => {
    setCustomization((prev) => ({
      ...prev,
      preferences: prev.preferences.includes(p) ? prev.preferences.filter((x) => x !== p) : [...prev.preferences, p],
    }));
  };

  const handleAdd = () => {
    if (isCustomizable && onAddToCartCustomized) {
      const cartItem: MenuItem = {
        ...item,
        price: currentPrice,
        name: item.sizes ? `${item.name} (${item.sizes[selectedSize].label})` : item.name,
        id: item.sizes ? `${item.id}-${item.sizes[selectedSize].label.toLowerCase()}` : item.id,
        item_code: item.sizes ? item.sizes[selectedSize].item_code : item.item_code,
      };
      for (let i = 0; i < qty; i++) {
        onAddToCartCustomized(cartItem, customization, extrasTotal);
      }
    } else {
      const cartItem: MenuItem = {
        ...item,
        price: currentPrice,
        name: item.sizes ? `${item.name} (${item.sizes[selectedSize].label})` : item.name,
        id: item.sizes ? `${item.id}-${item.sizes[selectedSize].label.toLowerCase()}` : item.id,
        item_code: item.sizes ? item.sizes[selectedSize].item_code : item.item_code,
      };
      onAddToCart(cartItem, qty);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 flex w-full max-w-md flex-col overflow-hidden rounded-t-3xl bg-card shadow-2xl sm:rounded-3xl sm:m-4"
            style={{ maxHeight: "92vh" }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto">
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
                {item.badge && (
                  <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow-md">
                    {item.badge}
                  </span>
                )}
                {isCustomizable && (
                  <span className="absolute right-3 top-14 rounded-full bg-accent px-2.5 py-1 text-xs font-bold text-accent-foreground shadow-md">
                    Customizable
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-display text-xl font-bold text-card-foreground">
                  {item.name}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>

                {/* Size selector */}
                {item.sizes && (
                  <div className="mt-4 flex gap-2">
                    {item.sizes.map((size, idx) => (
                      <button
                        key={size.label}
                        onClick={() => setSelectedSize(idx)}
                        className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                          selectedSize === idx
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                      >
                        {size.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Customize button for sandwich items */}
                {isCustomizable && (
                  <div className="mt-4">
                    <button
                      onClick={() => setShowCustomize(!showCustomize)}
                      className="flex w-full items-center justify-between rounded-xl border border-border px-4 py-3 text-sm font-semibold text-card-foreground transition-colors hover:bg-secondary"
                    >
                      <span>Customize Your Order</span>
                      <div className="flex items-center gap-2">
                        {extrasTotal > 0 && (
                          <span className="text-xs font-semibold text-primary">
                            +Rs. {extrasTotal}
                          </span>
                        )}
                        <motion.div
                          animate={{ rotate: showCustomize ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        </motion.div>
                      </div>
                    </button>

                    <AnimatePresence>
                      {showCustomize && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-3 space-y-5">
                            {/* Reset */}
                            <div className="flex justify-end">
                              <button
                                onClick={() => setCustomization({ ...defaultCustomization })}
                                className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:bg-secondary"
                              >
                                <RotateCcw className="h-3.5 w-3.5" />
                                Reset
                              </button>
                            </div>

                            {/* Bread Type */}
                            <section>
                              <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                Bread Type
                              </h4>
                              <div className="grid grid-cols-2 gap-2">
                                {(["white", "brown"] as const).map((type) => (
                                  <button
                                    key={type}
                                    onClick={() => setCustomization((prev) => ({ ...prev, breadType: type }))}
                                    className={`rounded-xl border-2 px-3 py-2.5 text-sm font-semibold transition-all ${
                                      customization.breadType === type
                                        ? "border-primary bg-primary/5"
                                        : "border-border hover:border-muted-foreground/30"
                                    }`}
                                  >
                                    {type === "white" ? "White Bread" : "Brown Bread"}
                                  </button>
                                ))}
                              </div>
                            </section>

                            {/* Special Instructions */}
                            <section>
                              <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                Special Instructions
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {REMOVALS.map((r) => {
                                  const active = customization.removals.includes(r.name);
                                  return (
                                    <button
                                      key={r.item_code}
                                      onClick={() => toggleRemoval(r.name)}
                                      className={`rounded-full border px-3 py-2 text-xs font-medium transition-all ${
                                        active
                                          ? "border-destructive bg-destructive/10 text-destructive"
                                          : "border-border text-card-foreground hover:bg-secondary"
                                      }`}
                                    >
                                      {r.name}
                                    </button>
                                  );
                                })}
                              </div>
                            </section>

                            {/* Add-Ons */}
                            <section>
                              <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                Add-Ons
                              </h4>
                              <div className="space-y-1.5">
                                {EXTRAS.map((extra) => {
                                  const active = !!customization.extras.find((e) => e.name === extra.name);
                                  return (
                                    <button
                                      key={extra.item_code}
                                      onClick={() => toggleExtra(extra)}
                                      className={`flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-left text-sm transition-all ${
                                        active
                                          ? "border-primary bg-primary/5"
                                          : "border-border hover:bg-secondary"
                                      }`}
                                    >
                                      <span className="font-medium text-card-foreground">{extra.name}</span>
                                      <span className="font-semibold text-primary">+ Rs. {extra.price}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            </section>

                            {/* Preferences */}
                            <section>
                              <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                Preferences
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {PREFERENCES.map((p) => {
                                  const active = customization.preferences.includes(p);
                                  return (
                                    <button
                                      key={p}
                                      onClick={() => togglePreference(p)}
                                      className={`rounded-full border px-3 py-2 text-xs font-medium transition-all ${
                                        active
                                          ? "border-accent bg-accent/10 text-accent"
                                          : "border-border text-card-foreground hover:bg-secondary"
                                      }`}
                                    >
                                      {p}
                                    </button>
                                  );
                                })}
                              </div>
                            </section>

                            {/* Special Note */}
                            <section>
                              <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                                Special Note
                              </h4>
                              <textarea
                                value={customization.specialNote}
                                onChange={(e) => setCustomization((prev) => ({ ...prev, specialNote: e.target.value }))}
                                placeholder="Any special requests?"
                                rows={2}
                                className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                              />
                            </section>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </div>

            {/* Fixed footer */}
            <div className="border-t border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-primary">
                  Rs. {totalPrice.toLocaleString()}
                </span>

                <div className="flex items-center gap-3">
                  {/* Quantity */}
                  <div className="flex items-center gap-1 rounded-full border border-border bg-card">
                    <button
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-6 text-center text-sm font-bold text-card-foreground">
                      {qty}
                    </span>
                    <button
                      onClick={() => setQty((q) => q + 1)}
                      className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Add to cart */}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdd}
                    className="rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground shadow-md transition-colors hover:bg-primary/90"
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ItemDetailModal;
