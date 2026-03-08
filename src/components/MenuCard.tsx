import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import type { MenuItem } from "@/data/menu";
import { useCart } from "@/context/CartContext";

type Props = {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
};

const MenuCard = ({ item, onAddToCart }: Props) => {
  const [selectedSize, setSelectedSize] = useState(0);
  const { cart, updateQuantity } = useCart();

  const currentPrice = item.sizes ? item.sizes[selectedSize].price : item.price;

  const cartItemId = item.sizes
    ? `${item.id}-${item.sizes[selectedSize].label.toLowerCase()}`
    : item.id;

  // Find quantity already in cart (handle customized sandwich variants too)
  const inCartQty = cart
    .filter((c) => c.id === cartItemId || c.id.startsWith(`${item.id}-`))
    .reduce((sum, c) => sum + c.quantity, 0);

  const handleAdd = () => {
    const cartItem: MenuItem = {
      ...item,
      price: currentPrice,
      name: item.sizes ? `${item.name} (${item.sizes[selectedSize].label})` : item.name,
      id: cartItemId,
    };
    onAddToCart(cartItem);
  };

  const handleCardClick = () => {
    handleAdd();
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      aria-label={`Add ${item.name} to cart`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleCardClick();
        }
      }}
      className="group relative cursor-pointer overflow-hidden rounded-[20px] border-0 bg-secondary shadow-card outline-none transition-shadow hover:shadow-card-hover focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 touch-ripple"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {item.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow-md">
            {item.badge}
          </span>
        )}
        {item.category === "Sandwiches" && (
          <span className="absolute right-3 top-3 rounded-full bg-accent px-2.5 py-1 text-xs font-bold text-accent-foreground shadow-md">
            Customizable
          </span>
        )}

        {/* Cart quantity badge overlay */}
        {inCartQty > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute bottom-3 left-3 flex h-7 min-w-7 items-center justify-center rounded-full bg-primary px-2 text-xs font-bold text-primary-foreground shadow-lg"
          >
            {inCartQty} in cart
          </motion.span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-display text-lg font-bold text-card-foreground">{item.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{item.description}</p>

        {/* Size selector — stop propagation so clicking size doesn't add to cart */}
        {item.sizes && (
          <div className="mt-3 flex gap-2" onClick={(e) => e.stopPropagation()}>
            {item.sizes.map((size, idx) => (
              <button
                key={size.label}
                onClick={() => setSelectedSize(idx)}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
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

        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-primary">
            Rs. {currentPrice.toLocaleString()}
          </span>

          {/* Add / quantity controls */}
          <div onClick={(e) => e.stopPropagation()}>
            {inCartQty > 0 && item.category !== "Sandwiches" ? (
              <div className="flex items-center gap-1 rounded-full border border-border bg-card">
                <button
                  onClick={() => updateQuantity(cartItemId, -1)}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary"
                  aria-label={`Decrease ${item.name} quantity`}
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-6 text-center text-sm font-bold text-card-foreground">
                  {inCartQty}
                </span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={handleAdd}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm"
                  aria-label={`Increase ${item.name} quantity`}
                >
                  <Plus className="h-3.5 w-3.5" />
                </motion.button>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleAdd}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition-colors hover:bg-brand-dark"
                aria-label={`Add ${item.name} to cart`}
              >
                <Plus className="h-5 w-5" />
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuCard;
