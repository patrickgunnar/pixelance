export function formatsPrice(
    price: number | string,
    options: {
        currency?: "BRL" | "EUR" | "USD";
        notation?: Intl.NumberFormatOptions["notation"];
    }
) {
    const { currency = "BRL", notation = "compact" } = options;
    const numericPrice = typeof price === "string" ? parseFloat(price) : price;

    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        maximumFractionDigits: 2,
        currency,
        notation,
    }).format(numericPrice);
}
