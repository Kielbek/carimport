/**
 * Per-browser memory of report access tokens, so a buyer can come back and re-download without an account.
 * Losing it is harmless: the token is also in the e-mail link.
 */
const KEY = 'carimport.orders';

export function rememberOrder(orderId: string, token: string): void {
  try {
    const all = JSON.parse(localStorage.getItem(KEY) ?? '{}') as Record<string, string>;
    all[orderId] = token;
    localStorage.setItem(KEY, JSON.stringify(all));
  } catch {
    // storage unavailable
  }
}

export function recallOrder(orderId: string): string | null {
  try {
    return (JSON.parse(localStorage.getItem(KEY) ?? '{}') as Record<string, string>)[orderId] ?? null;
  } catch {
    return null;
  }
}
