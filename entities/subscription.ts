type PNSMessageType = 'data' | 'event';

export interface Subscription {
    Name: string;
    CreationDateTime?: string;
    ModificationDateTime?: string;
    AddonRelativeURL: string;
    Type: PNSMessageType;
    Hidden?: boolean;
    AddonUUID: string;
    FilterPolicy?: { [key: string]: string[] };
    ExpirationDateTime?: string;
}

export interface PNSMessage {
    Type: PNSMessageType;
    Message: any;
    FilterAttributes: { [key: string]: number | string | string[] };
}
export interface PublishMessageResult {
    success: boolean;
}
