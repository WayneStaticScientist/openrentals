export function getLastDay(unix: number): string {
    const unixDate = new Date(unix * 1000);
    const diff = Math.ceil((Date.now() - unixDate.getTime()) / 1000)
    if (diff < 60) return diff + "s"
    const minutes = Math.ceil(diff / 60);
    if (diff < 60) return minutes + "mins"
    const hours = Math.ceil(minutes / 60)
    if (hours < 24) return hours + "hrs"
    const days = Math.ceil(hours / 24)
    if (days < 30) return days + "days"
    const month = Math.ceil(days / 30.5)
    if (days < 12) return month + "months"
    return Math.ceil(month / 12) + "years"
}