import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import lahoreSkyline from "@/assets/lahore-skyline.png";
import DagwoodHeader from "@/components/DagwoodHeader";
import HeroBanner from "@/components/HeroBanner";
import CategoryFilter, { categoryToId } from "@/components/CategoryFilter";
import MenuCard from "@/components/MenuCard";
import SandwichCustomizer from "@/components/SandwichCustomizer";
import SandySection from "@/components/SandySection";
import { menuItems, categories, type MenuItem } from "@/data/menu";
import { useCart } from "@/context/CartContext";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("All Items");
  const [customizerItem, setCustomizerItem] = useState<MenuItem | null>(null);
  const { addToCart, cartCount, cartTotal } = useCart();
  const navigate = useNavigate();

  // Track whether the user clicked a category (to suppress scroll-spy briefly)
  const isScrollingToRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  // Group items by category (excluding "All Items")
  const groupedItems = useMemo(() => {
    const actualCategories = categories.filter((c) => c !== "All Items");
    return actualCategories.map((cat) => ({
      category: cat,
      id: categoryToId(cat),
      items: menuItems.filter((item) => item.category === cat),
    }));
  }, []);

  // Scroll-spy with IntersectionObserver
  useEffect(() => {
    const sectionEls = groupedItems
      .map((g) => document.getElementById(g.id))
      .filter(Boolean) as HTMLElement[];

    if (sectionEls.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingToRef.current) return;

        // Find the topmost visible section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          const topSection = visible[0];
          const cat = groupedItems.find((g) => g.id === topSection.target.id)?.category;
          if (cat) {
            setActiveCategory(cat);
          }
        }
      },
      {
        rootMargin: "-120px 0px -60% 0px",
        threshold: 0,
      }
    );

    sectionEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [groupedItems]);

  const handleCategoryClick = useCallback((cat: string) => {
    setActiveCategory(cat);

    // Suppress scroll-spy for a moment while smooth-scrolling
    isScrollingToRef.current = true;
    clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingToRef.current = false;
    }, 1000);
  }, []);

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

      <section id="menu" className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">Our Menu</h2>
            <p className="mt-1 text-sm text-muted-foreground">Fresh, bold, and made to order</p>
          </div>
        </div>

        <CategoryFilter activeCategory={activeCategory} onCategoryChange={handleCategoryClick} />

        {/* Category sections */}
        <div className="mt-6 space-y-8">
          {groupedItems.map((group) => (
            <section key={group.id} id={group.id}>
              <div className="mb-4 flex items-center gap-3">
                <h3 className="font-display text-lg font-bold text-foreground sm:text-xl">
                  {group.category}
                </h3>
                <span className="h-px flex-1 bg-border" />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <AnimatePresence mode="popLayout">
                  {group.items.map((item) => (
                    <MenuCard key={item.id} item={item} onAddToCart={handleAddToCart} />
                  ))}
                </AnimatePresence>
              </div>
            </section>
          ))}
        </div>
      </section>

      <footer className="relative">
        <SandySection />
        <div className="relative -mt-2 pb-4">
          <img
            src={lahoreSkyline}
            alt="Lahore Skyline"
            className="pointer-events-none mx-auto w-full max-w-5xl object-contain px-4"
          />
          <p className="mt-2 text-center text-xs text-muted-foreground/60">© 2026 Dagwood. All rights reserved.</p>
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
