export interface Subscription {
    FunctionName: string;
    AddonPath: string;
    CreationDateTime?: string;
    ModificationDateTime?: string;
    Hidden?: boolean;
    SubscriptionARN?: string;
    FilterPolicy?: any;
}
export interface UnSubscription extends Subscription {
    ExpirationDateTime?: string;
}

export interface PNSMessage {
    Type: string;
    ActionType: string;
    Resource: string;
    MessageAttributes: { UpdatedFields: string[] };
    Message: string;
}
