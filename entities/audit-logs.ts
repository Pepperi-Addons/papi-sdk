type AuditStatus = 'Success' | 'Failure' | 'InProgress' | 'InRetry';

export interface AuditLog {
    UUID?: string;
    CreationDateTime?: string;
    ModificationDateTime?: string;
    AuditType?: string;
    Event?: {
        Type?: string;
        User?: {
            InternalID?: number;
            Name?: string;
            Email?: string;
        };
    };
    SourceAuditLog?: {
        UUID?: string;
        AuditType?: string;
        EventType?: string;
    };
    Status?: {
        ID?: number;
        Name?: AuditStatus;
    };
    AuditInfo?: any;
}

export interface AuditLogLines {
    Message?: string;
    Level?: string;
    [key: string]: any;
}
