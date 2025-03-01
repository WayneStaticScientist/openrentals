import { CashPayment, EcocashPayment, MukuruPayment, User } from "@/connections/interfaces";

export default function CheckResync(user1: User, user2: User): boolean {
    return checkCashPayment(user1.cashPayment, user2.cashPayment) &&
        checkEcocashPayment(user1.ecocashPayment, user2.ecocashPayment) &&
        checkMukuruPayment(user1.mukuruPayment, user2.mukuruPayment)
}
function checkCashPayment(cash1?: CashPayment | null, cash2?: CashPayment | null): boolean {
    if (cash1 == null && cash2 === null) return true
    if (!cash1 || !cash2) return false
    if (cash1.active != cash2.active || cash1.description != cash2.description) return false
    return true
}
function checkEcocashPayment(cash1?: EcocashPayment | null, cash2?: EcocashPayment | null): boolean {
    if (cash1 == null && cash2 === null) return true
    if (!cash1 || !cash2) return false
    if (cash1.active != cash2.active || cash1.description != cash2.description || cash1.phone != cash2.phone || cash1.fullName != cash2.fullName) return false
    return true
}
function checkMukuruPayment(cash1?: MukuruPayment | null, cash2?: MukuruPayment | null): boolean {
    if (cash1 == null && cash2 === null) return true
    if (!cash1 || !cash2) return false
    if (cash1.active != cash2.active || cash1.description != cash2.description || cash1.phone != cash2.phone || cash1.fullName != cash2.fullName || cash1.idNumber != cash2.idNumber || cash1.address != cash2.address) return false
    return true
}