import cocktailImg from "@/assets/menu/cocktail.jpg";
import cheeseLoverImg from "@/assets/menu/cheese-lover.jpg";
import steakImg from "@/assets/menu/steak.jpg";
import comboImg from "@/assets/menu/combo.jpg";
import specialDrinksImg from "@/assets/menu/special-drinks.jpg";
import shakeImg from "@/assets/menu/shake.jpg";
import coffeeImg from "@/assets/menu/coffee.jpg";
import icedCoffeeImg from "@/assets/menu/iced-coffee.jpg";
import cakeImg from "@/assets/menu/cake.jpg";
import pistachioCakeImg from "@/assets/menu/pistachio-cake.jpg";
import cheesecakeImg from "@/assets/menu/cheesecake.jpg";
import donutImg from "@/assets/menu/donut.jpg";
import cookiesImg from "@/assets/menu/cookies.jpg";
import brownieImg from "@/assets/menu/brownie.jpg";
import sundaeImg from "@/assets/menu/sundae.jpg";
import darkTemptationImg from "@/assets/menu/dark-temptation.png";
import strawberryShakeImg from "@/assets/menu/strawberry-shake.png";
import friesImg from "@/assets/menu/sides-fries.jpg";

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
  "Sandwiches",
  "Combos",
  "Special Drinks",
  "Shakes",
  "Hot Coffee",
  "Cold Coffee",
  "Divine Cakes",
  "Donuts",
  "Cookies & Croissants",
  "Brownies",
  "Sundaes",
  "Sides",
];

