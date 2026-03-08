import { motion } from "framer-motion";
import { categories } from "@/data/menu";

type Props = {
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
};

const CategoryFilter = ({ activeCategory, onCategoryChange }: Props) => {
  return (
    <div className="scrollbar-hide flex gap-2 overflow-x-auto py-1">
      {categories.map((cat) => (
        <motion.button
          key={cat}
          whileTap={{ scale: 0.95 }}
          onClick={() => onCategoryChange(cat)}
          className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
            activeCategory === cat
              ? "bg-primary text-primary-foreground shadow-md"
              : "bg-secondary text-secondary-foreground hover:bg-muted"
          }`}
        >
          {cat}
        </motion.button>
      ))}
    </div>
  );
};

export default CategoryFilter;
