import { AddonData } from './addons';

type PNSMessageType = 'data' | 'event';

export interface Subscription extends AddonData {
    Name: string;
    AddonRelativeURL: string;
    Type: PNSMessageType;
    AddonUUID: string;
    FilterPolicy?: { [key: string]: string[] };
}

export interface PNSMessage {
    Type: PNSMessageType;
    Message: any;
    FilterAttributes: { [key: string]: number | string | string[] };
}
export interface PublishMessageResult {
    success: boolean;
}
