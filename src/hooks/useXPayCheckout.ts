import { useState, useCallback } from "react";
import type {
  XPayPaymentMethod,
  XPayPaymentStatus,
  PaymentIntentResponse,
} from "@/types/xpay";
import { XPAY_CONFIG } from "@/config/xpay";
import { createPaymentIntent, retrievePaymentIntent } from "@/services/xpayService";
import {
  loadXPaySdk,
  initializeXPay,
  mountCardElement,
  mountJazzCashElement,
  submitPayment,
} from "@/lib/xpaySdk";

type UseXPayCheckoutReturn = {
  status: XPayPaymentStatus;
  error: string | null;
  paymentIntent: PaymentIntentResponse | null;
  selectedMethod: XPayPaymentMethod;
  setSelectedMethod: (m: XPayPaymentMethod) => void;
  /** Step 1: Create intent + load SDK + mount fields */
  initCheckout: (customer: { name: string; email: string; phone: string }, amount: number) => Promise<void>;
  /** Step 2: Submit payment via SDK */
  pay: () => Promise<"success" | "failed" | "pending">;
  /** Reset state for retry */
  reset: () => void;
};

export function useXPayCheckout(): UseXPayCheckoutReturn {
  const [status, setStatus] = useState<XPayPaymentStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [paymentIntent, setPaymentIntent] = useState<PaymentIntentResponse | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<XPayPaymentMethod>("card");
  const [xpayInstance, setXpayInstance] = useState<any>(null);

  const reset = useCallback(() => {
    setStatus("idle");
    setError(null);
    setPaymentIntent(null);
    setXpayInstance(null);
  }, []);

  const initCheckout = useCallback(
    async (customer: { name: string; email: string; phone: string }, amount: number) => {
      try {
        setError(null);

        // 1. Create payment intent
        setStatus("creating_intent");
        const intent = await createPaymentIntent({
          amount,
          currency: XPAY_CONFIG.defaultCurrency,
          payment_method_types: selectedMethod,
          customer,
        });
        setPaymentIntent(intent);
        setStatus("intent_created");

        // 2. Load SDK
        setStatus("initializing_sdk");
        try {
          await loadXPaySdk();
        } catch {
          console.warn("[XPay] SDK not available — continuing in demo mode");
        }

        // 3. Initialise and mount
        const instance = initializeXPay(intent.pi_client_secret || "");
        setXpayInstance(instance);

        if (selectedMethod === "card") {
          mountCardElement(instance, "xpay-card-container");
        } else {
          mountJazzCashElement(instance, "xpay-jazzcash-container");
        }

        setStatus("ready");
      } catch (err: any) {
        setError(err?.message || "Failed to initialize payment");
        setStatus("failed");
      }
    },
    [selectedMethod],
  );

  const pay = useCallback(async (): Promise<"success" | "failed" | "pending"> => {
    try {
      setError(null);
      setStatus("processing");

      const result = await submitPayment(xpayInstance, selectedMethod);

      if (result.status === "success") {
        setStatus("success");
        return "success";
      } else if (result.status === "pending") {
        setStatus("pending");
        return "pending";
      } else {
        setError(result.error || "Payment failed");
        setStatus("failed");
        return "failed";
      }
    } catch (err: any) {
      setError(err?.message || "Payment failed");
      setStatus("failed");
      return "failed";
    }
  }, [xpayInstance, selectedMethod]);

  return {
    status,
    error,
    paymentIntent,
    selectedMethod,
    setSelectedMethod,
    initCheckout,
    pay,
    reset,
  };
}
