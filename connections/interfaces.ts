export interface ClientResponse {
    message: string
}
export interface Tokens {
    accessTokens: string
    refreshTokens: string
}
export interface User {
    firstName: string,
    lastName: string
    email: string
    idNumber: string
}