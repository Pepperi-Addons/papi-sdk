import { AddonData } from './addons';

type PNSMessageType = 'data' | 'event';
type PNSActionTypeType = 'insert' | 'update';

export interface Subscription extends AddonData {
    AddonRelativeURL: string;
    Type?: PNSMessageType;
    AddonUUID: string;
    FilterPolicy: {
        Resource?: string[];
        Action?: PNSActionTypeType[];
        ModifiedFields?: string[];
        AddonUUID?: string[];
        [key: string]: string[] | undefined | string;
    };
    Name: string;
}

export interface PNSMessage {
    Type: PNSMessageType;
    Message: any;
    FilterAttributes: { [key: string]: number | string | string[] };
}
export interface PublishMessageResult {
    success: boolean;
}
