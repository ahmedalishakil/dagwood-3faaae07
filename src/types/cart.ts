export type SandwichAddon = {
  item_code: string;
  item_name: string;
  item_group: string;
  qty: number;
  rate: number;
};

export type SandwichCustomization = {
  breadType: "white" | "bran";
  removals: string[];
  extras: { name: string; price: number; item_code: string }[];
  preferences: string[];
  specialNote: string;
};

export type CartItem = {
  id: string;
  item_code: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  customization?: SandwichCustomization;
  extrasTotal?: number;
};
