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

export interface AddonDataScheme {
    Hidden?: boolean;
    CreationDateTime?: string;
    ModificationDateTime?: string;
    Name: string;
    Type?: 'data' | 'meta_data' | 'cpi_meta_data' | 'indexed_data' | 'index' | 'typed_index';
    Fields?: {
        [key: string]: {
            Type: SchemeFieldType;
            Indexed?: boolean;
            Keyword?: boolean;
            Items?: {
                Type: SchemeFieldType;
            };
        };
    };
    DataSourceData?: any;
    Validator?: string;
    DataSourceURL?: string;
}

export type RelationType = 'AddonAPI' | 'NgComponent' | 'Navigation';

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
] as const;

export type SchemeFieldType = typeof SchemeFieldTypes[number];

export interface AddonFile extends AddonData {
    Folder?: string;
    Name?: string;
    Description?: string;
    Mime?: string;
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
}
