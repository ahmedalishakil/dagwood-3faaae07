import { useState } from "react";
import { MapPin, Truck, Phone, Search } from "lucide-react";
import logo from "@/assets/dagwood-logo.png";

type Props = {
  orderType: "delivery" | "pickup";
  onOrderTypeChange: (type: "delivery" | "pickup") => void;
};

const DagwoodHeader = ({ orderType, onOrderTypeChange }: Props) => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-xl">
      {/* Top announcement bar */}
      <div className="bg-gradient-hero px-4 py-2 text-center text-sm font-medium text-primary-foreground">
        🎉 Download our app for exclusive deals! &nbsp;
        <span className="underline underline-offset-2 cursor-pointer">Get it now</span>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="Dagwood" className="h-12 w-12 object-contain" />
          <span className="font-display text-xl font-bold tracking-tight text-foreground">
            DAGWOOD
          </span>
        </div>

        {/* Order type toggle */}
        <div className="hidden sm:flex items-center rounded-full border border-border bg-secondary p-1">
          <button
            onClick={() => onOrderTypeChange("delivery")}
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
            onClick={() => onOrderTypeChange("pickup")}
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

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <Search className="h-5 w-5" />
          </button>
          <a
            href="tel:+924211122224"
            className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-muted"
          >
            <Phone className="h-4 w-4" />
            <span className="hidden md:inline">042-111-222-224</span>
          </a>
        </div>
      </div>

      {/* Mobile order toggle */}
      <div className="flex sm:hidden items-center justify-center gap-2 border-t border-border px-4 py-2">
        <button
          onClick={() => onOrderTypeChange("delivery")}
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
          onClick={() => onOrderTypeChange("pickup")}
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
