interface NestedObjecData {
    InternalID?: number,
    UUID?: string,
    ExternalID?: string
}

export interface NestedObject {
    Data?: NestedObjecData[],
    URI?: string
}