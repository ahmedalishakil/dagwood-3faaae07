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
import icedAmericanoImg from "@/assets/menu/iced-americano.jpg";
import icedLatteImg from "@/assets/menu/iced-latte.jpg";
import icedMochaImg from "@/assets/menu/iced-mocha.jpg";
import icedCaramelLatteImg from "@/assets/menu/iced-caramel-latte.jpg";
import americanoImg from "@/assets/menu/americano.jpg";
import cappuccinoImg from "@/assets/menu/cappuccino.jpg";
import latteImg from "@/assets/menu/latte.jpg";
import mochaImg from "@/assets/menu/mocha.jpg";
import caramelLatteImg from "@/assets/menu/caramel-latte.jpg";
import hotChocolateImg from "@/assets/menu/hot-chocolate.jpg";
import espressoImg from "@/assets/menu/espresso.jpg";
import macchiatoImg from "@/assets/menu/macchiato.jpg";
import cakeImg from "@/assets/menu/cake.jpg";
import pistachioCakeImg from "@/assets/menu/pistachio-cake.jpg";
import cheesecakeImg from "@/assets/menu/cheesecake.jpg";
import chocFudgeDonutImg from "@/assets/menu/chocolate-fudge-donut.jpg";
import caramelDonutImg from "@/assets/menu/caramel-donut.jpg";
import bostonBrownieImg from "@/assets/menu/boston-brownie.jpg";
import milkChocCookieImg from "@/assets/menu/milk-chocolate-cookie.jpg";
import doubleChocCookieImg from "@/assets/menu/dark-chocolate-cookie.jpg";
import raspberryCookieImg from "@/assets/menu/raspberry-cookie.jpg";
import butterCroissantImg from "@/assets/menu/butter-croissant.jpg";
import walnutBrownieImg from "@/assets/menu/walnut-brownie.jpg";
import caramelAlmondBrownieImg from "@/assets/menu/caramel-almond-brownie.jpg";
import threeMilkSundaeImg from "@/assets/menu/three-milk-sundae.jpg";
import sundaeImg from "@/assets/menu/sundae.jpg";
import largeFriesImg from "@/assets/menu/large-fries.jpg";
import regularFriesImg from "@/assets/menu/regular-fries.jpg";
import coffeeImg from "@/assets/menu/coffee.jpg";
import carameloCaramel from "@/assets/menu/caramelo-caramel.jpg";
import chaiTea from "@/assets/menu/chai-tea.jpg";
import karakChai from "@/assets/menu/Karak-Chai-3.jpg";
import cardamomChai from "@/assets/menu/cardamom-chae.jpg";
import pepsi from "@/assets/menu/pepsi.jpg";
import pepsiSizer from "@/assets/menu/pep-sizer.jpg";
import sevenUp from "@/assets/menu/7up.jpg";
import sevenUpZero from "@/assets/menu/7up-zero.jpg";
import water from "@/assets/menu/water.jpg";
import chocolateFudgeCake from "@/assets/menu/chocolate-fudge-cake.jpg";
import bostonCreamyDonut from "@/assets/menu/boston-creamy-donut.jpg";
import dynamiteSauce from "@/assets/menu/dynamite-sauce.jpg";
import cheeseSauce from "@/assets/menu/cheese-sauce.jpg";
import bbqSauce from "@/assets/menu/BBQ-sauce.jpg";
import mayoSauce from "@/assets/menu/mayo-sauce.jpg";
import cocktailSauce from "@/assets/menu/cocktail-sauce.jpg";
import extraChicken from "@/assets/menu/extra-chicken.jpg";
import branBread from "@/assets/menu/bran-bread.jpeg";

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
  "Sandwiches",
  "Combos",
  "Special Drinks",
  "Shakes",
  "Cold Beverages",
  "Hot Beverages",
  "Regular Drinks",
  "Divine Cakes",
  "Donuts Delights",
  "Cookies & Croissants",
  "Brownies",
  "Sundaes",
  "Fries",
  "Sides",
];

