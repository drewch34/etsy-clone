export function formatInteger(number) {
  return new Intl.NumberFormat().format(number);
}

export function formatCurrency(price, currency, numberFormat) {
  return new Intl.NumberFormat(numberFormat, {
    style: "currency",
    currency: currency,
    currencyDisplay: "code",
  }).format(price / 100);
}

export function formatPercent(value, numberFormat) {
  return new Intl.NumberFormat(numberFormat, { style: "percent" }).format(
    value
  );
}
