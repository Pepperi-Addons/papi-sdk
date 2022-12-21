export interface SearchBody {
    Where?: string;
    Page?: number;
    PageSize?: number;
    KeyList?: string[];
    UniqueFieldsList?: string[];
    UniqueFieldID?: string;
    IncludeCount?: boolean;
    IncludeDeleted?: boolean;
    Fields?: string[];
}
