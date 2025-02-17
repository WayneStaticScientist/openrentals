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
    profile: string
    verified: boolean
}
export interface Property {
    address: string
    area: string
    bathrooms: number
    views: number
    bedrooms: number
    _id: string
    ceiling: string
    city: string
    description: string
    durawall: string
    electricity: string
    email: string
    date: number
    firstName: string
    images: string[]
    owner: User
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
    hidden: boolean
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
export interface GeolocationInterface {
    latitude: number,
    longitude: number
}
export interface SearchFilter {
    uploader: string
    city: string
    propertyType: string
    propertystate: string
    keywords: string
    page: number
}
export interface ListingInfo {
    cities: string[]
    type: string[]
}
export interface PropertyWrapper {
    properties: Property[]
    listingInfo: ListingInfo
}