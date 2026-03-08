import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { categories } from "@/data/menu";

const categoryToId = (cat: string) =>
  cat.toLowerCase().replace(/\s+&\s+/g, "-").replace(/\s+/g, "-");

type Props = {
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
};

const CategoryFilter = ({ activeCategory, onCategoryChange }: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [isSticky, setIsSticky] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Detect sticky state
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsSticky(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  // Auto-scroll active button into view
  useEffect(() => {
    const btn = itemRefs.current[activeCategory];
    if (btn && scrollRef.current) {
      const container = scrollRef.current;
      const left = btn.offsetLeft - container.offsetWidth / 2 + btn.offsetWidth / 2;
      container.scrollTo({ left, behavior: "smooth" });
    }
  }, [activeCategory]);

  const handleClick = useCallback(
    (cat: string) => {
      onCategoryChange(cat);
      if (cat === "All Items") {
        const menuSection = document.getElementById("menu");
        if (menuSection) {
          const offset = 120;
          const top = menuSection.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: "smooth" });
        }
        return;
      }
      const sectionId = categoryToId(cat);
      const el = document.getElementById(sectionId);
      if (el) {
        const offset = 120; // sticky bar height + padding
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    },
    [onCategoryChange]
  );

  return (
    <>
      {/* Sentinel element to detect when bar becomes sticky */}
      <div ref={sentinelRef} className="h-0 w-full" />

      <div
        className={`sticky top-0 z-30 -mx-4 px-4 py-3 transition-all duration-300 sm:-mx-6 sm:px-6 ${
          isSticky
            ? "bg-background/95 backdrop-blur-lg shadow-md border-b border-border/50"
            : "bg-transparent"
        }`}
      >
        <div
          ref={scrollRef}
          className="scrollbar-hide flex gap-2 overflow-x-auto"
          role="navigation"
          aria-label="Menu categories"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              ref={(el) => { itemRefs.current[cat] = el; }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleClick(cat)}
              className={`relative whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary text-secondary-foreground hover:bg-muted"
              }`}
              aria-current={activeCategory === cat ? "true" : undefined}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </div>
    </>
  );
};

export { categoryToId };
export default CategoryFilter;
