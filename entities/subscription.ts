import { AddonData } from './addons';

type PNSMessageType = 'data' | 'event';
type PNSActionTypeType = 'insert' | 'update';

export interface Subscription extends AddonData {
    ModificationDateTime?: string;
    CreationDateTime?: string;
    AddonRelativeURL: string;
    Type?: PNSMessageType;
    Hidden?: boolean;
    AddonUUID: string;
    FilterPolicy:
        | {
              Resource?: string[];
              Action?: PNSActionTypeType[];
              ModifiedFields?: string[];
              AddonUUID?: string[];
          }
        | string[];
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
