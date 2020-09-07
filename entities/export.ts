export interface ExportApiResponse {
    UUID: string;
    URI: string;
}

export interface ExportBody {
    fields?: string;
    where?: string;
    orderBy?: string;
    include_deleted?: boolean;
    is_distinct?: boolean;
}
