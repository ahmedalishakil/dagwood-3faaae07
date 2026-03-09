import { useState } from "react";
import { MapPin, Truck, Search, ShoppingBag, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/dagwood-logo.png";
import { useCart } from "@/context/CartContext";

const DagwoodHeader = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [miniCartOpen, setMiniCartOpen] = useState(false);
  const { cart, cartCount, cartTotal, orderType, setOrderType } = useCart();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-xl">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
          <img src={logo} alt="Dagwood" className="h-14 w-auto object-contain" />
        </div>

        <div className="hidden sm:flex items-center rounded-full border border-border bg-secondary p-1">
          <button
            onClick={() => setOrderType("delivery")}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
              orderType === "delivery"
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Truck className="h-4 w-4" />
            Delivery
          </button>
          <button
            onClick={() => setOrderType("pickup")}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
              orderType === "pickup"
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <MapPin className="h-4 w-4" />
            Pickup
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <Search className="h-5 w-5" />
          </button>
          <a
            href="https://wa.me/923262188824?text=Hi%20Sandy%20AI!"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-muted"
          >
            <MessageCircle className="h-4 w-4 text-primary" />
            <span className="hidden md:inline">Order with Sandy AI</span>
          </a>

          {/* Cart icon with badge */}
          <div className="relative">
            <button
              onClick={() => setMiniCartOpen(!miniCartOpen)}
              className="relative rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground"
                >
                  {cartCount > 99 ? "99+" : cartCount}
                </motion.span>
              )}
            </button>

            {/* Mini cart popover */}
            <AnimatePresence>
              {miniCartOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setMiniCartOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full z-50 mt-2 w-80 rounded-2xl border border-border bg-card p-4 shadow-2xl"
                  >
                    {cart.length === 0 ? (
                      <div className="py-6 text-center">
                        <ShoppingBag className="mx-auto mb-2 h-10 w-10 text-muted-foreground/30" />
                        <p className="text-sm font-medium text-muted-foreground">Cart is empty</p>
                        <button
                          onClick={() => { setMiniCartOpen(false); navigate("/"); }}
                          className="mt-2 text-sm font-semibold text-primary hover:underline"
                        >
                          Browse Menu
                        </button>
                      </div>
                    ) : (
                      <>
                        <h3 className="mb-3 text-sm font-bold text-card-foreground">
                          Your Order ({cartCount} items)
                        </h3>
                        <div className="max-h-48 space-y-2 overflow-y-auto">
                          {cart.slice(0, 5).map((item) => (
                            <div key={item.id} className="flex items-center gap-2 text-sm">
                              <img src={item.image} alt={item.name} className="h-9 w-9 rounded-lg object-cover" />
                              <div className="min-w-0 flex-1">
                                <p className="truncate font-medium text-card-foreground">{item.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {item.quantity}× Rs. {(item.price + (item.extrasTotal || 0)).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          ))}
                          {cart.length > 5 && (
                            <p className="text-xs text-muted-foreground">+{cart.length - 5} more items...</p>
                          )}
                        </div>
                        <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                          <span className="text-sm font-bold text-card-foreground">
                            Rs. {cartTotal.toLocaleString()}
                          </span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => { setMiniCartOpen(false); navigate("/cart"); }}
                              className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-card-foreground hover:bg-secondary"
                            >
                              View Cart
                            </button>
                            <button
                              onClick={() => { setMiniCartOpen(false); navigate("/checkout"); }}
                              className="rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground"
                            >
                              Checkout
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="flex sm:hidden items-center justify-center gap-2 border-t border-border px-4 py-2">
        <button
          onClick={() => setOrderType("delivery")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
            orderType === "delivery"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-muted-foreground"
          }`}
        >
          <Truck className="h-4 w-4" />
          Delivery
        </button>
        <button
          onClick={() => setOrderType("pickup")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
            orderType === "pickup"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-muted-foreground"
          }`}
        >
          <MapPin className="h-4 w-4" />
          Pickup
        </button>
      </div>
    </header>
  );
};

export default DagwoodHeader;
