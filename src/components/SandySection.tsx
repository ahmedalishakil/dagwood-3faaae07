import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import sandyAvatar from "@/assets/sandy-avatar.png";

const WHATSAPP_LINK = "https://wa.me/923001234567?text=Hi%20Sandy!";

const SandySection = () => {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-7xl px-4 py-6 sm:px-6"
      >
        <div className="flex items-center gap-4 rounded-2xl bg-[hsl(142,60%,40%)] px-5 py-3 shadow-lg transition-all hover:shadow-xl hover:brightness-110 sm:gap-5 sm:px-6">
          <img
            src={sandyAvatar}
            alt="Sandy"
            className="h-12 w-12 flex-shrink-0 rounded-full border-2 border-white/30 object-cover sm:h-14 sm:w-14"
          />
          <p className="flex-1 text-sm font-semibold text-white sm:text-base">
            🍔 Order on WhatsApp — Sandy takes your order in seconds!
          </p>
          <span className="flex flex-shrink-0 items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-[hsl(142,60%,30%)] sm:text-sm">
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Chat Now</span>
          </span>
        </div>
      </motion.div>
    </a>
  );
};

export default SandySection;
