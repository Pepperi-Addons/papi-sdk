// In revursive import and recursive create mapping, we send the data of inner resources. The resources are described in the following format:
interface ResourceObject {
    URI: string;
    OverwriteObject: boolean;
    OverwriteTable: boolean;
    AddonUUID: string;
    Resource: string;
    Version: string;
}

// Imports:

// Basic import parameters. all imports have these optional parameters and they all extend this interface.
interface BaseImportInput {
    OverwriteObject?: boolean;
    OverwriteTable?: boolean;
    Version?: string;
}

// input to the Data Import function.
export interface DataImportInput extends BaseImportInput {
    Objects: any[];
}

// Basic file import. All file imports must include this parameter.
interface BaseFileImportInput extends BaseImportInput {
    URI: string;
}

// input to the File Import function.
export interface FileImportInput extends BaseFileImportInput {
    Delimiter?: string;
}

// input to the function that creates the recursive mapping object, which is an optional parameter for the recursive import function.
export interface MappingInput {
    URI: string;
    Resources: ResourceObject[];
}

// input to the File Import function.
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

// Exports:

// input to the Data Export function.
export interface RecursiveExportInput {
    IncludeDeleted?: boolean;
    Where?: string;
    Fields?: string;
    ExcludedKeys?: string[];
}

// input to the Data Export function. This function accepts all parameters of the Data Export function and extends it with the following parameters.
export interface FileExportInput extends RecursiveExportInput {
    Format?: 'csv' | 'json';
    Delimiter?: string;
}
