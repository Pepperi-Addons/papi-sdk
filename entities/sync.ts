export interface SyncBody {
    LocalDataUpdates?: {
        jsonBody: {
            [key: number]: {
                Headers: string[];
                Lines: any[][];
            };
        };
    };
    LastSyncDateTime?: number;
    DeviceExternalID?: string;
    CPIVersion?: string;
    TimeZoneDiff?: number;
    Locale?: true;
    BrandedAppID?: number;
    UserFullName?: string;
    SoftwareVersion?: number;
    SourceType?: string;
    DeviceModel?: string;
    DeviceName?: string;
    DeviceScreenSize?: number;
    SystemName?: string;
    ClientDBUUID: string;
}

export interface SyncResponse {
    SyncJobUUID: string;
    URI: string;
}

export interface SyncJobInfo {
    SyncUUID: string;
    CreationDateTime: number;
    ModificationDateTime: number;
    CreatedByUserUUID: string;
    Status: string;
    ProgressPercentage: number;
    SentData: {
        ResponseURL?: string;
        DataFullyUpdated?: boolean;
    } | null;
    DataUpdates: {
        URL?: string;
    } | null;
    FreeTextFromClient?: string;
    Error?: string;
    ClientInfo: {
        LastSyncDateTime: number;
        DeviceExternalID: string;
        ClientDBUUID: string;
        CPIVersion: string;
        TimeZoneDiff: number;
        Locale: boolean;
        BrandedAppID: string;
        UserFullName: string;
        SoftwareVersion: string;
        SourceType: string;
        DeviceModel: string;
        DeviceName: string;
        DeviceScreenSize: string;
        SystemName: string;
    };
}
