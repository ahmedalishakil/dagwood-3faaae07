import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { categories } from "@/data/menu";

const categoryToId = (cat: string) =>
  cat.toLowerCase().replace(/\s+&\s+/g, "-").replace(/\s+/g, "-");

const getHeaderHeight = () => {
  if (typeof window === "undefined") return 104;

  const rawValue = getComputedStyle(document.documentElement)
    .getPropertyValue("--dagwood-header-height")
    .trim();
  const parsedValue = Number.parseFloat(rawValue);

  if (Number.isFinite(parsedValue) && parsedValue > 0) return parsedValue;
  return window.innerWidth < 640 ? 104 : 64;
};

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
    if (btn) {
      btn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
    }
  }, [activeCategory]);

  const handleClick = useCallback(
    (cat: string) => {
      onCategoryChange(cat);

      const isMobile = window.innerWidth < 640;
      const headerHeight = getHeaderHeight();
      const filterHeight = scrollRef.current?.parentElement?.offsetHeight ?? (isMobile ? 52 : 56);
      const offset = headerHeight + filterHeight + 12;

      if (cat === "All Items") {
        const menuSection = document.getElementById("menu");
        if (menuSection) {
          const top = menuSection.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: "smooth" });
        }
        return;
      }

      const sectionId = categoryToId(cat);
      const el = document.getElementById(sectionId);
      if (el) {
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
        className={`sticky top-[var(--dagwood-header-height,104px)] z-40 py-2.5 sm:py-3 transition-all duration-300 ${
          isSticky
            ? "bg-background/95 backdrop-blur-lg shadow-md border-b border-border/50"
            : "bg-transparent"
        }`}
      >
        <div
          ref={scrollRef}
          className="scrollbar-hide flex gap-2.5 sm:gap-3 overflow-x-auto pb-0.5"
          role="navigation"
          aria-label="Menu categories"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              ref={(el) => {
                itemRefs.current[cat] = el;
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleClick(cat)}
              className={`category-pill relative min-h-8 sm:min-h-10 flex-shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-xs sm:px-5 sm:py-2.5 sm:text-sm font-semibold transition-all duration-300 ${
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
