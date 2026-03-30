import { XPAY_CONFIG } from "@/config/xpay";
import type {
  PaymentIntentCreatePayload,
  PaymentIntentResponse,
  XPayApiError,
} from "@/types/xpay";

const BASE = XPAY_CONFIG.backendBaseUrl;

/** Helper to make XPay API calls and normalise responses */
async function xpayFetch<T>(endpoint: string, body: Record<string, unknown>): Promise<T> {
  const res = await fetch(
    `${BASE}/api/method/lucrum_payments_integrations.apis.xpay.${endpoint}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
  );

  const data = await res.json();

  // Frappe wraps responses in { message: ... }
  const payload = data?.message ?? data;

  if (!res.ok || payload?.success === false) {
    const err = payload as XPayApiError;
    throw new Error(err?.details || err?.error_code || "XPay API request failed");
  }

  return payload as T;
}

/** Create a new payment intent */
export async function createPaymentIntent(
  payload: PaymentIntentCreatePayload,
): Promise<PaymentIntentResponse> {
  return xpayFetch<PaymentIntentResponse>("create_payment_intent", { payload });
}

/** Capture an existing payment intent */
export async function capturePaymentIntent(
  piClientSecret: string,
  amount?: number,
): Promise<PaymentIntentResponse> {
  const body: Record<string, unknown> = { pi_client_secret: piClientSecret };
  if (amount !== undefined) body.amount = amount;
  return xpayFetch<PaymentIntentResponse>("capture_payment_intent", body);
}

/** Retrieve a payment intent by ID */
export async function retrievePaymentIntent(
  piId: string,
): Promise<PaymentIntentResponse> {
  return xpayFetch<PaymentIntentResponse>("retrieve_payment_intent", { pi_id: piId });
}

/** Delete / cancel a payment intent */
export async function deletePaymentIntent(
  piId: string,
): Promise<{ success: boolean }> {
  return xpayFetch<{ success: boolean }>("delete_payment_intent", { pi_id: piId });
}
