/**
 * XPay Frontend SDK Wrapper
 *
 * Abstracts the XPay embedded SDK so the rest of the app
 * doesn't depend on exact SDK method signatures.
 *
 * TODO: Replace placeholder method names with actual XPay SDK API
 * once documentation is available.
 */

import { XPAY_CONFIG } from "@/config/xpay";

let sdkLoaded = false;
let sdkLoadPromise: Promise<void> | null = null;

/** Dynamically load the XPay SDK script */
export function loadXPaySdk(): Promise<void> {
  if (sdkLoaded) return Promise.resolve();
  if (sdkLoadPromise) return sdkLoadPromise;

  sdkLoadPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = XPAY_CONFIG.xpayScriptUrl;
    script.async = true;
    script.onload = () => {
      sdkLoaded = true;
      resolve();
    };
    script.onerror = () => {
      sdkLoadPromise = null;
      reject(new Error("Failed to load XPay SDK script"));
    };
    document.head.appendChild(script);
  });

  return sdkLoadPromise;
}

/** Check if SDK is available on window */
export function isXPayAvailable(): boolean {
  return typeof (window as any).XPay !== "undefined";
}

/**
 * Initialize XPay with a client secret from the payment intent.
 * TODO: Adjust method signature based on actual XPay SDK docs.
 */
export function initializeXPay(clientSecret: string): any {
  if (!isXPayAvailable()) {
    console.warn("[XPay] SDK not loaded — running in demo mode");
    return null;
  }
  // TODO: Replace with actual XPay initialisation
  return new (window as any).XPay(clientSecret);
}

/**
 * Mount the Card payment fields into a container element.
 * TODO: Replace with actual SDK mount method.
 */
export function mountCardElement(xpayInstance: any, containerId: string): void {
  if (!xpayInstance) return;
  // TODO: xpayInstance.mountCard(document.getElementById(containerId));
  console.info(`[XPay] Card element would mount in #${containerId}`);
}

/**
 * Mount the JazzCash payment fields into a container element.
 * TODO: Replace with actual SDK mount method.
 */
export function mountJazzCashElement(xpayInstance: any, containerId: string): void {
  if (!xpayInstance) return;
  // TODO: xpayInstance.mountJazzCash(document.getElementById(containerId));
  console.info(`[XPay] JazzCash element would mount in #${containerId}`);
}

/**
 * Submit the payment via SDK.
 * Returns a result object with status.
 * TODO: Replace with actual XPay confirmPayment / pay method.
 */
export async function submitPayment(
  xpayInstance: any,
  method: "card" | "jazzcash",
): Promise<{ status: "success" | "failed" | "pending"; error?: string }> {
  if (!xpayInstance) {
    // Demo mode — simulate success after delay
    await new Promise((r) => setTimeout(r, 2000));
    return { status: "success" };
  }

  try {
    // TODO: const result = await xpayInstance.confirmPayment({ method });
    // return { status: result.status, error: result.error };
    return { status: "success" };
  } catch (err: any) {
    return { status: "failed", error: err?.message || "Payment failed" };
  }
}
