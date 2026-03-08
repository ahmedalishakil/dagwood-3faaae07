import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import type { MenuItem } from "@/data/menu";

type Props = {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
};

const MenuCard = ({ item, onAddToCart }: Props) => {
  const [selectedSize, setSelectedSize] = useState(0);

  const currentPrice = item.sizes ? item.sizes[selectedSize].price : item.price;

  const handleAdd = () => {
    const cartItem: MenuItem = {
      ...item,
      price: currentPrice,
      name: item.sizes ? `${item.name} (${item.sizes[selectedSize].label})` : item.name,
      id: item.sizes ? `${item.id}-${item.sizes[selectedSize].label.toLowerCase()}` : item.id,
    };
    onAddToCart(cartItem);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-shadow hover:shadow-card-hover"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
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
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-display text-lg font-bold text-card-foreground">{item.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{item.description}</p>

        {/* Size selector */}
        {item.sizes && (
          <div className="mt-3 flex gap-2">
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
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAdd}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition-colors hover:bg-brand-dark"
          >
            <Plus className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuCard;
