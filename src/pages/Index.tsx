import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { SandwichCustomization } from "@/types/cart";
import lahoreSkyline from "@/assets/lahore-skyline.png";
import DagwoodHeader from "@/components/DagwoodHeader";
import HeroBanner from "@/components/HeroBanner";
import TrustBar from "@/components/TrustBar";
import CategoryFilter, { categoryToId } from "@/components/CategoryFilter";
import MenuCard from "@/components/MenuCard";
import MenuCardSkeleton from "@/components/MenuCardSkeleton";
import SandwichCustomizer from "@/components/SandwichCustomizer";
import ItemDetailModal from "@/components/ItemDetailModal";
import SandySection from "@/components/SandySection";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { menuItems, categories, type MenuItem } from "@/data/menu";
import { useCart } from "@/context/CartContext";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("All Items");
  const [customizerItem, setCustomizerItem] = useState<MenuItem | null>(null);
  const [detailItem, setDetailItem] = useState<MenuItem | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { addToCart, cartCount, cartTotal } = useCart();
  const navigate = useNavigate();

  const isScrollingToRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const groupedItems = useMemo(() => {
    const actualCategories = categories.filter((c) => c !== "All Items");
    return actualCategories.map((cat) => ({
      category: cat,
      id: categoryToId(cat),
      items: menuItems.filter((item) => item.category === cat),
    }));
  }, []);

  // Scroll-spy
  useEffect(() => {
    const sectionEls = groupedItems
      .map((g) => document.getElementById(g.id))
      .filter(Boolean) as HTMLElement[];
    if (sectionEls.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingToRef.current) return;
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          const cat = groupedItems.find((g) => g.id === visible[0].target.id)?.category;
          if (cat) setActiveCategory(cat);
        }
      },
      { rootMargin: "-170px 0px -60% 0px", threshold: 0 }
    );
    sectionEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [groupedItems]);

  const handleCategoryClick = useCallback((cat: string) => {
    setActiveCategory(cat);
    isScrollingToRef.current = true;
    setIsTransitioning(true);
    clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingToRef.current = false;
      setIsTransitioning(false);
    }, 600);
  }, []);

  const handleAddToCart = (item: MenuItem) => {
    setDetailItem(item);
  };

  const handleDetailAddToCart = (item: MenuItem, qty: number) => {
    for (let i = 0; i < qty; i++) {
      addToCart(item);
    }
  };

  const handleDetailAddToCartCustomized = (item: MenuItem, customization: SandwichCustomization, extrasTotal: number) => {
    addToCart(item, customization, extrasTotal);
  };

  return (
    <div className="min-h-screen bg-background">
      <DagwoodHeader />
      <HeroBanner />
      <TrustBar />

      <section id="menu" className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">Our Menu</h2>
            <p className="mt-1 text-sm text-muted-foreground">Fresh, bold, and made to order</p>
          </div>
        </div>

        <CategoryFilter activeCategory={activeCategory} onCategoryChange={handleCategoryClick} />

        {/* Category sections — tight 1.5rem spacing */}
        <div className="mt-4 space-y-6">
          {groupedItems.map((group) => (
            <section key={group.id} id={group.id}>
              <div className="mb-3 flex items-center gap-3">
                <h3 className="font-display text-lg font-bold text-foreground sm:text-xl">
                  {group.category}
                </h3>
                <span className="h-px flex-1 bg-border/60" />
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <AnimatePresence mode="popLayout">
                  {isTransitioning && group.category === activeCategory
                    ? Array.from({ length: 4 }).map((_, i) => <MenuCardSkeleton key={`skeleton-${i}`} />)
                    : group.items.map((item) => (
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
        <div className="relative -mt-6 pb-2">
          <img
            src={lahoreSkyline}
            alt="Lahore Skyline"
            className="pointer-events-none mx-auto block w-full max-w-5xl object-contain px-4"
            loading="lazy"
          />
          <p className="mt-1 text-center text-xs text-muted-foreground/60">© 2026 Dagwood. All rights reserved.</p>
        </div>
      </footer>

      {/* Floating cart button */}
      {cartCount > 0 && (
        <motion.button
          initial={{ scale: 0, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate("/cart")}
          className="fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-bold text-primary-foreground shadow-xl sm:left-auto sm:right-6 sm:translate-x-0"
        >
          <ShoppingBag className="h-5 w-5" />
          <span>{cartCount} items</span>
          <span className="border-l border-primary-foreground/30 pl-2">
            Rs. {cartTotal.toLocaleString()}
          </span>
        </motion.button>
      )}

      <WhatsAppFloat />

      <ItemDetailModal
        item={detailItem!}
        isOpen={!!detailItem}
        onClose={() => setDetailItem(null)}
        onAddToCart={handleDetailAddToCart}
        onAddToCartCustomized={handleDetailAddToCartCustomized}
      />
    </div>
  );
};

export default Index;