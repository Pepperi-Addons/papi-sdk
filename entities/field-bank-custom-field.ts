import { AddonData } from '.';
import { DataViewFieldType } from './data-view';

export interface FieldBankCustomField extends AddonData {
    Title: string;
    FieldType?: DataViewFieldType;
    Group: string;
    FieldID?: string;
    FieldPrefix: string;
    FieldParams?: any;
}
