import { getVariables, getDeviceId } from "@/functions/device";

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
