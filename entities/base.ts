interface NestedObjectData {
    InternalID?: number;
    UUID?: string;
    ExternalID?: string;
}

export interface NestedObject {
    Data?: NestedObjectData[];
    URI?: string;
}
