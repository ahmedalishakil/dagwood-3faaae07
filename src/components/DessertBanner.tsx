import { motion } from "framer-motion";
import { Phone, ArrowRight } from "lucide-react";
import dessertImg from "@/assets/dessert-banner.jpg";

const DessertBanner = () => {
  return (
    <section className="relative overflow-hidden" style={{ height: "600px" }}>
      {/* Background image */}
      <img
        src={dessertImg}
        alt="Dagwood desserts"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Dark gradient overlay */}
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
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="absolute left-0 top-0 z-[3] flex items-center gap-2 px-6 py-6 sm:px-14"
      >
        <span className="h-px w-8 bg-brand-cream/30" />
        <span className="font-elegant text-[11px] italic tracking-[0.3em] text-brand-cream/50">
          Cakes · Donuts · Brownies · Baked Fresh Daily
        </span>
      </motion.div>

      {/* Content — left side */}
      <div className="absolute left-0 top-0 z-[3] flex h-full w-full flex-col justify-center px-6 py-12 sm:w-[55%] sm:px-14">
        {/* Brand name */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-display text-6xl font-black uppercase leading-[0.85] tracking-tight text-primary sm:text-7xl lg:text-8xl"
        >
          DAGWOOD
        </motion.h2>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-4"
        >
          <span className="font-display text-2xl font-bold uppercase leading-tight text-primary sm:text-3xl">
            Sinfully
          </span>
          <br />
          <span className="font-elegant text-2xl italic text-brand-cream/70 sm:text-3xl">
            Rich
          </span>
        </motion.div>

        {/* Divider dot + line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="my-5 flex items-center gap-2"
        >
          <span className="h-2 w-2 rounded-full bg-primary" />
          <span className="h-px w-14 bg-primary/40" />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="font-elegant text-base font-light italic leading-relaxed tracking-wide text-brand-cream/55"
          style={{ maxWidth: "320px" }}
        >
          14 desserts baked with reckless dedication. Red velvet, pistachio chunk, chocolate fudge — each one dangerously good.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <a
            href="#menu"
            className="inline-flex items-center gap-2.5 rounded bg-primary px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Phone className="h-3.5 w-3.5" />
            Order Desserts
          </a>
          <a
            href="#menu"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-brand-cream/50 transition-colors hover:text-brand-cream/80"
          >
            Dessert Menu
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </motion.div>
      </div>

      {/* Featured product card — bottom right */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1.0, duration: 0.8 }}
        className="absolute bottom-16 right-6 z-[4] hidden rounded border border-brand-cream/10 px-5 py-4 sm:right-10 sm:block"
        style={{ background: "hsl(20 30% 5% / 0.75)", backdropFilter: "blur(8px)" }}
      >
        <div className="flex items-center justify-between gap-8">
          <div>
            <span className="font-elegant text-[10px] italic tracking-widest text-primary">
              Fan Favourite
            </span>
            <p className="mt-0.5 font-display text-sm font-bold uppercase tracking-wide text-brand-cream">
              Chocolate Cake
            </p>
            <span className="font-display text-xs font-bold text-primary">
              Rs. 750
            </span>
          </div>
          <ArrowRight className="h-4 w-4 text-brand-cream/40" />
        </div>
      </motion.div>

      {/* Bottom bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.0, duration: 0.8 }}
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

export default DessertBanner;
