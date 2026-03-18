// === Image imports — reuse existing app images ===
import cocktailImg from "@/assets/menu/cocktail.jpg";
import cheeseLoverImg from "@/assets/menu/cheese-lover.jpg";
import steakImg from "@/assets/menu/steak.jpg";
import combo1Img from "@/assets/menu/combo1.jpg";
import combo2Img from "@/assets/menu/combo2.jpg";
import strawberryMintImg from "@/assets/menu/strawberry-mint.jpg";
import peachyParadiseImg from "@/assets/menu/peachy-paradise.jpg";
import blueberryRiseImg from "@/assets/menu/bluebearry-rise.jpg";
import strawberryShakeImg from "@/assets/menu/strawberry-shake.jpg";
import berryBlastImg from "@/assets/menu/berry-blast.jpg";
import darkTemptationImg from "@/assets/menu/dark-temptation.jpg";
import milkChocCookieImg from "@/assets/menu/milk-chocolate-cookie.jpg";
import doubleChocCookieImg from "@/assets/menu/dark-chocolate-cookie.jpg";
import butterCroissantImg from "@/assets/menu/butter-croissant.jpg";
import walnutBrownieImg from "@/assets/menu/walnut-brownie.jpg";
import caramelAlmondBrownieImg from "@/assets/menu/caramel-almond-brownie.jpg";
import threeMilkSundaeImg from "@/assets/menu/three-milk-sundae.jpg";
import sundaeImg from "@/assets/menu/sundae.jpg";
import largeFriesImg from "@/assets/menu/large-fries.jpg";
import regularFriesImg from "@/assets/menu/regular-fries.jpg";
import karakChai from "@/assets/menu/Karak-Chai-3.jpg";
import cardamomChai from "@/assets/menu/cardamom-chae.jpg";
import pepsi from "@/assets/menu/pepsi.jpg";
import pepsiSizer from "@/assets/menu/pep-sizer.jpg";
import sevenUp from "@/assets/menu/7up.jpg";
import sevenUpZero from "@/assets/menu/7up-zero.jpg";
import water from "@/assets/menu/water.jpg";
import chocolateFudgeCake from "@/assets/menu/chocolate-fudge-cake.jpg";
import pistachioCakeImg from "@/assets/menu/pistachio-cake.jpg";
import cakeImg from "@/assets/menu/cake.jpg";
import bostonCreamyDonut from "@/assets/menu/boston-creamy-donut.jpg";
import chocFudgeDonutImg from "@/assets/menu/chocolate-fudge-donut.jpg";
import caramelDonutImg from "@/assets/menu/caramel-donut.jpg";
import dynamiteSauce from "@/assets/menu/dynamite-sauce.jpg";
import cheeseSauce from "@/assets/menu/cheese-sauce.jpg";
import bbqSauce from "@/assets/menu/BBQ-sauce.jpg";
import mayoSauce from "@/assets/menu/mayo-sauce.jpg";
import cocktailSauce from "@/assets/menu/cocktail-sauce.jpg";

// === D-Cafe Drinks images (commented out — category hidden for now) ===
// import icedAmericanoImg from "@/assets/menu/iced-americano.jpg";
// import icedLatteImg from "@/assets/menu/iced-latte.jpg";
// import icedMochaImg from "@/assets/menu/iced-mocha.jpg";
// import icedCaramelLatteImg from "@/assets/menu/iced-caramel-latte.jpg";
// import americanoImg from "@/assets/menu/americano.jpg";
// import cappuccinoImg from "@/assets/menu/cappuccino.jpg";
// import latteImg from "@/assets/menu/latte.jpg";
// import mochaImg from "@/assets/menu/mocha.jpg";
// import caramelLatteImg from "@/assets/menu/caramel-latte.jpg";
// import hotChocolateImg from "@/assets/menu/hot-chocolate.jpg";
// import espressoImg from "@/assets/menu/espresso.jpg";
// import macchiatoImg from "@/assets/menu/macchiato.jpg";
// import carameloCaramel from "@/assets/menu/caramelo-caramel.jpg";
// import chaiTea from "@/assets/menu/chai-tea.jpg";

