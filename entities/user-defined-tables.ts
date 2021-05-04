export interface UserDefinedTableRowBase {
    InternalID?: number;
    CreationDateTime?: string;
    Hidden?: boolean;
    MainKey: string;
    MapDataExternalID: string;
    ModificationDateTime?: string;
    SecondaryKey: string;
}
export interface UserDefinedTableRow extends UserDefinedTableRowBase {
    Values: string[];
}

export interface UserDefinedTableStringValueRow extends UserDefinedTableRowBase {
    StringValue: string;
}

export interface UserDefinedTableMetaData {
    InternalID?: number;
    TableID: string;
    MainKeyType: {
        ID: number;
        Name: string;
    };
    SecondaryKeyType: {
        ID: number;
        Name: string;
    };
    CreationDateTime?: string;
    ModificationDateTime?: string;
    MemoryMode?: {
        Dormant: boolean;
        Volatile: false;
    };
    Hidden?: boolean;
}
