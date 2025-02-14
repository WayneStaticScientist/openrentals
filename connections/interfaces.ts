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
    message: string
    phone: string
    idNumber: string
    userTitle: string
}
export interface Property {
    address: string
    area: string
    bathrooms: number
    bedrooms: number
    _id: string
    ceiling: string
    city: string
    description: string
    durawall: string
    electricity: string
    email: string
    firstName: string
    images: string[]
    owne: User
    phone: string
    price: number
    propertyState: string
    propertyTitle: string
    propertyType: string
    rooms: number
    security: string
    state: string
    stoves: string
    studyRoom: string
    swimming: string
    tiles: string
    uploader: string
    wifi: string
}
export interface PropertyList {
    owned: boolean
    properties: Property[]
}
export interface PropertyPackage {
    owned: boolean
    property: Property
}