const API_BASE = "https://dagwood.com.pk";

export type MenuItemSize = {
  label: string;
  price: number;
  item_code: string;
};

export type MenuItem = {
  id: string;
  item_code: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  badge?: string;
  sizes?: MenuItemSize[];
};

export const categories = [
  "All Items",
  "Sandwich with Fries",
  "Chicken with Fries",
  "Beverages",
  "Desserts",
  "Condiments",
  // "D-Cafe Drinks", // hidden for now
];

export const menuItems: MenuItem[] = [
  // ═══ SANDWICH WITH FRIES ═══
  {
    id: "cocktail",
    item_code: "DL-0001",
    name: "Cocktail (With Fries)",
    description: "Saucy, perfectly layered chicken with fresh vegetables and signature sauces, grilled for a rich and satisfying bite",
    price: 870,
    image: cocktailImg,
    category: "Sandwich with Fries",
    badge: "Bestseller",
  },
  {
    id: "fillet-steak",
    item_code: "DL-0002",
    name: "Fillet Steak (With Fries)",
    description: "Grilled fillet steak with fresh vegetables and bold sauces for a rich, powerful flavor",
    price: 850,
    image: steakImg,
    category: "Sandwich with Fries",
  },
  {
    id: "cheese-lover",
    item_code: "DL-0003",
    name: "Cheese Lover (With Fries)",
    description: "Overloaded with melted cheese, served with crispy fries",
    price: 850,
    image: cheeseLoverImg,
    category: "Sandwich with Fries",
    badge: "Popular",
  },

  // ═══ CHICKEN WITH FRIES ═══
  {
    id: "combo-1",
    item_code: "CB-00021",
    name: "3 Chicken Strips + Fries + Dynamite Sauce",
    description: "Golden, crunchy strips with tender chicken inside, freshly prepared and full of flavor",
    price: 600,
    image: combo1Img,
    category: "Chicken with Fries",
  },
  {
    id: "combo-2",
    item_code: "CB-00022",
    name: "6 Chicken Strips + Dynamite Sauce",
    description: "Golden, crunchy strips with tender chicken inside, freshly prepared and full of flavor",
    price: 900,
    image: combo2Img,
    category: "Chicken with Fries",
    badge: "Value",
  },
  {
    id: "regular-fries",
    item_code: "FR-00026",
    name: "Regular Fries",
    description: "Golden crispy french fries",
    price: 350,
    image: regularFriesImg,
    category: "Chicken with Fries",
  },
  {
    id: "large-fries",
    item_code: "FR-00027",
    name: "Large Fries",
    description: "Extra large portion of crispy fries",
    price: 500,
    image: largeFriesImg,
    category: "Chicken with Fries",
  },

  // ═══ BEVERAGES ═══
  {
    id: "pepsi-345",
    item_code: "CB-0006",
    name: "Pepsi 345ml",
    description: "Chilled Pepsi can",
    price: 150,
    image: pepsi,
    category: "Beverages",
  },
  {
    id: "7up-345",
    item_code: "CB-0007",
    name: "7-UP 345ml",
    description: "Refreshing 7-UP can",
    price: 150,
    image: sevenUp,
    category: "Beverages",
  },
  {
    id: "water-small",
    item_code: "CB-0008",
    name: "Water Small",
    description: "Mineral water bottle",
    price: 50,
    image: water,
    category: "Beverages",
  },
  {
    id: "diet-pepsi-345",
    item_code: "CB-0009",
    name: "Pepsi Zero 345ml",
    description: "Sugar-free Pepsi can",
    price: 150,
    image: pepsiSizer,
    category: "Beverages",
  },
  {
    id: "diet-7up-345",
    item_code: "CB-0010",
    name: "7-UP Zero 345ml",
    description: "Sugar-free 7-UP can",
    price: 150,
    image: sevenUpZero,
    category: "Beverages",
  },
  {
    id: "cardamom-chae",
    item_code: "HB-0019",
    name: "Cardamom Chae",
    description: "Fragrant cardamom-infused tea",
    price: 350,
    image: cardamomChai,
    category: "Beverages",
  },
  {
    id: "karak-chae",
    item_code: "HB-0021",
    name: "Karak Chai",
    description: "Strong, aromatic karak-style tea",
    price: 350,
    image: karakChai,
    category: "Beverages",
  },
  {
    id: "strawberry-vanilla-shake",
    item_code: "SH-0001",
    name: "Strawberry Vanilla",
    description: "Creamy strawberry & vanilla milkshake",
    price: 750,
    image: strawberryShakeImg,
    category: "Beverages",
  },
  {
    id: "berry-blast",
    item_code: "SH-0002",
    name: "Berry Blast",
    description: "A refreshing blend of blueberry and vanilla ice cream",
    price: 750,
    image: berryBlastImg,
    category: "Beverages",
  },
  {
    id: "dark-temptation",
    item_code: "SH-0003",
    name: "Dark Temptation",
    description: "Rich, creamy chocolate shake for true chocolate lovers",
    price: 750,
    image: darkTemptationImg,
    category: "Beverages",
    badge: "Fan Favourite",
  },
  {
    id: "strawberry-mint",
    item_code: "SP-0001",
    name: "Strawberry Mint",
    description: "Fresh strawberry blended with cool mint",
    price: 700,
    image: strawberryMintImg,
    category: "Beverages",
  },
  {
    id: "blueberry-rise",
    item_code: "SP-0002",
    name: "Blueberry Rise",
    description: "Blueberry burst with a tangy finish",
    price: 700,
    image: blueberryRiseImg,
    category: "Beverages",
  },
  {
    id: "peachy-paradise",
    item_code: "SP-0003",
    name: "Peachy Paradise",
    description: "Sweet peach refresher with tropical notes",
    price: 700,
    image: peachyParadiseImg,
    category: "Beverages",
  },

  // ═══ DESSERTS ═══
  {
    id: "walnut-chocolate-brownie",
    item_code: "BS-0001",
    name: "Walnut Chocolate Brownie",
    description: "Fudgy chocolate brownie with walnut chunks",
    price: 399,
    image: walnutBrownieImg,
    category: "Desserts",
    badge: "Chef's Pick",
  },
  {
    id: "caramel-almond-brownie",
    item_code: "BS-0002",
    name: "Caramel Almond Brownie",
    description: "Caramel swirl brownie with toasted almonds",
    price: 399,
    image: caramelAlmondBrownieImg,
    category: "Desserts",
  },
  {
    id: "milk-chocolate-cookie",
    item_code: "CC-0001",
    name: "Milk Chocolate Cookie",
    description: "Chunky milk chocolate chip cookie",
    price: 330,
    image: milkChocCookieImg,
    category: "Desserts",
  },
  {
    id: "double-chocolate-cookie",
    item_code: "CC-0002",
    name: "Double Chocolate Cookie",
    description: "Double chocolate loaded cookie",
    price: 330,
    image: doubleChocCookieImg,
    category: "Desserts",
  },
  {
    id: "butter-croissant",
    item_code: "CC-0004",
    name: "Butter Croissant",
    description: "Flaky, golden butter croissant",
    price: 399,
    image: butterCroissantImg,
    category: "Desserts",
  },
  {
    id: "chocolate-fudge-cake",
    item_code: "DC-0001",
    name: "Chocolate Fudge Cake Slice",
    description: "Rich, decadent chocolate fudge cake",
    price: 599,
    image: chocolateFudgeCake,
    category: "Desserts",
  },
  {
    id: "pistachio-chunky-cake",
    item_code: "DC-0002",
    name: "Pistachio Chunky Cake Slice",
    description: "Pistachio loaded cake with creamy layers",
    price: 799,
    image: pistachioCakeImg,
    category: "Desserts",
  },
  {
    id: "red-velvet-cake",
    item_code: "DC-0003",
    name: "Red Velvet Cake Slice",
    description: "Classic red velvet with cream cheese frosting",
    price: 599,
    image: cakeImg,
    category: "Desserts",
    badge: "Fan Favourite",
  },
  {
    id: "boston-cream-donut",
    item_code: "FP-005",
    name: "Boston Cream Donut",
    description: "Boston cream filled donut",
    price: 320,
    image: bostonCreamyDonut,
    category: "Desserts",
  },
  {
    id: "chocolate-fudge-donut",
    item_code: "FP-006",
    name: "Chocolate Fudge Donut",
    description: "Glazed donut with rich chocolate fudge topping",
    price: 320,
    image: chocFudgeDonutImg,
    category: "Desserts",
  },
  {
    id: "caramel-cream-donut",
    item_code: "FP-007",
    name: "Caramel Cream Donut",
    description: "Soft donut with caramel cream filling",
    price: 320,
    image: caramelDonutImg,
    category: "Desserts",
  },
  {
    id: "chocolate-explosion-sundae",
    item_code: "SD-0001",
    name: "Chocolate Explosion",
    description: "Triple chocolate overload sundae",
    price: 650,
    image: sundaeImg,
    category: "Desserts",
    badge: "Indulgent",
  },
  {
    id: "three-milk-sundae",
    item_code: "SD-0002",
    name: "Three Milk",
    description: "Tres leches inspired ice cream sundae",
    price: 650,
    image: threeMilkSundaeImg,
    category: "Desserts",
  },

  // ═══ CONDIMENTS ═══
  {
    id: "cocktail-sauce",
    item_code: "SD-00020",
    name: "Cocktail Sauce",
    description: "Classic cocktail dipping sauce",
    price: 100,
    image: cocktailSauce,
    category: "Condiments",
  },
  {
    id: "dynamite-sauce",
    item_code: "SD-00021",
    name: "Dynamite Sauce Dip",
    description: "Signature spicy dynamite dipping sauce",
    price: 90,
    image: dynamiteSauce,
    category: "Condiments",
  },
  {
    id: "cheese-sauce",
    item_code: "SD-00022",
    name: "Cheese Sauce Dip",
    description: "Rich melted cheese dipping sauce",
    price: 100,
    image: cheeseSauce,
    category: "Condiments",
  },
  {
    id: "mayo-sauce-dip",
    item_code: "SD-00028",
    name: "Mayo Sauce Dip",
    description: "Creamy mayo dipping sauce",
    price: 90,
    image: mayoSauce,
    category: "Condiments",
  },
  {
    id: "bbq-sauce",
    item_code: "SD-00029",
    name: "BBQ Sauce",
    description: "Smoky BBQ dipping sauce",
    price: 80,
    image: bbqSauce,
    category: "Condiments",
  },

  // ═══ D-CAFE DRINKS (hidden for now) ═══
  // {
  //   id: "americano-hot",
  //   item_code: "HB-0002",
  //   name: "Americano Hot",
  //   description: "Americano (L)",
  //   price: 570,
  //   image: americanoImg,
  //   category: "D-Cafe Drinks",
  // },
  // {
  //   id: "cappuccino",
  //   item_code: "HB-0004",
  //   name: "Cappuccino",
  //   description: "Cappuccino (L)",
  //   price: 770,
  //   image: cappuccinoImg,
  //   category: "D-Cafe Drinks",
  // },
  // {
  //   id: "latte-hot",
  //   item_code: "HB-0005",
  //   name: "Latte Hot",
  //   description: "Latte (S)",
  //   price: 650,
  //   image: latteImg,
  //   category: "D-Cafe Drinks",
  // },
  // {
  //   id: "mocha-hot",
  //   item_code: "HB-0007",
  //   name: "Mocha Hot",
  //   description: "Mocha (S)",
  //   price: 750,
  //   image: mochaImg,
  //   category: "D-Cafe Drinks",
  // },
  // {
  //   id: "caramel-latte-s",
  //   item_code: "HB-0009",
  //   name: "Caramel Latte",
  //   description: "Caramel Latte (S)",
  //   price: 700,
  //   image: caramelLatteImg,
  //   category: "D-Cafe Drinks",
  // },
  // {
  //   id: "caramel-latte-l",
  //   item_code: "HB-0010",
  //   name: "Caramel Latte (L)",
  //   description: "Caramel Latte (L)",
  //   price: 820,
  //   image: caramelLatteImg,
  //   category: "D-Cafe Drinks",
  // },
  // {
  //   id: "hot-chocolate-s",
  //   item_code: "HB-0011",
  //   name: "Hot Chocolate",
  //   description: "Hot Chocolate (S)",
  //   price: 780,
  //   image: hotChocolateImg,
  //   category: "D-Cafe Drinks",
  // },
  // {
  //   id: "hot-chocolate-l",
  //   item_code: "HB-0012",
  //   name: "Hot Chocolate (L)",
  //   description: "Hot Chocolate (L)",
  //   price: 880,
  //   image: hotChocolateImg,
  //   category: "D-Cafe Drinks",
  // },
  // {
  //   id: "espresso",
  //   item_code: "HB-0013",
  //   name: "Espresso",
  //   description: "Espresso (S)",
  //   price: 550,
  //   image: espressoImg,
  //   category: "D-Cafe Drinks",
  // },
  // {
  //   id: "macchiato",
  //   item_code: "HB-0015",
  //   name: "Macchiato",
  //   description: "Macchiato (S)",
  //   price: 550,
  //   image: macchiatoImg,
  //   category: "D-Cafe Drinks",
  // },
  // {
  //   id: "tea",
  //   item_code: "HB-0017",
  //   name: "Tea",
  //   description: "Classic Pakistani chai",
  //   price: 190,
  //   image: chaiTea,
  //   category: "D-Cafe Drinks",
  // },
  // {
  //   id: "iced-americano",
  //   item_code: "CB-0001",
  //   name: "Iced Americano",
  //   description: "Chilled espresso over ice",
  //   price: 670,
  //   image: icedAmericanoImg,
  //   category: "D-Cafe Drinks",
  // },
  // {
  //   id: "iced-latte",
  //   item_code: "CB-0002",
  //   name: "Iced Latte",
  //   description: "Cold milk with espresso over ice",
  //   price: 850,
  //   image: icedLatteImg,
  //   category: "D-Cafe Drinks",
  // },
  // {
  //   id: "iced-mocha",
  //   item_code: "CB-0003",
  //   name: "Iced Mocha",
  //   description: "Chocolate espresso served cold",
  //   price: 970,
  //   image: icedMochaImg,
  //   category: "D-Cafe Drinks",
  // },
  // {
  //   id: "iced-caramel-latte",
  //   item_code: "CB-0004",
  //   name: "Iced Caramel Latte",
  //   description: "Caramel drizzle iced latte",
  //   price: 920,
  //   image: icedCaramelLatteImg,
  //   category: "D-Cafe Drinks",
  // },
  // {
  //   id: "caramelo-caramel",
  //   item_code: "CB-0005",
  //   name: "Caramelo Caramel",
  //   description: "Rich caramel cold beverage",
  //   price: 1050,
  //   image: carameloCaramel,
  //   category: "D-Cafe Drinks",
  // },
  // {
  //   id: "cappuccino-iced",
  //   item_code: "STO-ITEM-2026-00011",
  //   name: "Cappuccino Iced",
  //   description: "Iced Cappuccino",
  //   price: 770,
  //   image: cappuccinoImg,
  //   category: "D-Cafe Drinks",
  // },
  // {
  //   id: "latte-iced",
  //   item_code: "STO-ITEM-2026-00012",
  //   name: "Latte Iced",
  //   description: "Iced Latte",
  //   price: 650,
  //   image: latteImg,
  //   category: "D-Cafe Drinks",
  // },
  // {
  //   id: "americano-iced",
  //   item_code: "STO-ITEM-2026-00013",
  //   name: "Americano Iced",
  //   description: "Iced Americano",
  //   price: 570,
  //   image: americanoImg,
  //   category: "D-Cafe Drinks",
  // },
  // {
  //   id: "mocha-iced",
  //   item_code: "STO-ITEM-2026-00014",
  //   name: "Mocha Iced",
  //   description: "Iced Mocha",
  //   price: 750,
  //   image: mochaImg,
  //   category: "D-Cafe Drinks",
  // },
];
