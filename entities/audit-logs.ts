type AuditTypes = 'data' | 'action';
type AuditStatus = 'Success' | 'Failure' | 'InProgress' | 'InRetry';

export interface AuditLog {
    UUID: string;
    CreationDateTime: string;
    ModificationDateTime: string;
    AuditType: AuditTypes;
    Event: {
        Type: string;
        User: {
            InternalID: number;
            Name: string;
            Email: string;
        };
    };
    SourceAuditLog: {
        UUID: string;
        AuditType: AuditTypes;
        EventType: string;
    };
    Status: {
        ID: number;
        Name: AuditStatus;
    };
    AuditInfo: any;
}
