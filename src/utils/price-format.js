export default function getFormattedPrice(price) {
    if (price == null) return "N/A";

    const priceInNumber = Number(price);

    if (isNaN(priceInNumber)) return "N/A";

    return new Intl.NumberFormat("en-LK", {
        style: "currency",
        currency: "LKR",
        minimumFractionDigits: 2
    }).format(priceInNumber);
}