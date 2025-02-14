export function formatAmount(n: number, d: number = 2) {
    if (n > 1000000000) return (n / 1000000000).toFixed(d) + "B"
    if (n > 1000000) return (n / 1000000).toFixed(d) + "M"
    if (n > 1000) return (n / 1000).toFixed(d) + "K"
    return n.toFixed(d)
}