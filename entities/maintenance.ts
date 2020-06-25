export interface MaintenanceJobResult {
    UUID?: string;
    URI?: string;
}

export interface MaintenanceJobInfo {
    UUID?: string;
    Success?: boolean;
    RecordsAffected?: number;
    ErrorMessage?: string;
}

export interface ArchivedObject {
    UUID?: string;
    ModificationDateTime?: string;
    CreationDateTime?: string;
    ActionDateTime?: string;
    Agent?: {
        UUID?: string;
        InternalID?: number;
        ExternalID?: string;
        Email?: string;
    };
    Account?: {
        UUID?: string;
        InternalID?: number;
        ExternalID?: string;
    };
    Type?: {
        ID?: number;
        Name?: string;
    };
    Status?: {
        ID?: number;
    };
}

export type ResourceName = 'activities' | 'transactions' | 'all_activities';
