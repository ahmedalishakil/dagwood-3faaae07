import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { toast } from "sonner";
import type { CartItem, SandwichCustomization } from "@/types/cart";
import type { MenuItem } from "@/data/menu";
import type { DeliveryLocation } from "@/components/DeliveryLocationModal";

type CartContextType = {
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (item: MenuItem, customization?: SandwichCustomization, extrasTotal?: number) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
  updateItemCustomization: (id: string, customization: SandwichCustomization, extrasTotal: number) => void;
  clearCart: () => void;
  orderType: "delivery" | "pickup" | null;
  setOrderType: (type: "delivery" | "pickup") => void;
  deliveryLocation: DeliveryLocation | null;
  setDeliveryLocation: (loc: DeliveryLocation | null) => void;
};

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "dagwood-cart";
const LOCATION_KEY = "dagwood-delivery-location";

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function loadLocation(): DeliveryLocation | null {
  try {
    const raw = localStorage.getItem(LOCATION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(loadCart);
  const [orderType, setOrderType] = useState<"delivery" | "pickup" | null>(null);
  const [deliveryLocation, setDeliveryLocation] = useState<DeliveryLocation | null>(loadLocation);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (deliveryLocation) {
      localStorage.setItem(LOCATION_KEY, JSON.stringify(deliveryLocation));
    } else {
      localStorage.removeItem(LOCATION_KEY);
    }
  }, [deliveryLocation]);

  const addToCart = useCallback((item: MenuItem, customization?: SandwichCustomization, extrasTotal?: number) => {
    if (!orderType) {
      toast.error("Please select order type first (Delivery or Pickup).", {
        duration: 3000,
      });
      return;
    }
    setCart((prev) => {
      if (customization) {
        const uniqueId = `${item.id}-${Date.now()}`;
        return [
          ...prev,
          {
            id: uniqueId,
            item_code: item.item_code,
            name: item.name,
            price: item.price,
            quantity: 1,
            image: item.image,
            customization,
            extrasTotal: extrasTotal || 0,
          },
        ];
      }
      const existing = prev.find((c) => c.id === item.id);
      if (existing) {
        return prev.map((c) => (c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c));
      }
      return [...prev, {
        id: item.id,
        item_code: item.item_code,
        name: item.name,
        price: item.price,
        quantity: 1,
        image: item.image,
      }];
    });
    toast.success(`${item.name} added to cart!`, {
      description: customization ? "With your customizations" : undefined,
      duration: 2000,
    });
  }, [orderType]);

  const updateQuantity = useCallback((id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) => (c.id === id ? { ...c, quantity: c.quantity + delta } : c))
        .filter((c) => c.quantity > 0)
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
    toast("Item removed from cart");
  }, []);

  const updateItemCustomization = useCallback((id: string, customization: SandwichCustomization, extrasTotal: number) => {
    setCart((prev) =>
      prev.map((c) => c.id === id ? { ...c, customization, extrasTotal } : c)
    );
    toast.success("Customization updated!");
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const cartCount = cart.reduce((sum, c) => sum + c.quantity, 0);
  const cartTotal = cart.reduce((s, c) => s + (c.price + (c.extrasTotal || 0)) * c.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, cartCount, cartTotal, addToCart, updateQuantity, removeItem, updateItemCustomization, clearCart, orderType, setOrderType, deliveryLocation, setDeliveryLocation }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
}
