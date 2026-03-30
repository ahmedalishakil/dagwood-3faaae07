/** XPay integration configuration — change these values in one place */
export const XPAY_CONFIG = {
  /** Backend base URL for XPay API calls */
  backendBaseUrl: "https://dagwood.lucrumerp.com",

  /** XPay frontend SDK script URL — update when you get the production URL */
  xpayScriptUrl: "https://sdk.xpay.pk/v1/xpay.js", // TODO: Replace with actual XPay SDK URL

  /** Default currency */
  defaultCurrency: "PKR",

  /** Supported payment methods */
  supportedPaymentMethods: ["card", "jazzcash"] as const,
} as const;
