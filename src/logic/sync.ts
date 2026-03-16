import { db } from "../data/db";
import { currencies } from "./settings";
import { useLiveQuery } from "dexie-react-hooks";

export function useRate(currencyCode: string): number {
  const cached = useLiveQuery(() => db?.table("settings").get("cached_rates"));
  if (cached?.value && cached.value[currencyCode]) {
    return cached.value[currencyCode];
  }
  const staticCurr = currencies[currencyCode as keyof typeof currencies];
  return staticCurr ? staticCurr.rate : 1;
}

export async function syncExchangeRates() {

  try {
    const lastSync = await db.table("settings").get("last_rates_sync");
    const now = Date.now();
    
    // Check if synced within last 24 hours (86400000 ms)
    if (lastSync?.value && now - Number(lastSync.value) < 86400000) {
      return; 
    }

    const response = await fetch("https://api.frankfurter.app/latest?from=USD");
    if (!response.ok) throw new Error("Failed to fetch rates");
    
    const data = await response.json();
    if (data && typeof data.rates === 'object' && !Array.isArray(data.rates)) {
      const isValid = Object.values(data.rates).every(v => typeof v === 'number');
      if (isValid) {
        await db.table("settings").put({ key: "cached_rates", value: data.rates });
        await db.table("settings").put({ key: "last_rates_sync", value: now });
      }
    }

  } catch (error) {
    console.warn("Autonomous rates sync skipped (offline or error):", error);
  }
}

export async function getRate(currencyCode: string): Promise<number> {
  const cached = await db.table("settings").get("cached_rates");
  if (cached?.value && cached.value[currencyCode]) {
    return cached.value[currencyCode];
  }
  // Fallback to static hardcoded rates
  const staticCurr = currencies[currencyCode as keyof typeof currencies];
  return staticCurr ? staticCurr.rate : 1;
}
