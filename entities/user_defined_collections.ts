import { GridDataView } from './data-view';

export const FieldTypes = ['String', 'Bool', 'Integer', 'Double', 'Object', 'Array', 'Reference'] as const;

export type FieldType = typeof FieldTypes[number];

export const DocumentKeyTypes = ['AutoGenerate', 'Composite', 'Key'] as const;

export type DocumentKeyType = typeof DocumentKeyTypes[number];
export interface CollectionField {
    [key: string]: {
        Items?: {
            Type: FieldType;
        };
        Type: FieldType;
        Mandatory: boolean;
        OptionalValues?: string[];
        Description: string;
    };
}
export interface DocumentKey {
    Type: DocumentKeyType;
    Fields?: string[];
    Delimiter: string;
}
export interface Collection {
    Hidden?: boolean;
    CreationDateTime?: string;
    ModificationDateTime?: string;
    Name: string;
    Type?: 'meta_data';
    DocumentKey?: DocumentKey;
    ListView?: GridDataView;
    Fields?: CollectionField[];
}