export const menuItems: MenuItem[] = [
  // ═══ SANDWICHES (SandWich in JSON) ═══
  {
    id: "cocktail",
    item_code: "DL-0001",
    name: "Cocktail (With Fries)",
    description: "Saucy, perfectly layered chicken with fresh vegetables and signature sauces, grilled for a rich and satisfying bite",
    price: 870,
    image: cocktailImg,
    category: "Sandwiches",
    badge: "Bestseller",
  },
  {
    id: "fillet-steak",
    item_code: "DL-0002",
    name: "Fillet Steak (With Fries)",
    description: "Tender grilled fillet steak sandwich served with fries",
    price: 850,
    image: steakImg,
    category: "Sandwiches",
  },
  {
    id: "cheese-lover",
    item_code: "DL-0003",
    name: "Cheese Lover (With Fries)",
    description: "Overloaded with melted cheese, served with crispy fries",
    price: 850,
    image: cheeseLoverImg,
    category: "Sandwiches",
    badge: "Popular",
  },

  // ═══ COMBOS ═══
  {
    id: "combo-1",
    item_code: "CB-00021",
    name: "3 Chicken Strips + Fries + Dynamite Sauce",
    description: "Golden, crunchy strips with tender chicken inside, freshly prepared and full of flavor",
    price: 600,
    image: combo1Img,
    category: "Combos",
  },
  {
    id: "combo-2",
    item_code: "CB-00022",
    name: "6 Chicken Strips + Dynamite Sauce",
    description: "Golden, crunchy strips with tender chicken inside, freshly prepared and full of flavor",
    price: 900,
    image: combo2Img,
    category: "Combos",
    badge: "Value",
  },

  // ═══ SPECIAL DRINKS ═══
  {
    id: "strawberry-mint",
    item_code: "SP-0001",
    name: "Strawberry Mint",
    description: "Fresh strawberry blended with cool mint",
    price: 700,
    image: strawberryMintImg,
    category: "Special Drinks",
  },
  {
    id: "blueberry-rise",
    item_code: "SP-0002",
    name: "Blueberry Rise",
    description: "Blueberry burst with a tangy finish",
    price: 700,
    image: blueberryRiseImg,
    category: "Special Drinks",
  },
  {
    id: "peachy-paradise",
    item_code: "SP-0003",
    name: "Peachy Paradise",
    description: "Sweet peach refresher with tropical notes",
    price: 700,
    image: peachyParadiseImg,
    category: "Special Drinks",
  },

  // ═══ SHAKES ═══
  {
    id: "strawberry-vanilla-shake",
    item_code: "SH-0001",
    name: "Strawberry Vanilla Shake",
    description: "Creamy strawberry & vanilla milkshake",
    price: 750,
    image: strawberryShakeImg,
    category: "Shakes",
  },
  {
    id: "berry-blast",
    item_code: "SH-0002",
    name: "Berry Blast",
    description: "Mixed berry explosion shake",
    price: 750,
    image: berryBlastImg,
    category: "Shakes",
  },
  {
    id: "dark-temptation",
    item_code: "SH-0003",
    name: "Dark Temptation",
    description: "Rich dark chocolate indulgence shake",
    price: 750,
    image: darkTemptationImg,
    category: "Shakes",
    badge: "Fan Favourite",
  },

  // ═══ COLD BEVERAGES ═══
  {
    id: "iced-americano",
    item_code: "CB-0001",
    name: "Iced Americano",
    description: "Chilled espresso over ice",
    price: 670,
    image: icedAmericanoImg,
    category: "Cold Beverages",
  },
  {
    id: "iced-latte",
    item_code: "CB-0002",
    name: "Iced Latte",
    description: "Cold milk with espresso over ice",
    price: 850,
    image: icedLatteImg,
    category: "Cold Beverages",
  },
  {
    id: "iced-mocha",
    item_code: "CB-0003",
    name: "Iced Mocha",
    description: "Chocolate espresso served cold",
    price: 970,
    image: icedMochaImg,
    category: "Cold Beverages",
  },
  {
    id: "iced-caramel-latte",
    item_code: "CB-0004",
    name: "Iced Caramel Latte",
    description: "Caramel drizzle iced latte",
    price: 920,
    image: icedCaramelLatteImg,
    category: "Cold Beverages",
    badge: "Popular",
  },
  {
    id: "caramelo-caramel",
    item_code: "CB-0005",
    name: "Caramelo Caramel",
    description: "Rich caramel cold beverage",
    price: 1050,
    image: carameloCaramel,
    category: "Cold Beverages",
  },

  // ═══ HOT BEVERAGES (each drink shown as single card with S/L size selector) ═══
  {
    id: "americano",
    item_code: "HB-0001",
    name: "Americano",
    description: "Classic espresso with hot water",
    price: 450,
    image: americanoImg,
    category: "Hot Beverages",
    sizes: [
      { label: "Small", price: 450, item_code: "HB-0001" },
      { label: "Large", price: 570, item_code: "HB-0002" },
    ],
  },
  {
    id: "cappuccino",
    item_code: "HB-0003",
    name: "Cappuccino",
    description: "Espresso, steamed milk & rich foam",
    price: 650,
    image: cappuccinoImg,
    category: "Hot Beverages",
    sizes: [
      { label: "Small", price: 650, item_code: "HB-0003" },
      { label: "Large", price: 770, item_code: "HB-0004" },
    ],
  },
  {
    id: "latte",
    item_code: "HB-0005",
    name: "Latte",
    description: "Smooth espresso with steamed milk",
    price: 650,
    image: latteImg,
    category: "Hot Beverages",
    sizes: [
      { label: "Small", price: 650, item_code: "HB-0005" },
      { label: "Regular", price: 770, item_code: "HB-0006" },
    ],
  },
  {
    id: "mocha",
    item_code: "HB-0007",
    name: "Mocha",
    description: "Espresso, chocolate & steamed milk",
    price: 750,
    image: mochaImg,
    category: "Hot Beverages",
    sizes: [
      { label: "Small", price: 750, item_code: "HB-0007" },
      { label: "Large", price: 870, item_code: "HB-0008" },
    ],
  },
  {
    id: "caramel-latte",
    item_code: "HB-0009",
    name: "Caramel Latte",
    description: "Latte with sweet caramel drizzle",
    price: 700,
    image: caramelLatteImg,
    category: "Hot Beverages",
    badge: "Popular",
    sizes: [
      { label: "Small", price: 700, item_code: "HB-0009" },
      { label: "Large", price: 820, item_code: "HB-0010" },
    ],
  },
  {
    id: "hot-chocolate-coffee",
    item_code: "HB-0011",
    name: "Hot Chocolate",
    description: "Rich and creamy hot chocolate",
    price: 780,
    image: hotChocolateImg,
    category: "Hot Beverages",
    sizes: [
      { label: "Small", price: 780, item_code: "HB-0011" },
      { label: "Large", price: 880, item_code: "HB-0012" },
    ],
  },
  {
    id: "espresso",
    item_code: "HB-0013",
    name: "Espresso",
    description: "Double shot of pure espresso",
    price: 550,
    image: espressoImg,
    category: "Hot Beverages",
    sizes: [
      { label: "Small", price: 550, item_code: "HB-0013" },
      { label: "Large", price: 670, item_code: "HB-0014" },
    ],
  },
  {
    id: "macchiato",
    item_code: "HB-0015",
    name: "Macchiato",
    description: "Espresso marked with a dash of milk",
    price: 550,
    image: macchiatoImg,
    category: "Hot Beverages",
    sizes: [
      { label: "Small", price: 550, item_code: "HB-0015" },
      { label: "Large", price: 670, item_code: "HB-0016" },
    ],
  },
  {
    id: "tea",
    item_code: "HB-0017",
    name: "Tea",
    description: "Classic Pakistani chai",
    price: 190,
    image: chaiTea,
    category: "Hot Beverages",
  },
  {
    id: "karak-chae",
    item_code: "HB-0018",
    name: "Karak Chae",
    description: "Strong, aromatic karak-style tea",
    price: 350,
    image: karakChai,
    category: "Hot Beverages",
  },
  {
    id: "cardamom-chae",
    item_code: "HB-0019",
    name: "Cardamom Chae",
    description: "Fragrant cardamom-infused tea",
    price: 350,
    image: cardamomChai,
    category: "Hot Beverages",
  },
  {
    id: "hot-chocolate-standalone",
    item_code: "HB-0020",
    name: "Hot Chocolate (Classic)",
    description: "Warm & creamy hot chocolate",
    price: 450,
    image: hotChocolateImg,
    category: "Hot Beverages",
  },

  // ═══ REGULAR DRINKS ═══
  {
    id: "pepsi-345",
    item_code: "CB-0006",
    name: "Pepsi 345ml",
    description: "Chilled Pepsi can",
    price: 150,
    image: pepsi,
    category: "Regular Drinks",
  },
  {
    id: "diet-pepsi-345",
    item_code: "CB-0009",
    name: "Diet Pepsi 345ml",
    description: "Sugar-free Pepsi can",
    price: 150,
    image: pepsiSizer,
    category: "Regular Drinks",
  },
  {
    id: "7up-345",
    item_code: "CB-0007",
    name: "7-UP 345ml",
    description: "Refreshing 7-UP can",
    price: 150,
    image: sevenUp,
    category: "Regular Drinks",
  },
  {
    id: "diet-7up-345",
    item_code: "CB-0010",
    name: "Diet 7-UP 345ml",
    description: "Sugar-free 7-UP can",
    price: 150,
    image: sevenUpZero,
    category: "Regular Drinks",
  },
  {
    id: "water-small",
    item_code: "CB-0008",
    name: "Water Small",
    description: "Mineral water bottle",
    price: 50,
    image: water,
    category: "Regular Drinks",
  },

  // ═══ DIVINE CAKES ═══
  {
    id: "chocolate-fudge-cake",
    item_code: "DC-0001",
    name: "Chocolate Fudge Cake Slice",
    description: "Rich, decadent chocolate fudge cake",
    price: 599,
    image: chocolateFudgeCake,
    category: "Divine Cakes",
  },
  {
    id: "pistachio-chunky-cake",
    item_code: "DC-0002",
    name: "Pistachio Chunky Cake Slice",
    description: "Pistachio loaded cake with creamy layers",
    price: 799,
    image: pistachioCakeImg,
    category: "Divine Cakes",
  },
  {
    id: "red-velvet-cake",
    item_code: "DC-0003",
    name: "Red Velvet Cake Slice",
    description: "Classic red velvet with cream cheese frosting",
    price: 599,
    image: cakeImg,
    category: "Divine Cakes",
    badge: "Fan Favourite",
  },
  {
    id: "cheese-cake",
    item_code: "DC-0004",
    name: "Cheese Cake Slice",
    description: "New York style creamy cheesecake",
    price: 799,
    image: cheesecakeImg,
    category: "Divine Cakes",
  },

  // ═══ DONUTS DELIGHTS ═══
  {
    id: "boston-creamy-donut",
    item_code: "DD-0001",
    name: "Boston Creamy Donut",
    description: "Boston cream filled donut",
    price: 320,
    image: bostonCreamyDonut,
    category: "Donuts Delights",
  },
  {
    id: "creamy-caramel-donut",
    item_code: "DD-0002",
    name: "Creamy Caramel Donut",
    description: "Soft donut with caramel cream filling",
    price: 320,
    image: caramelDonutImg,
    category: "Donuts Delights",
  },
  {
    id: "chocolate-fudge-donut",
    item_code: "DD-0003",
    name: "Chocolate Fudge Donut",
    description: "Glazed donut with rich chocolate fudge topping",
    price: 320,
    image: chocFudgeDonutImg,
    category: "Donuts Delights",
  },

  // ═══ COOKIES & CROISSANTS ═══
  {
    id: "milk-chocolate-cookie",
    item_code: "CC-0001",
    name: "Milk Chocolate Cookie",
    description: "Chunky milk chocolate chip cookie",
    price: 330,
    image: milkChocCookieImg,
    category: "Cookies & Croissants",
  },
  {
    id: "double-chocolate-cookie",
    item_code: "CC-0002",
    name: "Double Chocolate Cookie",
    description: "Double chocolate loaded cookie",
    price: 330,
    image: doubleChocCookieImg,
    category: "Cookies & Croissants",
  },
  {
    id: "raspberry-cookie",
    item_code: "CC-0003",
    name: "Raspberry Cookie",
    description: "White chocolate & raspberry cookie",
    price: 330,
    image: raspberryCookieImg,
    category: "Cookies & Croissants",
  },
  {
    id: "butter-croissant",
    item_code: "CC-0004",
    name: "Butter Croissant",
    description: "Flaky, golden butter croissant",
    price: 399,
    image: butterCroissantImg,
    category: "Cookies & Croissants",
  },

  // ═══ BROWNIES ═══
  {
    id: "walnut-chocolate-brownie",
    item_code: "BS-0001",
    name: "Walnut Chocolate Brownie",
    description: "Fudgy chocolate brownie with walnut chunks",
    price: 399,
    image: walnutBrownieImg,
    category: "Brownies",
    badge: "Chef's Pick",
  },
  {
    id: "caramel-almond-brownie",
    item_code: "BS-0002",
    name: "Caramel Almond Brownie",
    description: "Caramel swirl brownie with toasted almonds",
    price: 399,
    image: caramelAlmondBrownieImg,
    category: "Brownies",
  },

  // ═══ SUNDAES ═══
  {
    id: "chocolate-explosion-sundae",
    item_code: "SD-0001",
    name: "Chocolate Explosion",
    description: "Triple chocolate overload sundae",
    price: 650,
    image: sundaeImg,
    category: "Sundaes",
    badge: "Indulgent",
  },
  {
    id: "three-milk-sundae",
    item_code: "SD-0002",
    name: "Three Milk",
    description: "Tres leches inspired ice cream sundae",
    price: 650,
    image: threeMilkSundaeImg,
    category: "Sundaes",
  },

  // ═══ FRIES ═══
  {
    id: "regular-fries",
    item_code: "FR-00026",
    name: "Regular Fries",
    description: "Golden crispy french fries",
    price: 350,
    image: regularFriesImg,
    category: "Fries",
  },
  {
    id: "large-fries",
    item_code: "FR-00027",
    name: "Large Fries",
    description: "Extra large portion of crispy fries",
    price: 500,
    image: largeFriesImg,
    category: "Fries",
  },

  // ═══ SIDES ═══
  {
    id: "dynamite-sauce",
    item_code: "SD-00021",
    name: "Dynamite Sauce",
    description: "Signature spicy dynamite dipping sauce",
    price: 90,
    image: dynamiteSauce,
    category: "Sides",
  },
  {
    id: "cheese-sauce",
    item_code: "SD-00022",
    name: "Cheese Sauce",
    description: "Rich melted cheese dipping sauce",
    price: 100,
    image: cheeseSauce,
    category: "Sides",
  },
  {
    id: "mayo-sauce-dip",
    item_code: "SD-00028",
    name: "Mayo Sauce Dip",
    description: "Creamy mayo dipping sauce",
    price: 90,
    image: mayoSauce,
    category: "Sides",
  },
  {
    id: "bran-bread",
    item_code: "SD-00023",
    name: "Bran Bread",
    description: "Healthy bran bread side",
    price: 80,
    image: branBread,
    category: "Sides",
  },
  {
    id: "extra-chicken",
    item_code: "SD-00030",
    name: "Extra Chicken",
    description: "Additional chicken portion",
    price: 120,
    image: extraChicken,
    category: "Sides",
  },
];