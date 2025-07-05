type NumberFormatStyle = 'decimal' | 'percent' | 'currency' | 'unit';
type CurrencyDisplay = 'symbol' | 'code' | 'name' | 'narrowSymbol';
type NotationType = 'standard' | 'scientific' | 'engineering' | 'compact';
type UnitDisplay = 'long' | 'short' | 'narrow';
type SignDisplay = 'auto' | 'never' | 'always' | 'exceptZero';
type CompactDisplay = 'short' | 'long';

interface NumberFormatConfig {
  // Locale(s) to use for formatting
  locale?: string | string[];
  // Display style for the number
  style?: NumberFormatStyle;
  // Currency code for currency formatting
  currency?: string;
  // Unit identifier for unit formatting
  unit?: string;
  // How to display currency info
  currencyDisplay?: CurrencyDisplay;
  // How to display unit info
  unitDisplay?: UnitDisplay;
  // Minimum number of fraction digits
  minimumFractionDigits?: number;
  // Maximum number of fraction digits
  maximumFractionDigits?: number;
  // Whether to use grouping separators
  useGrouping?: boolean;
  // Number notation format
  notation?: NotationType;
  // Compact display format
  compactDisplay?: CompactDisplay;
  // How to display negative signs
  signDisplay?: SignDisplay;
}

// create a cache for number formatters
type FormatterCache = Record<string, Intl.NumberFormat>;

// create a cache key
function generateCacheKey(locale?: string | string[], options?: Intl.NumberFormatOptions): string {
  const localePart = Array.isArray(locale) ? locale.join(',') : locale || 'default';
  const optionsPart = options ? JSON.stringify(options) : 'no-options';
  return `${localePart}|${optionsPart}`;
}

// cache in module
const cache: FormatterCache = {};

/**
 * format number, currency or unit
 * @param value target number
 * @param config config object
 * @returns
 */
export function formatNumber(value: number, config: NumberFormatConfig = {}): string {
  const {
    locale,
    style = 'decimal',
    currency,
    unit,
    currencyDisplay = 'symbol',
    unitDisplay = 'short',
    minimumFractionDigits,
    maximumFractionDigits,
    useGrouping = true,
    notation,
    compactDisplay,
    signDisplay
  } = config;

  const options: Intl.NumberFormatOptions = {
    style,
    ...(style === 'currency' && currency && { currency }),
    ...(style === 'currency' && { currencyDisplay }),
    ...(style === 'unit' && unit && { unit }),
    ...(unitDisplay && { unitDisplay }),
    ...(minimumFractionDigits !== undefined && { minimumFractionDigits }),
    ...(maximumFractionDigits !== undefined && { maximumFractionDigits }),
    useGrouping,
    ...(notation && { notation }),
    ...(compactDisplay && { compactDisplay }),
    ...(signDisplay && { signDisplay })
  };

  const cacheKey = generateCacheKey(locale, options);

  // use cache or create a new instance
  if (!cache[cacheKey]) {
    cache[cacheKey] = new Intl.NumberFormat(locale, options);
  }

  return cache[cacheKey].format(value);
}

/**
 * currency format
 * @param value target value
 * @param currency currency code (ISO 4217)
 * @param locale locale
 * @param options other config (omit style and currency)
 */
export function formatCurrency(value: number, currency: string, locale?: string | string[], options?: Omit<NumberFormatConfig, 'style' | 'currency'>): string {
  return formatNumber(value, {
    ...options,
    locale,
    style: 'currency',
    currency
  });
}

/**
 * percentage formatter
 * @param value target value(between 0 and 1)
 * @param locale locale config
 * @param options other config(omit style)
 */
export function formatPercent(value: number, locale?: string | string[], options?: Omit<NumberFormatConfig, 'style'>): string {
  return formatNumber(value, {
    ...options,
    locale,
    style: 'percent'
  });
}

/**
 * unit formatter
 * @param value target value要格式化的数值
 * @param unit unit
 * @param locale locale config
 * @param options other config (omit style and unit)
 */
export function formatUnit(value: number, unit: string, locale?: string | string[], options?: Omit<NumberFormatConfig, 'style' | 'unit'>): string {
  return formatNumber(value, {
    ...options,
    locale,
    style: 'unit',
    unit
  });
}

/**
 * compact number formatter
 * @param value target value
 * @param locale locale config
 * @param display compact display style(short or long)
 */
export function formatCompact(value: number, locale?: string | string[], display: CompactDisplay = 'short'): string {
  return formatNumber(value, {
    locale,
    notation: 'compact',
    compactDisplay: display
  });
}
