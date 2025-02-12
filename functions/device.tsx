import { Tokens, User } from "@/connections/interfaces";
import { useUserState } from "@/connections/user";
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
    localStorage.setItem(`${process.env.c}`, JSON.stringify(user))
}
export function userLoggedIn(): boolean {
    try {
        const data = localStorage.getItem(`${process.env.c}`)
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