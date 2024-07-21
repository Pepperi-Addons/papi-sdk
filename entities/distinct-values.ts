export interface DistinctValuesBody {
    Fields: string[];
    MaxValuesSize?: number;
    Where?: string;
    IncludeDeleted?: boolean;
}

export interface DistinctValuesResponse {
    Fields: {
        FieldID: string;
        Count: number;
        Values: {
            Value: any;
            Count: number;
        }[];
    }[];
}
