/** XPay payment method types */
export type XPayPaymentMethod = "card" | "jazzcash";

/** Customer info for XPay payment intent */
export type XPayCustomer = {
  name: string;
  email: string;
  phone: string;
};

/** Payload to create a payment intent */
export type PaymentIntentCreatePayload = {
  amount: number;
  currency: string;
  payment_method_types: XPayPaymentMethod;
  customer: XPayCustomer;
};

/** Response from creating a payment intent */
export type PaymentIntentResponse = {
  success: boolean;
  pi_id?: string;
  pi_client_secret?: string;
  amount?: number;
  currency?: string;
  status?: string;
  [key: string]: unknown;
};

/** XPay API error shape */
export type XPayApiError = {
  success: false;
  error_code:
    | "CONFIG_MISSING"
    | "INVALID_PAYLOAD"
    | "CREATE_INTENT_ERROR"
    | "CAPTURE_INTENT_ERROR"
    | "RETRIEVE_INTENT_ERROR"
    | "DELETE_INTENT_ERROR";
  details: string;
};

/** Payment status states */
export type XPayPaymentStatus =
  | "idle"
  | "creating_intent"
  | "intent_created"
  | "initializing_sdk"
  | "ready"
  | "processing"
  | "success"
  | "failed"
  | "pending";
