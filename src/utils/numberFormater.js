export const abbreviateNumber = (number) => {
    return typeof number === "undefined" || Number.isNaN(number)
        ? "-"
        : new Intl.NumberFormat("en-US", {
            notation: "compact",
            maximumFractionDigits: 1,
        }).format(number);
};

export const convertIntoHours = (number) => {
    return typeof number === "undefined" || Number.isNaN(number)
        ? "-"
        : `${Math.round((number / 3600) * 100) / 100} h`
}