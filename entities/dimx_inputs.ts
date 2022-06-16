interface ResourceObject {
    URI: string;
    OverwriteObject: boolean;
    OverwriteTable: boolean;
    AddonUUID: string;
    Resource: string;
    Version: string;
}

interface BaseImportInput {
    OverwriteObject?: boolean;
    OverwriteTable?: boolean;
    Version?: string;
}

interface BaseFileImportInput extends BaseImportInput {
    URI: string;
}

export interface MappingInput {
    URI: string;
    Resources: ResourceObject[];
}


export interface RecursiveImportInput extends BaseFileImportInput {
    Resources: ResourceObject[];
    Mapping: {
        [addonUUID_tableName: string]: {
            [oldKey: string]: {
                Action: 'Replace' | 'Ask';
                NewKey: string;
            };
        };
    };
}

export interface RecursiveExportInput {
    IncludeDeleted?: boolean;
    Where?: string;
    Fields?: string;
    ExcludedKeys?: string[];
}

export interface FileExportInput extends RecursiveExportInput {
    Format?: 'csv' | 'json';
    Delimiter?: string;
}

export interface FileImportInput extends BaseFileImportInput {
    Delimiter?: string;
}

export interface DataImportInput extends BaseImportInput {
    Objects: any[];
}