export interface SearchBody {
    Where?: string;
    Page?: number;
    PageSize?: number;
    KeyList?: string[];
    UniqueFieldList?: string[];
    UniqueFieldID?: string;
    IncludeCount?: boolean;
    IncludeDeleted?: boolean;
    Fields?: string[];
    PageKey?: string;
    OrderBy?: string;
}
