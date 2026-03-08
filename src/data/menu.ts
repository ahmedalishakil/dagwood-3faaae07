import burgerImg from "@/assets/menu/burger.jpg";
import friesImg from "@/assets/menu/fries.jpg";
import drinksImg from "@/assets/menu/drinks.jpg";
import wrapImg from "@/assets/menu/wrap.jpg";
import sandwichImg from "@/assets/menu/sandwich.jpg";
import dealImg from "@/assets/menu/deal.jpg";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  badge?: string;
};

export const categories = [
  "All Items",
  "Deals",
  "Sandwiches",
  "Burgers",
  "Wraps",
  "Sides",
  "Drinks",
];

export const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Classic Dagwood",
    description: "Our signature layered sandwich with premium cold cuts, cheese & fresh veggies",
    price: 750,
    image: sandwichImg,
    category: "Sandwiches",
    badge: "Bestseller",
  },
  {
    id: "2",
    name: "Crispy Chicken Burger",
    description: "Double crispy fried chicken patty with melted cheese & special sauce",
    price: 850,
    image: burgerImg,
    category: "Burgers",
    badge: "Popular",
  },
  {
    id: "3",
    name: "Grilled Chicken Wrap",
    description: "Grilled chicken with fresh vegetables wrapped in a warm tortilla",
    price: 650,
    image: wrapImg,
    category: "Wraps",
  },
  {
    id: "4",
    name: "Loaded Cheese Fries",
    description: "Crispy fries topped with cheese sauce, ground meat & fresh herbs",
    price: 450,
    image: friesImg,
    category: "Sides",
  },
  {
    id: "5",
    name: "Refreshing Shakes",
    description: "Choose from our selection of fresh milkshakes and cold beverages",
    price: 350,
    image: drinksImg,
    category: "Drinks",
  },
  {
    id: "6",
    name: "Family Deal",
    description: "2 burgers, 2 fries, 2 drinks — perfect for sharing!",
    price: 1999,
    image: dealImg,
    category: "Deals",
    badge: "Value",
  },
  {
    id: "7",
    name: "Club Sandwich",
    description: "Triple-decker with grilled chicken, turkey, bacon & mayo",
    price: 820,
    image: sandwichImg,
    category: "Sandwiches",
  },
  {
    id: "8",
    name: "Spicy Zinger Burger",
    description: "Extra spicy crispy chicken with jalapeños & pepper sauce",
    price: 890,
    image: burgerImg,
    category: "Burgers",
    badge: "Spicy 🔥",
  },
];
