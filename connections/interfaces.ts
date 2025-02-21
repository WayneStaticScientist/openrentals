export interface ClientResponse {
    message: string
}
export interface Tokens {
    accessTokens: string
    refreshTokens: string
}
export interface Notification {
    date: number
    tag: string
    _id: string
    message: string
    notificationId: string
}

export interface User {
    email: string
    phone: string
    profile: string
    message: string
    lastName: string
    idNumber: string
    firstName: string,
    userTitle: string
    verified: boolean
    notificationSize: number
    notifications: Notification[]
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
    registered: boolean
    properties: Property[]
}
export interface PropertyPackage {
    owned: boolean
    registered: boolean
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
export interface Comment {
    date: number
    user: User
    email: string
    type: string
    postId: string
    comment: string
    _id: string
    subComments: Comment[]
}