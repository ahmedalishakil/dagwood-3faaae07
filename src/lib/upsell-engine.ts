import { menuItems, type MenuItem } from "@/data/menu";
import type { CartItem } from "@/types/cart";

// Category groupings for detection
const DESSERT_CATEGORIES = ["Sundaes", "Divine Cakes", "Brownies", "Donuts Delights", "Cookies & Croissants"];
const DRINK_CATEGORIES = ["Hot Beverages", "Cold Beverages", "Shakes", "Special Drinks", "Regular Drinks"];
const SAVORY_CATEGORIES = ["Sandwiches", "Combos", "Fries", "Sides"];

type CartProfile = {
  hasDessert: boolean;
  hasSundae: boolean;
  hasCoffee: boolean;
  hasColdDrink: boolean;
  hasShake: boolean;
  hasSandwich: boolean;
  hasCombo: boolean;
  hasSides: boolean;
  categories: Set<string>;
  itemNames: string[];
};

function getCartProfile(cart: CartItem[]): CartProfile {
  const categories = new Set<string>();
  const itemNames: string[] = [];

  cart.forEach((item) => {
    const baseId = item.id.replace(/-\d+$/, "");
    const menuItem = menuItems.find((m) => m.id === baseId);
    if (menuItem) {
      categories.add(menuItem.category);
      itemNames.push(menuItem.name.toLowerCase());
    }
  });

  return {
    hasDessert: DESSERT_CATEGORIES.some((c) => categories.has(c)),
    hasSundae: categories.has("Sundaes"),
    hasCoffee: categories.has("Hot Beverages"),
    hasColdDrink: categories.has("Cold Beverages"),
    hasShake: categories.has("Shakes"),
    hasSandwich: categories.has("Sandwiches"),
    hasCombo: categories.has("Combos"),
    hasSides: categories.has("Sides"),
    categories,
    itemNames,
  };
}

// Prioritized item IDs for specific scenarios
const SUNDAE_PAIRINGS = [
  "mocha", "hot-chocolate", "iced-mocha", "dark-temptation",
  "chocolate-fudge-donut", "milk-chocolate-cookie", "caramel-latte",
  "iced-caramel-latte", "cappuccino", "walnut-chocolate-brownie",
];

const DESSERT_PAIRINGS = [
  "mocha", "caramel-latte", "hot-chocolate", "cappuccino",
  "iced-mocha", "iced-latte", "iced-caramel-latte",
  "dark-temptation", "strawberry-vanilla-shake",
];

const SANDWICH_PAIRINGS = [
  "dark-temptation", "strawberry-vanilla-shake", "berry-blast",
  "strawberry-mint", "peachy-paradise", "regular-fries",
  "iced-americano", "iced-latte",
];

const COMBO_PAIRINGS = [
  "dark-temptation", "berry-blast", "strawberry-vanilla-shake",
  "three-milk-sundae", "chocolate-explosion-sundae",
  "strawberry-mint", "blueberry-rise",
];

const COFFEE_PAIRINGS = [
  "three-milk-sundae", "chocolate-explosion-sundae",
  "chocolate-fudge-cake", "red-velvet-cake",
  "chocolate-fudge-donut", "walnut-chocolate-brownie",
  "milk-chocolate-cookie", "butter-croissant",
];

const SHAKE_PAIRINGS = [
  "dark-temptation", "berry-blast", "strawberry-vanilla-shake",
  "chocolate-fudge-donut", "milk-chocolate-cookie",
  "walnut-chocolate-brownie", "boston-creamy-brownie",
];

const BESTSELLERS = [
  "cocktail", "dark-temptation", "mocha", "three-milk-sundae",
  "chocolate-fudge-donut", "caramel-latte",
];

type UpsellResult = {
  items: MenuItem[];
  heading: string;
  subtitle: string;
};

export function getSmartUpsell(cart: CartItem[]): UpsellResult {
  if (cart.length === 0) {
    return {
      items: [],
      heading: "Popular Right Now",
      subtitle: "Our customers' favorites",
    };
  }

  const cartBaseIds = new Set(cart.map((i) => i.id.replace(/-\d+$/, "")));
  const profile = getCartProfile(cart);

  let priorityIds: string[] = [];
  let heading = "Complete Your Meal";
  let subtitle = "Customers who ordered this also loved…";

  // Determine best pairings based on what's in cart
  if (profile.hasSundae) {
    priorityIds = SUNDAE_PAIRINGS;
    const sundaeName = profile.itemNames.find((n) => n.includes("sundae"));
    const displayName = sundaeName
      ? sundaeName.split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
      : "Sundae";
    heading = "Pair Your Sundae Perfectly";
    subtitle = `Perfect match for your ${displayName}!`;
  } else if (profile.hasDessert) {
    priorityIds = DESSERT_PAIRINGS;
    heading = "Make It a Dessert Feast";
    subtitle = "Sweet treats deserve a great drink";
  } else if (profile.hasSandwich) {
    priorityIds = SANDWICH_PAIRINGS;
    heading = "Level Up Your Sandwich";
    subtitle = "Add a drink or side to make it a meal";
  } else if (profile.hasCombo) {
    priorityIds = COMBO_PAIRINGS;
    heading = "Add Something Sweet";
    subtitle = "Finish your combo with a treat";
  } else if (profile.hasCoffee || profile.hasColdDrink) {
    priorityIds = COFFEE_PAIRINGS;
    heading = "Something Sweet With Your Coffee?";
    subtitle = "A perfect pairing for your drink";
  } else if (profile.hasShake) {
    priorityIds = SHAKE_PAIRINGS;
    heading = "Pair Your Shake";
    subtitle = "A little extra to enjoy alongside";
  } else {
    priorityIds = BESTSELLERS;
    heading = "You Might Also Love";
    subtitle = "Our most popular picks";
  }

  // Filter out items already in cart
  const available = priorityIds
    .filter((id) => !cartBaseIds.has(id))
    .map((id) => menuItems.find((m) => m.id === id))
    .filter(Boolean) as MenuItem[];

  // Ensure variety: mix drinks + sweets/sides
  const drinks = available.filter((m) => DRINK_CATEGORIES.includes(m.category));
  const nonDrinks = available.filter((m) => !DRINK_CATEGORIES.includes(m.category));

  let selected: MenuItem[] = [];

  if (profile.hasDessert || profile.hasSundae) {
    // 2 drinks + 1-2 sweets/sides
    selected = [...drinks.slice(0, 2), ...nonDrinks.slice(0, 2)];
  } else if (profile.hasSandwich || profile.hasCombo) {
    // 1-2 drinks + 1 side/dessert
    selected = [...drinks.slice(0, 2), ...nonDrinks.slice(0, 2)];
  } else if (profile.hasCoffee || profile.hasColdDrink) {
    // Mostly desserts
    selected = [...nonDrinks.slice(0, 3), ...drinks.slice(0, 1)];
  } else {
    selected = available.slice(0, 4);
  }

  // Cap at 4
  selected = selected.slice(0, 4);

  // If we have less than 3, fill with bestsellers not in cart
  if (selected.length < 3) {
    const fillerIds = BESTSELLERS.filter(
      (id) => !cartBaseIds.has(id) && !selected.some((s) => s.id === id)
    );
    const fillers = fillerIds
      .map((id) => menuItems.find((m) => m.id === id))
      .filter(Boolean) as MenuItem[];
    selected = [...selected, ...fillers].slice(0, 4);
  }

  return { items: selected, heading, subtitle };
}
