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
    /**
     * Defines if and how the table will be synced (via {@link https://github.com/Pepperi-Addons/Nebula Nebula}, using {@link  GDB}).
     */
    SyncData?: {
        /**
         * Should the table be synced.
         *
         * Default - false.
         */
        Sync: boolean;
        /**
         * Should the records of the table be synced.
         *
         * Default - true.
         */
        SyncRecords?: boolean;
        /**
         * If false, data that is added to the schema from the CPI-side will not be pushed to the server
         * and other users/devices will not be able to see it.
         * Default - false.
         */
        PushLocalChanges?: boolean;
        GDBQuery?: string;
        SyncFieldLevel?: boolean;
        IndexedField?: string;
        /**
         * If present - means that this is a {@link https://en.wikipedia.org/wiki/Many-to-many_(data_model) many-to-many table}.
         *
         * No data from this table will be synced, instead it will used to create edges in the graph
         * (using the two reference fields listed).
         */
        Associative?: {
            FieldID1: string;
            FieldID2: string;
        };
        /**
         * An array of rules per profile that defines how the table should be synced.
         */
        SyncRules?: {
            /**
             * Was there a change to the rules.
             *
             * Reset after rebuild.
             */
            Dirty: boolean;
            /**
             * The profile that the rules apply to.
             */
            ProfileKey: string;
            /**
             * The sync rules array.
             * If empty - the entire table will be synced.
             */
            Rules: {
                /**
                 * The name of the source table (points to current table).
                 */
                SourceTable: string;
                /**
                 * The field ID in the source table that points to the current table.
                 */
                SourceFieldID: string;
                /**
                 * The field ID in the current table that connects SourceTable to it.
                 */
                TargetFieldID: string;
            }[];
        }[];
    };
    Extends?: {
        AddonUUID: string;
        Name: string;
    };
    SuperTypes?: string[];
    PurgeTaskID?: string;
    Internals?: {
        [key: string]: any;
    };
}

export type RelationType = 'AddonAPI' | 'NgComponent' | 'Navigate' | 'CPIAddonAPI';

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
    /**
     * DataURI ot a URL link to the file.
     * Mutually exclusive with "TemporaryFileURLs".
     */
    URI?: string;
    /**
     * @deprecated PresignedURL functionality is deprecated starting at PFS 1.3. Use "URI" or "TemporaryFileURLs" instead.
     */
    PresignedURL?: string;
    FileVersion?: string;
    Cache?: boolean;
    UploadedBy?: string;
    FileSize?: number;
    /**
     * A list of TemporaryFileURLs from which the final file will be constructed.
     * Mutually exclusive with "URI".
     */
    TemporaryFileURLs?: string[];
}

export interface TemporaryFile {
    /**
     * The URL to which the file should be uploaded using PUT method.
     */
    PutURL: string;

    /**
     * The URL from which you can download the file.
     * Can be passed in the AddonFile.TemporaryFileURLs property.
     */
    TemporaryFileURL: string;
}

export type TemporaryFileRequest = {
    /**
     * The file name to be used when saving the file.
     * If not provided, the file name will be a random UUID.
     */
    FileName?: string;
};

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
    DefaultValue?: any;
}

export interface SearchData<T> {
    Objects: T[];
    Count?: number;
    NextPageKey?: string;
}