export const menuItems: MenuItem[] = [
  // === SANDWICHES ===
  {
    id: "cocktail",
    name: "Cocktail",
    description: "Signature loaded sandwich with fries — Dagwood's classic bestseller",
    price: 870,
    image: cocktailImg,
    category: "Sandwiches",
    badge: "Bestseller",
  },
  {
    id: "cheese-lover",
    name: "Cheese Lover",
    description: "Overloaded with melted cheese, served with crispy fries",
    price: 850,
    image: cheeseLoverImg,
    category: "Sandwiches",
    badge: "Popular",
  },
  {
    id: "fillet-steak",
    name: "Fillet Steak",
    description: "Tender grilled fillet steak sandwich served with fries",
    price: 850,
    image: steakImg,
    category: "Sandwiches",
  },

  // === COMBOS ===
  {
    id: "combo-1",
    name: "Combo 1",
    description: "3 Chicken Strips, Fries & a Drink",
    price: 600,
    image: comboImg,
    category: "Combos",
  },
  {
    id: "combo-2",
    name: "Combo 2",
    description: "6 Chicken Strips, Fries & a Drink",
    price: 900,
    image: comboImg,
    category: "Combos",
    badge: "Value",
  },

  // === SPECIAL DRINKS ===
  {
    id: "strawberry-mint",
    name: "Strawberry Mint",
    description: "Fresh strawberry blended with cool mint",
    price: 700,
    image: specialDrinksImg,
    category: "Special Drinks",
  },
  {
    id: "peachy-paradise",
    name: "Peachy Paradise",
    description: "Sweet peach refresher with tropical notes",
    price: 700,
    image: specialDrinksImg,
    category: "Special Drinks",
  },
  {
    id: "blueberry-rise",
    name: "Blueberry Rise",
    description: "Blueberry burst with a tangy finish",
    price: 700,
    image: specialDrinksImg,
    category: "Special Drinks",
  },

  // === SHAKES ===
  {
    id: "strawberry-vanilla-shake",
    name: "Strawberry Vanilla Shake",
    description: "Creamy strawberry & vanilla milkshake",
    price: 750,
    image: strawberryShakeImg,
    category: "Shakes",
  },
  {
    id: "berry-blast",
    name: "Berry Blast",
    description: "Mixed berry explosion shake",
    price: 750,
    image: shakeImg,
    category: "Shakes",
  },
  {
    id: "dark-temptation",
    name: "Dark Temptation",
    description: "Rich dark chocolate indulgence shake",
    price: 750,
    image: darkTemptationImg,
    category: "Shakes",
    badge: "Fan Favourite",
  },

  // === HOT COFFEE ===
  {
    id: "americano",
    name: "Americano",
    description: "Classic espresso with hot water",
    price: 450,
    image: coffeeImg,
    category: "Hot Coffee",
  },
  {
    id: "latte",
    name: "Latte",
    description: "Smooth espresso with steamed milk",
    price: 650,
    image: coffeeImg,
    category: "Hot Coffee",
  },
  {
    id: "cappuccino",
    name: "Cappuccino",
    description: "Espresso, steamed milk & rich foam",
    price: 650,
    image: coffeeImg,
    category: "Hot Coffee",
  },
  {
    id: "caramel-latte",
    name: "Caramel Latte",
    description: "Latte with sweet caramel drizzle",
    price: 700,
    image: coffeeImg,
    category: "Hot Coffee",
    badge: "Popular",
  },
  {
    id: "mocha",
    name: "Mocha",
    description: "Espresso, chocolate & steamed milk",
    price: 750,
    image: coffeeImg,
    category: "Hot Coffee",
  },
  {
    id: "hot-chocolate",
    name: "Hot Chocolate",
    description: "Rich and creamy hot chocolate",
    price: 780,
    image: coffeeImg,
    category: "Hot Coffee",
  },
  {
    id: "espresso",
    name: "Espresso",
    description: "Double shot of pure espresso",
    price: 550,
    image: coffeeImg,
    category: "Hot Coffee",
  },
  {
    id: "macchiato",
    name: "Macchiato",
    description: "Espresso marked with a dash of milk",
    price: 530,
    image: coffeeImg,
    category: "Hot Coffee",
  },

  // === COLD COFFEE ===
  {
    id: "iced-americano",
    name: "Iced Americano",
    description: "Chilled espresso over ice",
    price: 670,
    image: icedCoffeeImg,
    category: "Cold Coffee",
  },
  {
    id: "iced-latte",
    name: "Iced Latte",
    description: "Cold milk with espresso over ice",
    price: 850,
    image: icedCoffeeImg,
    category: "Cold Coffee",
  },
  {
    id: "iced-mocha",
    name: "Iced Mocha",
    description: "Chocolate espresso served cold",
    price: 920,
    image: icedCoffeeImg,
    category: "Cold Coffee",
  },
  {
    id: "iced-caramel-latte",
    name: "Iced Caramel Latte",
    description: "Caramel drizzle iced latte",
    price: 970,
    image: icedCoffeeImg,
    category: "Cold Coffee",
    badge: "Popular",
  },

  // === DIVINE CAKES ===
  {
    id: "chocolate-fudge-cake",
    name: "Chocolate Fudge Cake Slice",
    description: "Rich, decadent chocolate fudge cake",
    price: 599,
    image: cakeImg,
    category: "Divine Cakes",
  },
  {
    id: "red-velvet-cake",
    name: "Red Velvet Cake Slice",
    description: "Classic red velvet with cream cheese frosting",
    price: 599,
    image: cakeImg,
    category: "Divine Cakes",
    badge: "Fan Favourite",
  },
  {
    id: "pistachio-chunky-cake",
    name: "Pistachio Chunky Cake Slice",
    description: "Pistachio loaded cake with creamy layers",
    price: 799,
    image: pistachioCakeImg,
    category: "Divine Cakes",
  },
  {
    id: "cheese-cake",
    name: "Cheese Cake",
    description: "New York style creamy cheesecake",
    price: 799,
    image: cheesecakeImg,
    category: "Divine Cakes",
  },

  // === DONUTS ===
  {
    id: "chocolate-fudge-donut",
    name: "Chocolate Fudge Donut",
    description: "Glazed donut with rich chocolate fudge topping",
    price: 320,
    image: donutImg,
    category: "Donuts",
  },
  {
    id: "creamy-caramel-donut",
    name: "Creamy Caramel Donut",
    description: "Soft donut with caramel cream filling",
    price: 320,
    image: donutImg,
    category: "Donuts",
  },

  // === COOKIES & CROISSANTS ===
  {
    id: "milk-chocolate-cookie",
    name: "Milk Chocolate Cookie",
    description: "Chunky milk chocolate chip cookie",
    price: 330,
    image: cookiesImg,
    category: "Cookies & Croissants",
  },
  {
    id: "double-chocolate-cookie",
    name: "Double Chocolate Cookie",
    description: "Double chocolate loaded cookie",
    price: 330,
    image: cookiesImg,
    category: "Cookies & Croissants",
  },
  {
    id: "raspberry-cookie",
    name: "Raspberry Cookie",
    description: "White chocolate & raspberry cookie",
    price: 330,
    image: cookiesImg,
    category: "Cookies & Croissants",
  },
  {
    id: "butter-croissant",
    name: "Butter Croissant",
    description: "Flaky, golden butter croissant",
    price: 330,
    image: cookiesImg,
    category: "Cookies & Croissants",
  },

  // === BROWNIES ===
  {
    id: "walnut-chocolate-brownie",
    name: "Walnut Chocolate",
    description: "Fudgy chocolate brownie with walnut chunks",
    price: 399,
    image: brownieImg,
    category: "Brownies",
    badge: "Chef's Pick",
  },
  {
    id: "caramel-almond-brownie",
    name: "Caramel Almond",
    description: "Caramel swirl brownie with toasted almonds",
    price: 399,
    image: brownieImg,
    category: "Brownies",
  },
  {
    id: "boston-creamy-brownie",
    name: "Boston Creamy",
    description: "Boston cream inspired brownie",
    price: 320,
    image: brownieImg,
    category: "Brownies",
  },

  // === SUNDAES ===
  {
    id: "three-milk-sundae",
    name: "Three Milk Sundae",
    description: "Tres leches inspired ice cream sundae",
    price: 650,
    image: sundaeImg,
    category: "Sundaes",
  },
  {
    id: "chocolate-explosion-sundae",
    name: "Chocolate Explosion",
    description: "Triple chocolate overload sundae",
    price: 650,
    image: sundaeImg,
    category: "Sundaes",
    badge: "Indulgent",
  },

  // === SIDES ===
  {
    id: "regular-fries",
    name: "Regular Fries",
    description: "Golden crispy french fries",
    price: 350,
    image: friesImg,
    category: "Sides",
  },
  {
    id: "large-fries",
    name: "Large Fries",
    description: "Extra large portion of golden fries",
    price: 500,
    image: friesImg,
    category: "Sides",
  },
];
