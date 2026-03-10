import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, RotateCcw } from "lucide-react";
import type { MenuItem } from "@/data/menu";
import type { SandwichCustomization } from "@/types/cart";

type Props = {
  item: MenuItem;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: MenuItem, customization: SandwichCustomization, extrasTotal: number) => void;
  initialCustomization?: SandwichCustomization;
};

// Real addons from menu.json — Special Instructions (free toppings)
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

// Real addons from menu.json — paid Add-Ons
const EXTRAS = [
  { name: "Extra Mayo", price: 80, item_code: "SD-00028" },
  { name: "Extra Chicken", price: 120, item_code: "SD-00030" },
  { name: "Cheese Sauce", price: 100, item_code: "SD-00022" },
  { name: "Extra Jalapenos", price: 80, item_code: "SD-00027" },
  { name: "Extra Olives", price: 80, item_code: "SD-00024" },
  { name: "Extra Mushrooms", price: 80, item_code: "SD-00026" },
  { name: "Extra Veggies", price: 80, item_code: "SD-00025" },
  { name: "Dynamite Sauce", price: 90, item_code: "SD-00021" },
  { name: "Bran Bread", price: 80, item_code: "SD-00023" },
];

const PREFERENCES = ["Cut 1/4"];

const defaultState: SandwichCustomization = {
  breadType: "white",
  removals: [],
  extras: [],
  preferences: [],
  specialNote: "",
};

