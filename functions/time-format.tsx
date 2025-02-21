export function getLastDay(unix: number): string {
    const unixDate = new Date(unix * 1000);
    const diff = ((Date.now() - unixDate.getTime()) / 1000)
    if (diff < 60) return diff.toFixed(0) + " s"
    const minutes = (diff / 60);
    if (minutes < 60) return minutes.toFixed(0) + " mins"
    const hours = (minutes / 60)
    if (hours < 24) return hours.toFixed(0) + " hrs"
    const days = (hours / 24)
    if (days < 30) return days.toFixed(0) + " days"
    const month = (days / 30.5)
    if (days < 12) return month + " months"
    return (month / 12).toFixed(0) + " years"
}