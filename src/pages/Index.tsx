import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DagwoodHeader from "@/components/DagwoodHeader";
import HeroBanner from "@/components/HeroBanner";
import CategoryFilter from "@/components/CategoryFilter";
import MenuCard from "@/components/MenuCard";

import SandwichCustomizer from "@/components/SandwichCustomizer";
import SandySection from "@/components/SandySection";
import { menuItems, type MenuItem } from "@/data/menu";
import { useCart } from "@/context/CartContext";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("All Items");
  const [customizerItem, setCustomizerItem] = useState<MenuItem | null>(null);
  const { addToCart, cartCount, cartTotal } = useCart();
  const navigate = useNavigate();

  const filteredItems = useMemo(
    () =>
      activeCategory === "All Items"
        ? menuItems
        : menuItems.filter((item) => item.category === activeCategory),
    [activeCategory]
  );

  const handleAddToCart = (item: MenuItem) => {
    if (item.category === "Sandwiches") {
      setCustomizerItem(item);
      return;
    }
    addToCart(item);
  };

  return (
    <div className="min-h-screen bg-background">
      <DagwoodHeader />
      <HeroBanner />
      

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
              <MenuCard key={item.id} item={item} onAddToCart={handleAddToCart} />
            ))}
          </AnimatePresence>
        </div>
      </section>

      <SandySection />

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

      {cartCount > 0 && (
        <motion.button
          initial={{ scale: 0, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate("/cart")}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-bold text-primary-foreground shadow-xl"
        >
          <ShoppingBag className="h-5 w-5" />
          <span>{cartCount} items</span>
          <span className="border-l border-primary-foreground/30 pl-2">
            Rs. {cartTotal.toLocaleString()}
          </span>
        </motion.button>
      )}

      {/* Sandy WhatsApp floating button */}
      <motion.a
        href="https://wa.me/923001234567?text=Hi%20Sandy!"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2 rounded-full bg-[hsl(142,60%,40%)] px-4 py-3 text-sm font-bold text-white shadow-xl"
        title="Chat with Sandy — Your AI Order Buddy!"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="hidden sm:inline">Chat with Sandy</span>
      </motion.a>

      {customizerItem && (
        <SandwichCustomizer
          item={customizerItem}
          isOpen={!!customizerItem}
          onClose={() => setCustomizerItem(null)}
          onAddToCart={addToCart}
        />
      )}
    </div>
  );
};

export default Index;
