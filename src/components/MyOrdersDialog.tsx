import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, Package, Loader2, Phone, Hash } from "lucide-react";
import { toast } from "sonner";

interface Order {
  name: string;
  customer_name: string;
  grand_total: number;
  custom_payment_status: string;
  transaction_date: string;
  delivery_date: string;
  resturent_type: string;
  branch: string;
}

interface MyOrdersDialogProps {
  open: boolean;
  onClose: () => void;
}

const paymentStatusLabel = (status: string | null) => {
  const s = (status || "").toUpperCase();
  if (s === "PROCESSED") return "PAID";
  if (s === "APPROVED") return "NOT PAID";
  if (s === "DISCARD") return "Assigned PSID reused for a newer payment";
  if (s === "ERRORED") return "Unable to further process/drafting failed";
  return status || "Pending";
};

const statusColor = (label: string) => {
  if (label === "PAID")
    return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
  if (label === "NOT PAID" || label.includes("PSID reused") || label.includes("Unable to"))
    return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
  return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
};

const MyOrdersDialog = ({ open, onClose }: MyOrdersDialogProps) => {
  const [searchType, setSearchType] = useState<"phone" | "order">("phone");
  const [searchValue, setSearchValue] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    const trimmed = searchValue.trim();
    if (!trimmed) {
      toast.error("Please enter a phone number or order number");
      return;
    }

    setLoading(true);
    setSearched(true);
    try {
      const payload: Record<string, string> = {};
      if (searchType === "phone") {
        payload.phone = trimmed;
      } else {
        payload.order_number = trimmed;
      }

      const res = await fetch(
        "https://pia-dagwood.lucrumerp.com/api/method/lucrum_pos_general.api.website_api.get_customer_orders",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const data = await res.json();

      if (data?.message?.status === "success" && Array.isArray(data.message.orders)) {
        setOrders(data.message.orders);
        if (data.message.orders.length === 0) {
          toast.info("No orders found");
        }
      } else {
        setOrders([]);
        toast.error("No orders found");
      }
    } catch {
      toast.error("Failed to fetch orders. Please try again.");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSearchValue("");
      setOrders([]);
      setSearched(false);
    }, 200);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent className="max-w-md w-[95vw] max-h-[85vh] flex flex-col gap-0 p-0 rounded-2xl">
        <DialogHeader className="px-5 pt-5 pb-3">
          <DialogTitle className="flex items-center gap-2 text-lg font-bold">
            <Package className="h-5 w-5 text-primary" />
            My Orders
          </DialogTitle>
        </DialogHeader>

        {/* Search section */}
        <div className="px-5 pb-4 space-y-3">
          {/* Toggle between phone / order number */}
          <div className="flex rounded-full border border-border bg-secondary p-1">
            <button
              onClick={() => {
                setSearchType("phone");
                setSearchValue("");
                setOrders([]);
                setSearched(false);
              }}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium transition-all ${
                searchType === "phone"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Phone className="h-3.5 w-3.5" />
              Phone Number
            </button>
            <button
              onClick={() => {
                setSearchType("order");
                setSearchValue("");
                setOrders([]);
                setSearched(false);
              }}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium transition-all ${
                searchType === "order"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Hash className="h-3.5 w-3.5" />
              Order Number
            </button>
          </div>

          {/* Search input */}
          <div className="flex gap-2">
            <Input
              placeholder={searchType === "phone" ? "e.g. 03001234567" : "e.g. SO26-32067"}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="rounded-xl"
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="flex shrink-0 items-center justify-center rounded-xl bg-primary px-4 text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Orders list */}
        <div className="flex-1 overflow-y-auto px-5 pb-5">
          {loading ? (
            <div className="flex flex-col items-center gap-2 py-10">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Fetching orders...</p>
            </div>
          ) : orders.length > 0 ? (
            <div className="space-y-2.5">
              {orders.map((order) => (
                <div
                  key={order.name}
                  className="rounded-xl border border-border bg-card p-3.5 transition-colors hover:bg-secondary/50"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-card-foreground">{order.customer_name}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">#{order.name}</p>
                    </div>
                    {(() => {
                      const label = paymentStatusLabel(order.custom_payment_status);
                      return (
                        <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusColor(label)}`}>
                          {label}
                        </span>
                      );
                    })()}
                  </div>
                  <div className="mt-2.5 flex items-center justify-between border-t border-border pt-2.5">
                    <span className="text-xs text-muted-foreground">
                      {new Date(order.transaction_date).toLocaleDateString("en-PK", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <span className="text-sm font-bold text-primary">Rs. {order.grand_total.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : searched ? (
            <div className="flex flex-col items-center gap-2 py-10">
              <Package className="h-10 w-10 text-muted-foreground/30" />
              <p className="text-sm font-medium text-muted-foreground">No orders found</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 py-10">
              <Search className="h-10 w-10 text-muted-foreground/20" />
              <p className="text-center text-sm text-muted-foreground">
                Enter your phone number or order number to view your orders
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MyOrdersDialog;
