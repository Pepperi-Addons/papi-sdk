export interface FileStorage {
    InternalID?: number;
    Configuration?: {
        ObjectType?: string;
        Type?: string;
        RequiredOperation?: string;
    };
    Content?: string;
    CreationDate?: string;
    Description?: string;
    FileName: string;
    Hidden?: boolean;
    IsSync?: boolean;
    MimeType?: string;
    ModificationDate?: string;
    Title: string;
    URL?: string;
}

export interface TempUrlResponse {
    UploadURL: string;
    DownloadURL: string;
}
