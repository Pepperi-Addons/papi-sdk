interface NestedObjectData {
    InternalID?: number;
    UUID?: string;
    ExternalID?: string;
}

export interface NestedObject {
    Data?: NestedObjectData;
    URI?: string;
}

export interface ImageObject {
    URL?: string;
    Content?: string;
}
