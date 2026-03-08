import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import DagwoodHeader from "@/components/DagwoodHeader";
import HeroBanner from "@/components/HeroBanner";
import CategoryFilter from "@/components/CategoryFilter";
import MenuCard from "@/components/MenuCard";
import CartSidebar from "@/components/CartSidebar";
import { menuItems, type MenuItem } from "@/data/menu";
import type { CartItem } from "@/types/cart";

const Index = () => {
  const [orderType, setOrderType] = useState<"delivery" | "pickup">("delivery");
  const [activeCategory, setActiveCategory] = useState("All Items");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const filteredItems = useMemo(
    () =>
      activeCategory === "All Items"
        ? menuItems
        : menuItems.filter((item) => item.category === activeCategory),
    [activeCategory]
  );

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        return prev.map((c) => (c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c));
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1, image: item.image }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) => (c.id === id ? { ...c, quantity: c.quantity + delta } : c))
        .filter((c) => c.quantity > 0)
    );
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  };

  const cartCount = cart.reduce((sum, c) => sum + c.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <DagwoodHeader orderType={orderType} onOrderTypeChange={setOrderType} />
      <HeroBanner />

      {/* Menu Section */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">Our Menu</h2>
            <p className="mt-1 text-sm text-muted-foreground">Fresh, bold, and made to order</p>
          </div>
        </div>

        <CategoryFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <MenuCard key={item.id} item={item} onAddToCart={addToCart} />
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="flex flex-col items-center gap-4 text-center">
            <h3 className="font-display text-xl font-bold text-foreground">DAGWOOD</h3>
            <p className="max-w-md text-sm text-muted-foreground">
              Lahore&apos;s favourite sandwich destination. Fresh ingredients, bold flavors, and unmatched quality since day one.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <span>📞 042-111-222-224</span>
              <span>📍 Lahore, Pakistan</span>
            </div>
            <p className="text-xs text-muted-foreground/60">© 2026 Dagwood. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating cart button (mobile) */}
      {cartCount > 0 && (
        <motion.button
          initial={{ scale: 0, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setCartOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-bold text-primary-foreground shadow-xl"
        >
          <ShoppingBag className="h-5 w-5" />
          <span>{cartCount} items</span>
          <span className="border-l border-primary-foreground/30 pl-2">
            Rs. {cart.reduce((s, c) => s + c.price * c.quantity, 0).toLocaleString()}
          </span>
        </motion.button>
      )}

      <CartSidebar
        items={cart}
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
      />
    </div>
  );
};

export default Index;
