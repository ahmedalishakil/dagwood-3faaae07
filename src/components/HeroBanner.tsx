import { useState, useEffect, useCallback, useRef } from "react";
import banner1 from "@/assets/banner1.jpeg";
import banner2 from "@/assets/banner2.jpeg";

const slides = [banner1, banner2];

const HeroBanner = () => {
  const [current, setCurrent] = useState(0);
  const [ready, setReady] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  // Preload all images before showing the slider
  useEffect(() => {
    let loaded = 0;
    slides.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = img.onerror = () => {
        loaded++;
        if (loaded === slides.length) setReady(true);
      };
    });
  }, []);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    if (!ready) return;
    timerRef.current = setInterval(next, 4500);
    return () => clearInterval(timerRef.current);
  }, [next, ready]);

  return (
    <section className="relative w-full overflow-hidden" style={{ aspectRatio: "16 / 5" }}>
      {/* All images always mounted, visibility toggled via opacity for instant switching */}
      {slides.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`Banner ${i + 1}`}
          fetchPriority="high"
          decoding="sync"
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out will-change-[opacity]"
          style={{ opacity: i === current ? 1 : 0 }}
        />
      ))}

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
