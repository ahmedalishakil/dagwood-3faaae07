import { useMemo } from "react";
import { motion } from "framer-motion";
import { Sparkles, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { getSmartUpsell } from "@/lib/upsell-engine";
import type { MenuItem } from "@/data/menu";

interface SmartUpsellProps {
  compact?: boolean;
}

const SmartUpsell = ({ compact = false }: SmartUpsellProps) => {
  const { cart, addToCart } = useCart();

  const { items, heading, subtitle } = useMemo(
    () => getSmartUpsell(cart),
    [cart]
  );

  if (items.length === 0) return null;

  const handleAdd = (item: MenuItem) => {
    addToCart(item);
  };

  return (
    <div className={compact ? "" : "mt-8"}>
      {/* Header */}
      <div className="mb-3 flex items-center gap-2">
        <Sparkles className="h-5 w-5 text-accent" />
        <div>
          <h3 className="font-display text-base font-bold text-foreground sm:text-lg">
            {heading}
          </h3>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </div>

      {/* Horizontal scrollable carousel */}
      <div className="-mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {items.map((item, idx) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleAdd(item)}
              className="group relative flex min-w-[140px] flex-shrink-0 flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-card-hover sm:min-w-0"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Add button overlay */}
                <span className="absolute bottom-1.5 right-1.5 flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold text-primary-foreground shadow-md transition-all group-hover:scale-105">
                  <Plus className="h-3 w-3" />
                  Add
                </span>
                {/* Badge */}
                {item.badge && (
                  <span className="absolute left-1.5 top-1.5 rounded-full bg-accent px-2 py-0.5 text-[9px] font-bold text-accent-foreground shadow">
                    {item.badge}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="px-2.5 py-2 text-left">
                <p className="text-xs font-semibold leading-tight text-card-foreground line-clamp-1">
                  {item.name}
                </p>
                <p className="mt-0.5 text-[11px] leading-tight text-muted-foreground line-clamp-1">
                  {item.description}
                </p>
                <p className="mt-1 text-xs font-bold text-primary">
                  Rs. {item.price.toLocaleString()}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SmartUpsell;
