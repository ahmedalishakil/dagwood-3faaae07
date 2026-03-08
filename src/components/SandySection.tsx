import { motion } from "framer-motion";
import sandyAvatar from "@/assets/sandy-avatar.png";

const WHATSAPP_LINK = "https://wa.me/923262188824?text=Hi%20Sandy!";

const SandySection = () => {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-40"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative"
      >
        <div className="h-14 w-14 overflow-hidden rounded-full border-2 border-primary shadow-lg">
          <img
            src={sandyAvatar}
            alt="Sandy — Order Agent"
            className="h-full w-full object-cover"
          />
        </div>
        {/* Online dot */}
        <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-card bg-green-500" />
        {/* Label */}
        <span className="absolute -right-2 -top-2 rounded-full bg-primary px-2 py-0.5 text-[9px] font-bold text-primary-foreground shadow">
          Sandy
        </span>
      </motion.div>
    </a>
  );
};

export default SandySection;
