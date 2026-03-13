import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import banner1 from "@/assets/banner1.jpeg";
import banner2 from "@/assets/banner2.jpeg";

const slides = [banner1, banner2];

const HeroBanner = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 4500);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative w-full overflow-hidden" style={{ aspectRatio: "16 / 5" }}>
      <AnimatePresence initial={false}>
        <motion.img
          key={current}
          src={slides[current]}
          alt={`Banner ${current + 1}`}
          loading="eager"
          fetchPriority="high"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2.5 rounded-full transition-all duration-500 ${
              i === current
                ? "w-8 bg-primary"
                : "w-2.5 bg-foreground/30 hover:bg-foreground/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroBanner;
