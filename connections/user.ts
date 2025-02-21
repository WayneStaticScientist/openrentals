import { getDeviceId, getVariables, setUser, setVariables } from "@/functions/device";
import { Tokens, User } from "./interfaces";
import { create } from "zustand";
import { StaticStates } from "@/functions/static-states";
export interface UserProtocols {
    retry?: boolean | undefined,
    clearNotifications?: boolean
}
export class UserRegistration {
    address: string;
    constructor() {
        this.address = `${process.env.NEXT_PUBLIC_SERVER}`;
    }
    async getExtractError(api: Response) {
        if (api.ok) {
            return await api.json()
        }
        if (api.status == 404) {
            return "Page Not found"
        }
        if (api.status == 401) {
            return "You are not authorized"
        }
        if (api.status == 400) {
            const errorResponse = await api.json() as { message: string };
            return errorResponse.message;
        }
        if (api.status >= 500) {
            return "There was internal server error";
        }
        return 'something went wrong';
    }
    async register(data: object) {

        try {
            const api = await fetch(this.address + "v1/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-device-id": getDeviceId(),
                }
                ,
                body: JSON.stringify(data)
            });
            if (api.ok) {
                const data = await api.json() as Tokens
                setVariables(data)
                return await this.fetchUser({})
            }
            return this.getExtractError(api)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            return "Failed to connect to server "
        }
    }
    async login(data: object) {
        try {
            const api = await fetch(this.address + "v1/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-device-id": getDeviceId(),
                }
                ,
                body: JSON.stringify(data)
            });
            if (api.ok) {
                const data = await api.json() as Tokens
                setVariables(data)
                return this.fetchUser({})
            }
            return this.getExtractError(api)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            return "Failed to connect to server "
        }
    }
    async fetchUser(data: UserProtocols): Promise<string | object> {
        try {
            const api = await fetch(this.address + (data.clearNotifications ? "v1/user/fetch?notifications=" + StaticStates.STATIC_NOTIFICATION_CLEAR : "v1/user/fetch"), {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + getVariables().accessTokens,
                    "X-device-id": getDeviceId(),
                }
            });
            if (api.ok) {
                return setUser(await api.json())
            }
            if (api.status == 401) {
                if (data.retry) return this.requestNewTokens(data)
                return "you are not authorized to use this platform"
            }
            return this.getExtractError(api)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            return "Failed to connect to server "
        }
    }
    async requestNewTokens(protocol: UserProtocols): Promise<string | object> {
        try {
            const api = await fetch(this.address + "v1/user/newToken", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + getVariables().refreshTokens,
                    "X-device-id": getDeviceId(),
                }
            });
            if (api.ok) {
                const data = await api.json() as Tokens
                setVariables(data)
                const intercept = protocol
                intercept.retry = false
                return await this.fetchUser(intercept)
            }
            return this.getExtractError(api)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            return "Failed to connect to server "
        }
    }
}
export const useUserState = create<User>(() => ({
    firstName: "",
    lastName: "",
    notifications: [],
    notificationSize: 0,
    email: "",
    phone: "",
    message: "",
    idNumber: "",
    userTitle: "",
    verified: false,
    profile: ""
}))