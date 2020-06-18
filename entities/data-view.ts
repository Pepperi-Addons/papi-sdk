import { Profile } from '.';

export const DataViewTypes = [
    'Grid',
    'Form',
    'Card',
    'Large',
    'Line',
    'Map',
    'Menu',
    'Configuration',
    'CardsGrid',
    'Details',
] as const;
export type DataViewType = typeof DataViewTypes[number];

export const DataViewScreenSizes = ['Tablet', 'Phablet', 'Landscape'] as const;
export type DataViewScreenSize = typeof DataViewScreenSizes[number];

export const DataViewFieldTypes = {
    None: 0,
    TextBox: 1,
    LimitedLengthTextBox: 2,
    TextArea: 3,
    TextHeader: 4,
    Date: 5,
    DateAndTime: 6,
    NumberInetger: 7,
    NumberReal: 8,
    Currency: 9,
    Boolean: 10,
    ComboBox: 11,
    MultiTickBox: 12,
    Separator: 13,
    Address: 14,
    Percentage: 15,
    EmptyComboBox: 16,
    InternalLink: 17,
    Email: 18,
    LimitedDate: 19,
    Image: 20,
    MultiTickBoxToComboBox: 21,
    EmptyMultiTickBox: 22,
    Totals: 23,
    Attachment: 24,
    Signature: 25,
    Link: 26,
    ImageURL: 27,
    NumberIntegerQuantitySelector: 28,
    NumberRealQuantitySelector: 29,
    NumberIntegerForMatrix: 30,
    NumberRealForMatrix: 31,
    Images: 32,
    Indicators: 33,
    CalculatedReal: 34,
    CalculatedInt: 35,
    CalculatedString: 36,
    CalculatedDate: 37,
    CalculatedBool: 38,
    MapDataDropDown: 39,
    MapDataReal: 40,
    MapDataString: 41,
    MapDataInt: 42,
    Sum: 43,
    Phone: 44,
    UrlForApi: 45,
    ManyToManyUrlForApi: 46,
    ReferenceType: 47,
    GuidReferenceType: 48,
    Button: 49,
    UIControlFieldType_InternalPage: 50,
    Duration: 51,
    ListOfObjects: 52,
    Package: 53,
    RelatedObjectsCards: 54,
    BooleanText: 55,
};
export type DataViewFieldType = keyof typeof DataViewFieldTypes;

export const ResourceTypes = [
    'None',
    'accounts',
    'transactions',
    'activities',
    'all_activities',
    'items',
    'users',
    'transaction_lines',
    'contacts',
    'lists',
] as const;
export type ResourceType = typeof ResourceTypes[number];

export const ResoursePrefixes = ['GA', 'OA', 'CP', 'AT', 'GL'] as const;
export type ResourcePrefix = typeof ResoursePrefixes[number];

export const VerticalAlignments = {
    Stretch: 0,
    Top: 1,
    Bottom: 2,
    Center: 3,
};
export type VerticalALignment = keyof typeof VerticalAlignments;

export const HorizontalAlignments = {
    Stretch: 0,
    Left: 1,
    Right: 2,
    Center: 3,
};
export type HorizontalAlignment = keyof typeof HorizontalAlignments;

export const DataViewRowModes = {
    Fixed: 0,
    MatchParent: 1,
};
export type DataViewRowMode = keyof typeof DataViewRowModes;

export interface ObjectReference {
    UUID?: string;
    InternalID?: number;
    Name?: string;
    Resource: ResourceType;
}

export interface DataViewContext {
    Object?: ObjectReference;
    Name: string;
    Profile: Profile;
    ScreenSize: DataViewScreenSize;
}

export interface DataViewFieldLayout {
    Origin?: { X: number; Y: number };
    Size?: { Width: number; Height: number };
}

export interface DataViewFieldStyle {
    Alignment: {
        Horizontal: HorizontalAlignment;
        Vertical: VerticalALignment;
    };
}

export interface DataViewField {
    FieldID: string;
}

export interface DataViewRow {
    Mode: DataViewRowMode;
}

export type DataViewColumn = any;

export interface GridDataViewColumn {
    Width: number;
}

export interface BaseDataView {
    InternalID?: number;
    Type: DataViewType;
    Title?: string;
    Hidden?: boolean;
    CreationDate?: string;
    ModificationDate?: string;
    Context: DataViewContext;
    Fields: DataViewField[];
    ListData?: {
        Sort?: { FieldID: string; Ascending: boolean }[];
        Section?: { FieldID: string; Ascending: boolean };
    };
}

export interface GridDataView extends BaseDataView {
    Type: 'Grid';
    FrozenColumnsCount: number;
    MinimumColumnWidth: number;
    Fields: GridDataViewField[];
    Columns: GridDataViewColumn[];
}

export interface GridDataViewField extends DataViewField {
    Type: DataViewFieldType;
    Title: string;
    Mandatory: boolean;
    ReadOnly: boolean;
    Layout?: DataViewFieldLayout;
    Style?: DataViewFieldStyle;
}

export interface BaseFormDataView extends BaseDataView {
    Rows: DataViewRow[];
    Columns: DataViewColumn[];
    Fields: BaseFormDataViewField[];
}

export interface BaseFormDataViewField extends DataViewField {
    Type: DataViewFieldType;
    Title: string;
    Mandatory: boolean;
    ReadOnly: boolean;
    Layout?: DataViewFieldLayout;
    Style?: DataViewFieldStyle;
}

export interface MenuDataView extends BaseDataView {
    Fields: MenuDataViewField[];
}

export interface MenuDataViewField extends DataViewField {
    Title: string;
}

export type ConfigurationDataView = BaseDataView;

export interface CardDataView extends BaseFormDataView {
    Type: 'Card';
}

export interface LineDataView extends BaseFormDataView {
    Type: 'Line';
}

export interface FormDataView extends BaseFormDataView {
    Type: 'Form';
}

export interface MapDataView extends BaseFormDataView {
    Type: 'Map';
}

export interface LargeDataView extends BaseFormDataView {
    Type: 'Large';
}

export interface CardsGridDataView extends BaseFormDataView {
    Type: 'CardsGrid';
}

export interface DetailsDataView extends BaseFormDataView {
    Type: 'Details';
}

export type DataView =
    | GridDataView
    | FormDataView
    | LineDataView
    | CardDataView
    | CardsGridDataView
    | LargeDataView
    | MapDataView
    | DetailsDataView
    | MenuDataView
    | ConfigurationDataView;
