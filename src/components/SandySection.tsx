import { motion } from "framer-motion";
import { Clock, Sparkles, Coffee, Truck, MessageCircle, Smartphone } from "lucide-react";
import sandyAvatar from "@/assets/sandy-avatar.png";

const features = [
  { icon: Clock, text: "24/7 availability — order anytime!" },
  { icon: Sparkles, text: "Handles customizations (bread type, no lettuce, extra mayo…)" },
  { icon: Coffee, text: "Suggests combos, drinks & desserts" },
  { icon: Truck, text: "Cash on Delivery & Lahore pickup/delivery" },
  { icon: Smartphone, text: "No app download needed" },
];

const WHATSAPP_LINK = "https://wa.me/923001234567?text=Hi%20Sandy!";

const SandySection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[hsl(142,60%,40%)] via-[hsl(142,50%,35%)] to-[hsl(160,45%,30%)] py-16 sm:py-20">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[hsl(142,60%,50%)] opacity-20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-[hsl(32,60%,50%)] opacity-15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-16">
          {/* Avatar */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-white/20 blur-2xl" />
              <img
                src={sandyAvatar}
                alt="Sandy — Your AI Order Buddy"
                className="relative h-48 w-48 drop-shadow-2xl sm:h-56 sm:w-56 lg:h-64 lg:w-64"
              />
            </div>
          </motion.div>

          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
                Say Hi to Sandy! 🍔🤖
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
                Sandy is our friendly WhatsApp AI chatbot that takes your Dagwood orders super fast.
                Customize sandwiches (brown bread? no onion?), choose coffee sizes, add extras, and
                get instant confirmations — all via chat! Perfect for quick orders, questions, or
                special requests.
              </p>
            </motion.div>

            <motion.ul
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 space-y-3"
            >
              {features.map((f) => (
                <li key={f.text} className="flex items-center gap-3 text-sm text-white/90 sm:text-base">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/20">
                    <f.icon className="h-4 w-4 text-white" />
                  </span>
                  {f.text}
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8"
            >
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-base font-bold text-[hsl(142,60%,30%)] shadow-lg transition-all hover:scale-105 hover:shadow-xl sm:text-lg"
              >
                <MessageCircle className="h-6 w-6" />
                Start Chatting with Sandy
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SandySection;
