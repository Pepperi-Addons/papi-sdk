export interface Addon {
    UUID?: string;
    Name?: string;
    Description?: string;
    SystemData?: any;
    Hidden?: boolean;
    Type?: number;
}

export interface InstalledAddon {
    UUID?: string;
    Addon: Addon;
    Version?: string;
    SystemData?: any;
    AdditionalData?: string;
    Hidden?: boolean;
    PublicBaseURL: string;
    Name?: string;
    Description?: string;
    Type?: number;
}

export interface DIMXObject {
    Key: string; // Unique key of the object. Should match the internal Object's Key property.
    Status: 'Update' | 'Insert' | 'Ignore' | 'Error' | 'Merge'; // Current status of the object in the import process.
    Details?: string; // extra details in case Status is "Error" or "Merge"
}

export interface AddonVersion {
    UUID?: string;
    Hidden?: boolean;
    CreationDateTime?: Date;
    ModificationDateTime?: Date;
    Version: string;
    Description?: string;
    Available?: boolean;
    Phased?: boolean;
    StartPhasedDateTime?: Date;
    AddonUUID: string;
    PhasedFunction?: string;
}

export interface AddonAPIAsyncResult {
    ExecutionUUID?: string;
    URI?: string;
}

export interface AddonAPISyncResult {
    success?: boolean;
    errorMessage?: string;
}

export interface AddonData {
    Hidden?: boolean;
    CreationDateTime?: string;
    ModificationDateTime?: string;
    Key?: string;
    [key: string]: any;
}

export interface ElasticSearchDocument {
    Key?: string;
    [key: string]: any;
}

export interface AddonDataScheme {
    Hidden?: boolean;
    CreationDateTime?: string;
    ModificationDateTime?: string;
    Name: string;
    Type?: 'data' | 'meta_data' | 'indexed_data' | 'index' | 'shared_index' | 'pfs' | 'contained' | 'papi' | 'abstract';
    Fields?: {
        [key: string]: SchemeField;
    };
    DataSourceData?: {
        NumberOfShards?: number;
        IndexName?: string;
        IndexVersion?: number;
        ReindexIsOngoing?: boolean;
        ReindexActionUUID?: string;
        [key: string]: any;
    };
    Validator?: string;
    DataSourceURL?: string;
    Lock?: string;
    GenericResource?: boolean;
    AddonUUID?: string;
    SyncData?: {
        Sync: boolean;
        PushLocalChanges?: boolean;
        GDBQuery?: string;
        SyncFieldLevel?: boolean;
        IndexedField?: string;
        Associative?: {
            FieldID1: string;
            FieldID2: string;
        };
    };
    Extends?: {
        AddonUUID: string;
        Name: string;
    };
    SuperTypes?: string[];
}

export type RelationType = 'AddonAPI' | 'NgComponent' | 'Navigate';

export interface Relation extends AddonData {
    AddonUUID: string;
    Name: string;
    RelationName: string;
    Type: RelationType;
    Description?: string;
    AddonRelativeURL?: string;
    [key: string]: any;
}

export interface NgComponentRelation extends Relation {
    SubType?: string;
    ComponentName?: string;
    ModuleName?: string;
}

export const SchemeFieldTypes = [
    'String',
    'MultipleStringValues',
    'Bool',
    'Integer',
    'Double',
    'Object',
    'Array',
    'DateTime',
    'Resource',
    'ContainedResource',
    'DynamicResource',
    'ContainedDynamicResource',
] as const;

export type SchemeFieldType = typeof SchemeFieldTypes[number];

export interface AddonFile extends AddonData {
    Folder?: string;
    Name?: string;
    Description?: string;
    MIME?: string;
    Thumbnails?: [
        {
            Size: '200x200';
            URL?: string;
        },
    ];
    Sync?: 'None' | 'Device' | 'DeviceThumbnail' | 'Always';
    URL?: string;
    URI?: string;
    PresignedURL?: string;
    FileVersion?: string;
    Cache?: boolean;
    UploadedBy?: string;
    FileSize?: number;
}

export interface Job extends AddonData {
    Key: string;
    Version: string;
    UserUUID: string;
    NumberOfTry: number;
    NumberOfTries: number;
    AddonUUID: string;
    AddonPath: string;
    AddonFunctionName: string;
    AddonVersion: string;
    Request: {
        path: string;
        header: any;
        originalUrl: string;
        body: any;
        method: string;
        query: any;
    };
    Status: string;
    ExpirationDateTime: Date;
    CallbackUUID?: string;
    CodeJobUUID?: string;
    ResultObject?: any | undefined;
}

export interface SchemeField {
    Type: SchemeFieldType;
    Indexed?: boolean;
    Keyword?: boolean;
    // For Array, each item can be a scheme field of it's own
    Items?: SchemeField;
    // Name of the resource we reference to
    Resource?: string;
    AddonUUID?: string;
    IndexedFields?: {
        // Fields will be exported to data index from the resource
        [key: string]: SchemeField;
    };
    Fields?: {
        // Define fields for object Type
        [key: string]: SchemeField;
    };
    Sync?: boolean;
    Unique?: boolean;
    // Is the field inherited from base schema
    ExtendedField?: boolean;
    // should this field be used as a user scope filter (sync)
    ApplySystemFilter?: boolean;
}

export interface SearchData<T> {
    Objects: T[];
    Count?: number;
    NextPageKey?: string;
}
