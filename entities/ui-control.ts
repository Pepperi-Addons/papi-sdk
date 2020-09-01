export interface UIControl {
    InternalID: number;
    PermissionRoleID: number;
    Type: string;
    CreationDate?: string;
    ModificationDate?: string;
    Hidden: boolean;
    UIControlData: string;
}

export interface UIControlField {
    ParentField: string;
    Title: string;
    WrntyFieldName: string;
    MandatoryField: boolean;
    ReadOnlyField: boolean;
    FieldConditions: any;
    CustomField: boolean;
    ApiName: string;
    FieldType: number;
    OptionalValues: string[] | undefined;
    MinValue: number;
    MaxValue: number;
    MaxCharacters: number;
    MaxLines: number;
    Layout: UIControlFieldLayout;
    ColumnWidth: number;
    ObjectTypeReference: number;
    DefaultValue: string;
    Hidden: boolean;
}

export interface UIControlLayout {
    columnDefinitions: any[];
    rowDefinitions: { mode: 0 | 1 }[];
    frozenColumnsCount: number;
    Width: number;
    MinimumWidth: number;
    WidthType: 0 | 1;
}

export interface UIControlFieldLayout {
    X: number;
    Y: number;
    Width: number;
    Line_Number: number;
    Field_Height: number;
    xAlignment: 0 | 1 | 2 | 3;
    yAlignment: 0 | 1 | 2 | 3;
}

export const UIControlViewTypes = {
    None: 0,
    Grid: 1,
    Cards: 2,
    Detailed: 3,
    Line: 4,
    CardsGrid: 5,
    Map: 6,
    Menu: 7,
    Configuration: 8,
};
export type UIControlViewType = keyof typeof UIControlViewTypes;

export interface UIControlData {
    ObjectID: number;
    Type: string;
    ControlFields: UIControlField[];
    ControlConditions: any[];
    Family: string;
    Name: string;
    DisplayName: string;
    HighlightFirst: boolean;
    Columns: number;
    SortBy: string;
    SortAsc: boolean;
    DefaultView: string;
    GroupBy: string;
    Flat: boolean;
    ActivityTypesID: any;
    Statuses: any;
    ControlName: any;
    ViewType: number;
    PermissionRoleID: number;
    PermissionRoleName: string;
    Version: number;
    Layout: UIControlLayout;
    RowsAs: any;
    ColumnsAs: any;
    ColumnsOrderBy: any;
    RowsOrderBy: any;
    Hidden: boolean;
    CreationDate: string;
    ModificationDate: string;
}
