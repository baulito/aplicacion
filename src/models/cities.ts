export interface Citi {
    _id: string
    locationName: string
    departmentOrStateName: string
    locationCode: string
    departmentOrStateCode: number
    tccCode: any
    countryId: string
    countryCode: number
    deprisaCode?: number
    deprisaName?: string
}

export type Cities = Citi[];