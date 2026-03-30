import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import logo from "@/assets/favicon.ico";

const WHATSAPP_LINK =
  "https://wa.me/923262188824?text=Hi%20there!%20%F0%9F%91%8B%20I%20can%20help%20you%20place%20an%20order.%20What%20would%20you%20like%20today%3F";

const SandySection = () => {
  return (
    <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="block">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-7xl px-4 pb-2 pt-4 sm:px-6"
      >
        <div className="flex items-center gap-4 rounded-2xl bg-primary px-5 py-3 shadow-lg transition-all hover:shadow-xl hover:brightness-110 sm:gap-5 sm:px-6">
          <img
            src={logo}
            alt="Dagwood"
            className="h-12 w-12 flex-shrink-0 rounded-full border-2 border-primary-foreground/30 object-contain bg-primary-foreground p-1 sm:h-14 sm:w-14"
            loading="lazy"
            decoding="async"
          />
          <p className="flex-1 text-sm font-semibold text-primary-foreground sm:text-base">
            🥪 Order on WhatsApp — Sandy AI takes your order in seconds!
          </p>
          <span className="flex flex-shrink-0 items-center gap-2 rounded-full bg-primary-foreground px-4 py-2 text-xs font-bold text-primary sm:text-sm">
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Chat Now</span>
          </span>
        </div>
      </motion.div>
    </a>
  );
};

export default SandySection;
