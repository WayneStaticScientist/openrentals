import { getVariables, getDeviceId } from "@/functions/device";
import { SearchFilter } from "./interfaces";
import { UserRegistration } from "./user";

export async function getProductById(id: string) {
    try {
        const api = await fetch(`${process.env.NEXT_PUBLIC_SERVER}` + "v1/catalog?id=" + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + getVariables().refreshTokens,
                "X-device-id": getDeviceId(),
            }
        });
        if (api.ok) {
            return await api.json()
        }
        if (api.status == 404) {
            return `Product Item ${id} Not Found | Maybe it has been deleted`
        }
        if (api.status == 400) {
            const { message } = await api.json()
            return message
        }
        if (api.status >= 500) {
            return "There was internal server error"
        }
        return "There was error " + api.status + " ?"
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
        return "Failed to connect to server "
    }
}

export async function getProducts(params: SearchFilter) {
    try {
        const api = await fetch(`${process.env.NEXT_PUBLIC_SERVER}` +
            "v1/listings?page=" + params.page + "&" +
            "city=" + params.city + "&" +
            "keywords=" + params.keywords + "&" +
            "propertytype=" + params.propertyType + "&" +
            "propertystate=" + params.propertystate + "&" +
            "uploader=" + params.uploader + "&", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + getVariables().refreshTokens,
                "X-device-id": getDeviceId(),
            }
        });
        if (api.ok) {
            return await api.json()
        }
        if (api.status == 404) {
            return `Product Not Found | Maybe it has been deleted`
        }
        if (api.status == 400) {
            const { message } = await api.json()
            return message
        }
        if (api.status >= 500) {
            return "There was internal server error"
        }
        return "There was error " + api.status + " ?"
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
        return "Failed to connect to server "
    }
}
export async function hideItem(id: string, hide: boolean) {
    const userRegistration = new UserRegistration()
    const data = await userRegistration.fetchUser()
    if (typeof data === 'string') {
        return data
    }
    try {
        const api = await fetch(`${process.env.NEXT_PUBLIC_SERVER}` +
            "v1/hide", {
            method: "POST",
            body: JSON.stringify({
                propertyId: id,
                hide
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + getVariables().accessTokens,
                "X-device-id": getDeviceId(),
            }
        });
        if (api.ok) {
            return await api.json()
        }
        if (api.status == 404) {
            return `Product Not Found | Maybe it has been deleted`
        }
        if (api.status == 400) {
            const { message } = await api.json()
            return message
        }
        if (api.status >= 500) {
            return "There was internal server error"
        }
        return "There was error " + api.status + " ?"
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
        return "Failed to connect to server "
    }
}

export async function deleteItem(id: string) {
    const userRegistration = new UserRegistration()
    const data = await userRegistration.fetchUser()
    if (typeof data === 'string') {
        return data
    }
    try {
        const api = await fetch(`${process.env.NEXT_PUBLIC_SERVER}` +
            "v1/delete", {
            method: "POST",
            body: JSON.stringify({
                propertyId: id,
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + getVariables().accessTokens,
                "X-device-id": getDeviceId(),
            }
        });
        if (api.ok) {
            return await api.json()
        }
        if (api.status == 404) {
            return `Product Not Found | Maybe it has been deleted`
        }
        if (api.status == 400) {
            const { message } = await api.json()
            return message
        }
        if (api.status >= 500) {
            return "There was internal server error"
        }
        return "There was error " + api.status + " ?"
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
        return "Failed to connect to server "
    }
}
export async function resetPassword(email: string, password: string) {
    try {
        const api = await fetch(`${process.env.NEXT_PUBLIC_SERVER}` +
            "v1/user/reset", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password,
                email
            }),
        });
        if (api.ok) {
            return await api.json()
        }
        if (api.status == 404) {
            return `User not found?`
        }
        if (api.status == 400) {
            const { message } = await api.json()
            return message
        }
        if (api.status >= 500) {
            return "There was internal server error"
        }
        return "There was error " + api.status + " ?"
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
        return "Failed to connect to server "
    }
}