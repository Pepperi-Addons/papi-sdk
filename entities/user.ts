export interface User {
    UUID?: string;
    InternalID?: number;
    ExternalID: string;
    CreationDateTime?: string;
    Email?: string;
    FirstName?: string;
    Hidden?: boolean;
    IsInTradeShowMode?: boolean;
    LastName?: string;
    Mobile?: string;
    ModificationDateTime?: string;
    Phone?: string;
    Profile: {
        Data: {
            InternalID: number;
            Name?: string;
        };
        URI?: string;
    };
    Role?: any;
}
