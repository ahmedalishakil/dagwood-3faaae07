import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import heroDagwood from "@/assets/hero-dagwood.jpg";
import heroGrilled from "@/assets/hero-grilled.jpg";
import heroRedVelvet from "@/assets/hero-redvelvet.jpg";

const slides = [
  {
    image: heroDagwood,
    headlineRed: "Hits",
    headlineWhite: "Differently",
    subtext: "Our signature stacked sandwich packed with flavor",
    objectPosition: "center 40%",
  },
  {
    image: heroGrilled,
    headlineRed: "Grilled",
    headlineWhite: "Perfection",
    subtext: "Crispy, gooey, and impossible to resist",
    objectPosition: "center center",
  },
  {
    image: heroRedVelvet,
    headlineRed: "Sinfully",
    headlineWhite: "Rich",
    subtext: "Indulge in our velvety red velvet masterpiece",
    objectPosition: "center center",
  },
];

const HeroBanner = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5500);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="relative overflow-hidden" style={{ height: "clamp(400px, 75vh, 920px)", minHeight: "400px", maxHeight: "920px" }}>
      {/* Background images */}
      <AnimatePresence initial={false}>
        <motion.img
          key={current}
          src={slide.image}
          alt={slide.headlineRed + " " + slide.headlineWhite}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: slide.objectPosition }}
        />
      </AnimatePresence>

      {/* Dark gradient overlay — heavier on left */}
      <div className="absolute inset-0 z-[1]" style={{
        background: `linear-gradient(
          to right,
          hsl(20 30% 5% / 0.92) 0%,
          hsl(20 30% 5% / 0.85) 35%,
          hsl(20 30% 5% / 0.5) 60%,
          hsl(20 30% 5% / 0.2) 80%,
          transparent 100%
        )`
      }} />

      {/* Top category bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="absolute left-0 top-0 z-[3] flex items-center gap-2 px-6 py-6 sm:px-14"
      >
        <span className="h-px w-8 bg-brand-cream/30" />
        <span className="font-elegant text-[11px] italic tracking-[0.3em] text-brand-cream/50">
          Sandwiches · Burgers · Wraps · Made Fresh Daily
        </span>
      </motion.div>

      {/* Content — left side */}
      <div className="absolute left-0 top-0 z-[3] flex h-full w-full flex-col justify-center px-6 py-12 sm:w-[55%] sm:px-14">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Brand name */}
            <h1 className="font-display text-4xl font-black uppercase leading-[0.85] tracking-tight text-primary sm:text-5xl lg:text-6xl">
              DAGWOOD
            </h1>

            {/* Tagline — first word red, second white */}
            <div className="mt-4">
              <span className="font-display text-3xl font-bold uppercase leading-tight text-primary sm:text-4xl">
                {slide.headlineRed}
              </span>
              <br />
              <span className="font-elegant text-3xl italic text-brand-cream/70 sm:text-4xl">
                {slide.headlineWhite}
              </span>
            </div>

            {/* Divider dot + line */}
            <div className="my-6 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="h-px w-14 bg-primary/40" />
            </div>

            {/* Description */}
            <p
              className="font-elegant text-base font-light italic leading-relaxed tracking-wide text-brand-cream/55"
              style={{ maxWidth: "320px" }}
            >
              {slide.subtext}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="https://wa.me/923262188824?text=Hi%20Sandy%20AI!%20I%27d%20like%20to%20place%20an%20order"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded bg-primary px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                Order with Sandy AI
              </a>
              <a
                href="#menu"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-brand-cream/50 transition-colors hover:text-brand-cream/80"
              >
                Full Menu
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Scroll indicator */}
        <div className="mt-auto flex items-center gap-2 pb-4">
          <span className="flex h-8 w-5 items-start justify-center rounded-full border border-brand-cream/20 pt-1.5">
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="h-1.5 w-1 rounded-full bg-brand-cream/40"
            />
          </span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-brand-cream/30">
            Scroll
          </span>
        </div>
      </div>

      {/* Navigation arrows — right side */}
      <button
        onClick={prev}
        className="absolute right-20 top-1/2 z-[4] hidden -translate-y-1/2 rounded-full border border-brand-cream/15 p-2.5 text-brand-cream/50 backdrop-blur-sm transition-colors hover:border-brand-cream/30 hover:text-brand-cream/80 sm:block"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-6 top-1/2 z-[4] hidden -translate-y-1/2 rounded-full border border-brand-cream/15 p-2.5 text-brand-cream/50 backdrop-blur-sm transition-colors hover:border-brand-cream/30 hover:text-brand-cream/80 sm:block"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots — bottom right */}
      <div className="absolute bottom-20 right-6 z-[4] hidden flex-col gap-2.5 sm:right-10 sm:flex">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-500 ${
              i === current
                ? "w-8 bg-primary"
                : "w-2 bg-brand-cream/30 hover:bg-brand-cream/50"
            }`}
          />
        ))}
      </div>

      {/* Bottom bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-0 left-0 right-0 z-[4] flex h-[44px] items-center justify-center gap-4 px-6 sm:px-14"
        style={{
          borderTop: "1px solid hsl(20 30% 50% / 0.15)",
          background: "hsl(20 30% 5% / 0.85)",
        }}
      >
        <span className="font-elegant text-[10px] italic tracking-[0.3em] text-brand-cream/35">
          Open every hour · every day
        </span>
        <span className="h-1 w-1 rounded-full bg-brand-cream/20" />
        <span className="font-elegant text-[10px] uppercase tracking-[0.4em] text-brand-cream/35">
          Lahore, Pakistan
        </span>
      </motion.div>
    </section>
  );
};

export default HeroBanner;
