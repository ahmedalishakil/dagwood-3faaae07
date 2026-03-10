import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus } from "lucide-react";
import type { MenuItem } from "@/data/menu";

type Props = {
  item: MenuItem;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: MenuItem, qty: number) => void;
};

const ItemDetailModal = ({ item, isOpen, onClose, onAddToCart }: Props) => {
  const [selectedSize, setSelectedSize] = useState(0);
  const [qty, setQty] = useState(1);

  const currentPrice = item.sizes ? item.sizes[selectedSize].price : item.price;

  const handleAdd = () => {
    const cartItem: MenuItem = {
      ...item,
      price: currentPrice,
      name: item.sizes ? `${item.name} (${item.sizes[selectedSize].label})` : item.name,
      id: item.sizes ? `${item.id}-${item.sizes[selectedSize].label.toLowerCase()}` : item.id,
      item_code: item.sizes ? item.sizes[selectedSize].item_code : item.item_code,
    };
    onAddToCart(cartItem, qty);
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
            className="relative z-10 w-full max-w-md overflow-hidden rounded-t-3xl bg-card shadow-2xl sm:rounded-3xl sm:m-4"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

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

              {/* Price + Quantity + Add */}
              <div className="mt-5 flex items-center justify-between">
                <span className="text-xl font-bold text-primary">
                  Rs. {(currentPrice * qty).toLocaleString()}
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
