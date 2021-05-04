import { PapiClient } from '../papi-client';
import { PNSMessage, PublishMessageResult, Subscription } from '../entities/subscription';

export class NotificationEndpoint {
    private service: PapiClient;

    constructor(service: PapiClient) {
        this.service = service;
    }

    async subscriptions(body: Subscription): Promise<Subscription> {
        const url = '/notifications/subscriptions';
        return await this.service.post(url, body);
    }

    async publish(body: PNSMessage): Promise<PublishMessageResult> {
        const url = '/notifications/publish';
        return await this.service.post(url, body);
    }
}
