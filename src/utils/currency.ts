import { CurrencyMode } from '../types';

export const USD_TO_PKR_RATE = 280;

/**
 * Convert value based on target currency mode.
 * Standard raw values in the database are either in USD or PKR.
 */
export function convertValue(val: number, fromCurrency: 'USD' | 'PKR', toCurrency: CurrencyMode): number {
  if (isNaN(val) || val === null || val === undefined) return 0;
  if (fromCurrency === toCurrency) return val;
  if (fromCurrency === 'USD' && toCurrency === 'PKR') {
    return val * USD_TO_PKR_RATE;
  }
  if (fromCurrency === 'PKR' && toCurrency === 'USD') {
    return val / USD_TO_PKR_RATE;
  }
  return val;
}

/**
 * Format currency with appropriate unit (B for Billions, M for Millions, K for Thousands) or full comma-separated digits.
 */
export function formatCurrency(
  val: number,
  currency: CurrencyMode = 'PKR',
  options?: { compact?: boolean; decimals?: number; forcePrefix?: boolean }
): string {
  if (isNaN(val) || val === null || val === undefined) {
    return currency === 'PKR' ? 'PKR 0' : '$0';
  }

  const { compact = false, decimals = 1, forcePrefix = true } = options || {};
  const isNegative = val < 0;
  const absVal = Math.abs(val);

  let formatted = '';

  if (compact) {
    if (absVal >= 1_000_000_000) {
      formatted = `${(absVal / 1_000_000_000).toFixed(decimals)}B`;
    } else if (absVal >= 1_000_000) {
      formatted = `${(absVal / 1_000_000).toFixed(decimals)}M`;
    } else if (absVal >= 1_000) {
      formatted = `${(absVal / 1_000).toFixed(decimals)}K`;
    } else {
      formatted = absVal.toFixed(decimals > 0 ? 0 : decimals);
    }
  } else {
    formatted = absVal.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }

  const prefix = currency === 'PKR' ? 'PKR ' : '$';

  if (isNegative) {
    return `(${prefix}${formatted})`;
  }
  return `${prefix}${formatted}`;
}

export function parseNumberSafe(input: any): number {
  if (input === null || input === undefined || input === '') return 0;
  if (typeof input === 'number') return isNaN(input) ? 0 : input;
  const cleaned = String(input)
    .replace(/[$,()]/g, '')
    .replace(/PKR/gi, '')
    .replace(/USD/gi, '')
    .trim();
  const isNeg = String(input).includes('(') && String(input).includes(')');
  const parsed = parseFloat(cleaned);
  if (isNaN(parsed)) return 0;
  return isNeg ? -parsed : parsed;
}
