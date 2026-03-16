import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Truck, MapPin, X } from "lucide-react";
import type { CartItem, SandwichCustomization } from "@/types/cart";
import type { MenuItem } from "@/data/menu";
import DeliveryLocationModal from "@/components/DeliveryLocationModal";
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

  const [showOrderTypePrompt, setShowOrderTypePrompt] = useState(false);

  const addToCart = useCallback((item: MenuItem, customization?: SandwichCustomization, extrasTotal?: number) => {
    if (!orderType) {
      setShowOrderTypePrompt(true);
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

  const [showLocationModal, setShowLocationModal] = useState(false);

  const handlePromptSelect = (type: "delivery" | "pickup") => {
    setOrderType(type);
    setShowOrderTypePrompt(false);
    if (type === "delivery") {
      setShowLocationModal(true);
    } else {
      toast.success("Order type set to Pickup!");
    }
  };

  const handleLocationConfirm = (loc: DeliveryLocation) => {
    setDeliveryLocation(loc);
    setShowLocationModal(false);
    toast.success("Order type set to Delivery!");
  };

  return (
    <CartContext.Provider
      value={{ cart, cartCount, cartTotal, addToCart, updateQuantity, removeItem, updateItemCustomization, clearCart, orderType, setOrderType, deliveryLocation, setDeliveryLocation }}
    >
      {children}

      {/* Order Type Selection Popup */}
      <AnimatePresence>
        {showOrderTypePrompt && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
              onClick={() => setShowOrderTypePrompt(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed left-1/2 top-1/2 z-[101] w-[90vw] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-card p-6 shadow-2xl"
            >
              <button
                onClick={() => setShowOrderTypePrompt(false)}
                className="absolute right-3 top-3 rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>

              <h3 className="mb-1 font-display text-lg font-bold text-card-foreground">
                Select Order Type
              </h3>
              <p className="mb-5 text-sm text-muted-foreground">
                Please select order type first (Delivery or Pickup).
              </p>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => handlePromptSelect("delivery")}
                  className="flex items-center gap-3 rounded-xl border border-border bg-secondary p-4 text-left transition-all hover:border-primary hover:bg-primary/5 hover:shadow-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Truck className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-semibold text-card-foreground">Delivery</span>
                    <p className="text-xs text-muted-foreground">Get it delivered to your door</p>
                  </div>
                </button>
                <button
                  onClick={() => handlePromptSelect("pickup")}
                  className="flex items-center gap-3 rounded-xl border border-border bg-secondary p-4 text-left transition-all hover:border-primary hover:bg-primary/5 hover:shadow-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-semibold text-card-foreground">Pickup</span>
                    <p className="text-xs text-muted-foreground">Pick up from our branch</p>
                  </div>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
}
