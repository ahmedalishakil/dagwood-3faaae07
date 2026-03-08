export type SandwichCustomization = {
  breadType: "white" | "brown";
  removals: string[];
  extras: { name: string; price: number }[];
  preferences: string[];
  specialNote: string;
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  customization?: SandwichCustomization;
  extrasTotal?: number;
};
