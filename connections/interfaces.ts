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
export interface CatalogueHold {
    id: string
    status: number
}
export interface User {
    email: string
    phone: string
    city: string
    profile: string
    message: string
    lastName: string
    address: string
    idNumber: string
    firstName: string,
    userTitle: string
    verified: boolean
    documentsID: string
    emailVerified: false
    proofOfResidence: number
    idNumberVerified: number
    notificationSize: number
    catalogsItems: CatalogueHold[]
    documentsResidence: string
    notifications: Notification[]
    notificationClearTime: number
    cashPayment?: CashPayment | null
    mukuruPayment?: MukuruPayment | null
    ecocashPayment?: EcocashPayment | null
}
export interface CashPayment {
    description: string
    active?: boolean | undefined
}
export interface MukuruPayment {
    phone: string
    address: string
    fullName: string
    idNumber: string
    description: string
    active?: boolean | undefined
}
export interface EcocashPayment {
    type: string
    phone: string
    fullName: string
    description: string
    active?: boolean | undefined
}
export interface Property {
    area: string
    _id: string
    city: string
    date: number
    owner: User
    wifi: string
    phone: string
    price: number
    cash: string
    rooms: number
    views: number
    email: string
    state: string
    tiles: string
    mukuru: string
    stoves: string
    address: string
    hidden: boolean
    ecocash: string
    ceiling: string
    bedrooms: number
    images: string[]
    security: string
    swimming: string
    uploader: string
    durawall: string
    bathrooms: number
    firstName: string
    studyRoom: string
    description: string
    electricity: string
    propertyType: string
    resyncError: boolean
    propertyState: string
    propertyTitle: string
    paymentRequests: number
    propertyInstallments: string
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
export interface PaymentHold {
    id: string
    type: string
    image: string
    email: string
    title: string
    price: number
    status: number
    profile: string
    fullName: string
}
