import { getVariables, getDeviceId, getUser } from "@/functions/device";
import { MukuruPayment, SearchFilter } from "./interfaces";
import { UserRegistration } from "./user";
import { showError } from "@/functions/toast";

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
    const data = await userRegistration.fetchUser({ retry: true })
    if (typeof data === 'string') {
        return data
    }
    try {
        const api = await fetch(`${process.env.NEXT_PUBLIC_SERVER}` +
            "v1/property/hide", {
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
    const data = await userRegistration.fetchUser({ retry: true })
    if (typeof data === 'string') {
        return data
    }
    try {
        const api = await fetch(`${process.env.NEXT_PUBLIC_SERVER}` +
            "v1/property/delete", {
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
export async function postPropertyComment(comment: string, postId: string) {
    const user = getUser()
    if (!user) return showError("Please login to comment")
    if (postId.length < 4) return showError("not valid id?")
    if (comment.replaceAll(" ", "").length === 0) return showError("cant send empty comment")
    if (comment.length > 200) return showError("Characters should be less than or equal to 200")
    try {
        const api = await fetch(`${process.env.NEXT_PUBLIC_SERVER}` +
            "v1/property/comment", {
            method: "POST",
            body: JSON.stringify({
                comment,
                postId
            }),
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
            return `Product page not found?`
        }
        if (api.status == 400) {
            const { message } = await api.json()
            return message
        }
        if (api.status >= 500) {
            return "There was internal server error"
        }
        if (api.status >= 401) {
            return "You are not authorized to post comments"
        }
        return "There was error " + api.status + " ?"
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
        return "Failed to connect to server "
    }
}
export async function postPropertyCommentAsReply(comment: string, postId: string) {
    const user = getUser()
    if (!user) return showError("Please login to comment")
    if (postId.length < 4) return showError("not valid id?")
    if (comment.replaceAll(" ", "").length === 0) return showError("cant send empty comment")
    if (comment.length > 200) return showError("Characters should be less than or equal to 200")
    try {
        const api = await fetch(`${process.env.NEXT_PUBLIC_SERVER}` +
            "v1/property/reply", {
            method: "POST",
            body: JSON.stringify({
                comment,
                postId
            }),
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
            return `Product page not found?`
        }
        if (api.status == 400) {
            const { message } = await api.json()
            return message
        }
        if (api.status >= 500) {
            return "There was internal server error"
        }
        if (api.status >= 401) {
            return "You are not authorized to post comments"
        }
        return "There was error " + api.status + " ?"
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
        return "Failed to connect to server "
    }
}
export async function getComments(id: string) {
    try {
        const api = await fetch(`${process.env.NEXT_PUBLIC_SERVER}` + "v1/property/comments/all?postId=" + id, {
            method: "GET",
        });
        if (api.ok) {
            return await api.json()
        }
        if (api.status == 404) {
            return `comments not found`
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
export async function verifyEmail(email: string) {
    try {
        const api = await fetch(`${process.env.NEXT_PUBLIC_SERVER}` +
            "v1/user/verifyEmail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + getVariables().refreshTokens,
                "X-device-id": getDeviceId(),
            },
            body: JSON.stringify({
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
export async function AdminVerifyId(email: string, reason: string, verified: boolean) {
    try {
        const userReg = new UserRegistration()
        const response = await userReg.fetchUser({ retry: true })
        if (typeof response === 'string') return response
        const api = await fetch(`${process.env.NEXT_PUBLIC_SERVER}` + 'v1/user/id/confirm?email=' +
            email + "&action=" + (verified ? 'approve' : 'declined') +
            '&reason=' + reason,
            {
                headers: {
                    "Authorization": "Bearer " + getVariables().accessTokens,
                    "X-device-id": getDeviceId(),
                },
            }
        )
        if (api.ok) {
            return await api.json()
        }
        if (api.status === 401) {
            return 'Unauthorized'
        }
        if (api.status === 500) {
            return 'Server Error'
        }
        if (api.status === 404) {
            return 'Not Found'
        }
        if (api.status === 400) {
            const { message } = await api.json()
            return message
        }
        return 'There was error ' + api.status
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
        return 'There was network error'
    }
}

export async function AdminVerifyResidence(email: string, reason: string, verified: boolean) {
    try {
        const userReg = new UserRegistration()
        const response = await userReg.fetchUser({ retry: true })
        if (typeof response === 'string') return response
        const api = await fetch(`${process.env.NEXT_PUBLIC_SERVER}` + 'v1/user/residence/confirm?email=' +
            email + "&action=" + (verified ? 'approve' : 'declined') +
            '&reason=' + reason,
            {
                headers: {
                    "Authorization": "Bearer " + getVariables().accessTokens,
                    "X-device-id": getDeviceId(),
                },
            }
        )
        if (api.ok) {
            return await api.json()
        }
        if (api.status === 401) {
            return 'Unauthorized'
        }
        if (api.status === 500) {
            return 'Server Error'
        }
        if (api.status === 404) {
            return 'Not Found'
        }
        if (api.status === 400) {
            const { message } = await api.json()
            return message
        }
        return 'There was error ' + api.status
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
        return 'There was network error'
    }
}

export async function UpdateUser(data: object) {
    try {
        const userReg = new UserRegistration()
        const response = await userReg.fetchUser({ retry: true })
        if (typeof response === 'string') return response
        const api = await fetch(`${process.env.NEXT_PUBLIC_SERVER}` + 'v1/user/update',
            {
                headers: {
                    "X-device-id": getDeviceId(),
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + getVariables().accessTokens,
                },
                method: "PUT",
                body: JSON.stringify(data),
            }
        )
        if (api.ok) {
            return await api.json()
        }
        if (api.status === 401) {
            return 'Unauthorized'
        }
        if (api.status === 500) {
            return 'Server Error'
        }
        if (api.status === 404) {
            return 'Not Found'
        }
        if (api.status === 400) {
            const { message } = await api.json()
            return message
        }
        return 'There was error ' + api.status
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
        return 'There was network error'
    }
}
export async function UpdateEcocashState(data: object) {
    try {
        const api = await fetch(`${process.env.NEXT_PUBLIC_SERVER}` + 'v1/user/register/ecocash',
            {
                headers: {
                    "X-device-id": getDeviceId(),
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + getVariables().refreshTokens,
                },
                method: "PUT",
                body: JSON.stringify(data),
            }
        )
        if (api.ok) {
            return await api.json()
        }
        if (api.status === 401) {
            return 'Unauthorized'
        }
        if (api.status === 500) {
            return 'Server Error'
        }
        if (api.status === 404) {
            return 'Not Found'
        }
        if (api.status === 400) {
            const { message } = await api.json()
            return message
        }
        return 'There was error ' + api.status
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
        return 'There was network error'
    }
}
export async function UpdateCashState(data: object) {
    try {
        const api = await fetch(`${process.env.NEXT_PUBLIC_SERVER}` + 'v1/user/register/cash',
            {
                headers: {
                    "X-device-id": getDeviceId(),
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + getVariables().refreshTokens,
                },
                method: "PUT",
                body: JSON.stringify(data),
            }
        )
        if (api.ok) {
            return await api.json()
        }
        if (api.status === 401) {
            return 'Unauthorized'
        }
        if (api.status === 500) {
            return 'Server Error'
        }
        if (api.status === 404) {
            return 'Not Found'
        }
        if (api.status === 400) {
            const { message } = await api.json()
            return message
        }
        return 'There was error ' + api.status
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
        return 'There was network error'
    }
}

export async function UpdateMukuruState(data: MukuruPayment) {
    try {
        const api = await fetch(`${process.env.NEXT_PUBLIC_SERVER}` + 'v1/user/register/mukuru',
            {
                headers: {
                    "X-device-id": getDeviceId(),
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + getVariables().refreshTokens,
                },
                method: "PUT",
                body: JSON.stringify(data),
            }
        )
        if (api.ok) {
            return await api.json()
        }
        if (api.status === 401) {
            return 'Unauthorized'
        }
        if (api.status === 500) {
            return 'Server Error'
        }
        if (api.status === 404) {
            return 'Not Found'
        }
        if (api.status === 400) {
            const { message } = await api.json()
            return message
        }
        return 'There was error ' + api.status
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
        return 'There was network error'
    }
}