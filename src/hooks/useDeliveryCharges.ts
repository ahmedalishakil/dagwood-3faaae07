import { useState, useEffect } from "react";

type DeliveryRange = {
  min_range: number;
  max_range: number;
  rate: number;
};

type DeliveryChargesResponse = {
  message: {
    delivery_charges_range: DeliveryRange[];
    default_rate?: number;
  };
};

const API_BRANCH = "Dagwood PIA Take Away";

const API_URL =
  "https://dagwood-chatbot.lucrumerp.com/api/method/lucrum_pos_general.api.website_api.get_delivery_charges";

export function useDeliveryCharges(branchName: string | undefined, distanceKm: number | undefined) {
  const [deliveryFee, setDeliveryFee] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!branchName || distanceKm === undefined) {
      setDeliveryFee(0);
      return;
    }

    const apiBranch = API_BRANCH;

    let cancelled = false;
    setLoading(true);

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ branch: apiBranch }),
    })
      .then((res) => res.json())
      .then((data: DeliveryChargesResponse) => {
        if (cancelled) return;
        const ranges = data.message?.delivery_charges_range || [];
        const defaultRate = data.message?.default_rate ?? 200;

        let fee = defaultRate;
        for (const range of ranges) {
          if (distanceKm >= range.min_range && distanceKm < range.max_range) {
            fee = range.rate;
            break;
          }
        }
        setDeliveryFee(fee);
      })
      .catch(() => {
        if (!cancelled) setDeliveryFee(200); // fallback
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [branchName, distanceKm]);

  return { deliveryFee, loading };
}
