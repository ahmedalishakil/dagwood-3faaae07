import { motion } from "framer-motion";
import heroImg from "@/assets/hero-food.jpg";

const HeroBanner = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Delicious Dagwood food" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-lg"
        >
          <span className="inline-block rounded-full bg-primary px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-foreground">
            Limited Time Offer
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-card sm:text-5xl lg:text-6xl">
            Get Your
            <br />
            <span className="text-brand-gold">Exclusive Deals</span>
          </h1>
          <p className="mt-4 text-lg text-card/80">
            Fresh ingredients, bold flavors. Order now and enjoy Lahore&apos;s favourite sandwiches delivered to your door.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground shadow-lg transition-shadow hover:shadow-xl"
            >
              Order Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full border-2 border-card/30 bg-card/10 px-8 py-3.5 text-sm font-bold text-card backdrop-blur-sm transition-colors hover:bg-card/20"
            >
              View Menu
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroBanner;
