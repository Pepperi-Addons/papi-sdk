import { AddonDataScheme, SchemeField, SchemeFieldType } from './addons';
import { GridDataView } from './data-view';

export const DocumentKeyTypes = ['AutoGenerate', 'Composite', 'Key'] as const;

export type DocumentKeyType = typeof DocumentKeyTypes[number];
export interface CollectionField extends SchemeField {
    OptionalValues?: string[];
    Description: string;
}
export interface DocumentKey {
    Type: DocumentKeyType;
    Fields?: string[];
    Delimiter?: string;
}
export interface Collection extends AddonDataScheme {
    Hidden?: boolean;
    CreationDateTime?: string;
    ModificationDateTime?: string;
    Name: string;
    Description?: string;
    DocumentKey?: DocumentKey;
    ListView?: GridDataView;
    Fields?: {
        [key: string]: CollectionField;
    };
}