const SandwichCustomizer = ({ item, isOpen, onClose, onAddToCart, initialCustomization }: Props) => {
  const [customization, setCustomization] = useState<SandwichCustomization>(
    initialCustomization ? { ...initialCustomization } : { ...defaultState }
  );

  // Reset state when modal opens with new initial customization
  const [lastOpen, setLastOpen] = useState(false);
  if (isOpen && !lastOpen) {
    setCustomization(initialCustomization ? { ...initialCustomization } : { ...defaultState });
  }
  if (isOpen !== lastOpen) setLastOpen(isOpen);

  const extrasTotal = useMemo(
    () => customization.extras.reduce((sum, e) => sum + e.price, 0),
    [customization.extras]
  );

  const total = item.price + extrasTotal;

  const summary = useMemo(() => {
    const parts: string[] = [];
    parts.push(customization.breadType === "brown" ? "Brown Bread" : "White Bread");
    customization.removals.forEach((r) => parts.push(r));
    customization.extras.forEach((e) => parts.push(e.name));
    customization.preferences.forEach((p) => parts.push(p));
    return parts.join(", ");
  }, [customization]);

  const toggleRemoval = (r: string) => {
    setCustomization((prev) => ({
      ...prev,
      removals: prev.removals.includes(r)
        ? prev.removals.filter((x) => x !== r)
        : [...prev.removals, r],
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
      preferences: prev.preferences.includes(p)
        ? prev.preferences.filter((x) => x !== p)
        : [...prev.preferences, p],
    }));
  };

  const reset = () => setCustomization({ ...defaultState });

  const handleAdd = () => {
    onAddToCart(item, customization, extrasTotal);
    setCustomization({ ...defaultState });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed inset-x-0 bottom-0 z-50 flex max-h-[92vh] flex-col rounded-t-3xl border-t border-border bg-card shadow-2xl sm:inset-x-auto sm:left-1/2 sm:w-full sm:max-w-lg sm:-translate-x-1/2 sm:bottom-4 sm:rounded-3xl sm:border"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <h2 className="font-display text-xl font-bold text-card-foreground">
                Customize Your Sandwich
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={reset}
                  className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:bg-secondary"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset
                </button>
                <button
                  onClick={onClose}
                  className="rounded-full p-1.5 text-muted-foreground hover:bg-secondary"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Item preview */}
            <div className="flex items-center gap-4 border-b border-border px-5 py-3">
              <img
                src={item.image}
                alt={item.name}
                className="h-16 w-16 rounded-xl object-cover"
              />
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-lg font-bold text-card-foreground">{item.name}</h3>
                <p className="truncate text-xs text-muted-foreground">{summary}</p>
              </div>
            </div>

            {/* Scrollable options */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
              {/* Bread Type */}
              <section>
                <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  Bread Type <span className="text-primary">*</span>
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {(["white", "brown"] as const).map((type) => {
                    const fill = type === "white" ? "#F5E6C8" : "#A0724A";
                    const stroke = type === "white" ? "#D4B896" : "#7A5533";
                    return (
                      <button
                        key={type}
                        onClick={() =>
                          setCustomization((prev) => ({ ...prev, breadType: type }))
                        }
                        className={`flex flex-col items-center gap-2 rounded-2xl border-2 p-4 transition-all ${
                          customization.breadType === type
                            ? "border-primary bg-primary/5 shadow-md"
                            : "border-border hover:border-muted-foreground/30"
                        }`}
                      >
                        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M6 26V14C6 9.58 10.48 6 18 6C25.52 6 30 9.58 30 14V26C30 27.1 29.1 28 28 28H8C6.9 28 6 27.1 6 26Z"
                            fill={fill}
                            stroke={stroke}
                            strokeWidth="1.5"
                            strokeLinejoin="round"
                          />
                          <path d="M6 22H30" stroke={stroke} strokeWidth="1" strokeLinecap="round" opacity="0.4" />
                        </svg>
                        <span className="text-sm font-semibold text-card-foreground">
                          {type === "white" ? "White Bread" : "Brown Bread"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Special Instructions (free removals/modifications) */}
              <section>
                <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  Special Instructions
                </h4>
                <div className="flex flex-wrap gap-2">
                  {REMOVALS.map((r) => {
                    const active = customization.removals.includes(r.name);
                    return (
                      <button
                        key={r.item_code}
                        onClick={() => toggleRemoval(r.name)}
                        className={`rounded-full border px-4 py-2.5 text-sm font-medium transition-all ${
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

              {/* Paid Add-Ons */}
              <section>
                <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  Add-Ons
                </h4>
                <div className="space-y-2">
                  {EXTRAS.map((extra) => {
                    const active = !!customization.extras.find((e) => e.name === extra.name);
                    return (
                      <button
                        key={extra.item_code}
                        onClick={() => toggleExtra(extra)}
                        className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition-all ${
                          active
                            ? "border-primary bg-primary/5"
                            : "border-border hover:bg-secondary"
                        }`}
                      >
                        <span className="text-sm font-medium text-card-foreground">
                          {extra.name}
                        </span>
                        <span className="text-sm font-semibold text-primary">
                          + Rs. {extra.price}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Preferences */}
              <section>
                <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  Preferences
                </h4>
                <div className="flex flex-wrap gap-2">
                  {PREFERENCES.map((p) => {
                    const active = customization.preferences.includes(p);
                    return (
                      <button
                        key={p}
                        onClick={() => togglePreference(p)}
                        className={`rounded-full border px-4 py-2.5 text-sm font-medium transition-all ${
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
                <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                  Special Note
                </h4>
                <textarea
                  value={customization.specialNote}
                  onChange={(e) =>
                    setCustomization((prev) => ({ ...prev, specialNote: e.target.value }))
                  }
                  placeholder="Any special requests? e.g. less sauce, more fries on side..."
                  rows={2}
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </section>
            </div>

            {/* Footer with price & add button */}
            <div className="border-t border-border px-5 py-4">
              <div className="mb-3 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Base Price</span>
                <span className="font-semibold text-card-foreground">Rs. {item.price.toLocaleString()}</span>
              </div>
              {extrasTotal > 0 && (
                <div className="mb-3 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Add-Ons</span>
                  <span className="font-semibold text-primary">+ Rs. {extrasTotal.toLocaleString()}</span>
                </div>
              )}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAdd}
                className="w-full rounded-xl bg-primary py-4 text-sm font-bold text-primary-foreground shadow-lg"
              >
                Add to Cart — Rs. {total.toLocaleString()}
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SandwichCustomizer;
