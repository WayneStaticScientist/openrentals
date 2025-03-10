import { Tokens, User } from "@/connections/interfaces";
import { UserRegistration, useUserState } from "@/connections/user";
export function getDeviceId(): string {
    let id = localStorage.getItem("xptk12ro")
    if (id) return id
    id = Date.now() + '' + Math.random() * (2 * Math.random()) + '' +
        '' + Math.random() * (2 * Math.random()) + '' +
        '' + Math.random() * (3 * Math.random()) + '' +
        '' + Math.random() * (4 * Math.random()) + '' +
        '' + Math.random() * (5 * Math.random()) + '' +
        '' + Math.random() * (6 * Math.random()) + '' +
        '' + Math.random() * (7 * Math.random()) + '' +
        '' + Math.random() * (8 * Math.random()) + '' +
        '' + Math.random() * (9 * Math.random());
    localStorage.setItem("xptk12ro", id);
    return id;
}
export function setVariables(data: Tokens) {
    localStorage.setItem(`${process.env.NEXT_PUBLIC_AKEY}`, data.accessTokens)
    localStorage.setItem(`${process.env.NEXT_PUBLIC_RKEY}`, data.refreshTokens)
}
export function getVariables(): Tokens {
    return {
        refreshTokens: localStorage.getItem(`${process.env.NEXT_PUBLIC_RKEY}`) ?? '',
        accessTokens: localStorage.getItem(`${process.env.NEXT_PUBLIC_AKEY}`) ?? ''
    }
}
export function setUser(user: object) {
    localStorage.setItem(`${process.env.NEXT_PUBLIC_GUEST}`, JSON.stringify(user))
    return user
}
export function getUser(): User | null {
    try {
        const data = localStorage.getItem(`${process.env.NEXT_PUBLIC_GUEST}`)
        if (!data) return null
        const user: User = JSON.parse(data)
        if (!user) return null
        if (user.email.length > 0 && user.firstName.length > 2 && user.lastName.length > 2) {
            return user
        }
        return null
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
        return null
    }
}
export function userLoggedIn(register: boolean = false): boolean {
    try {
        if (register) {
            const user = new UserRegistration()
            const resp = user.fetchUser({ retry: true })
            if (typeof resp === 'string') {
                clearSavedLogss()
                return false
            }
            return true
        }
        const data = localStorage.getItem(`${process.env.NEXT_PUBLIC_GUEST}`)
        if (!data) return false
        const user: User = JSON.parse(data)
        if (!user) return false
        useUserState.setState(user)
        return true
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
        return false
    }
}
export function clearSavedLogss() {
    localStorage.removeItem(`${process.env.NEXT_PUBLIC_AKEY}`)
    localStorage.removeItem(`${process.env.NEXT_PUBLIC_RKEY}`)
    localStorage.removeItem(`${process.env.NEXT_PUBLIC_GUEST}`)
}