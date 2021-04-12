import { PapiClient } from '../papi-client';
import { PNSMessage, Subscription, UnSubscription } from '../entities/subscription';

export class NotificationsEndpoint {
    private service: PapiClient;

    constructor(service: PapiClient) {
        this.service = service;
    }

    async subscriptions(body: Subscription): Promise<Subscription> {
        const url = '/notifications/subscriptions';
        return await this.service.post(url, body);
    }

    async unsubscriptions(body: UnSubscription): Promise<UnSubscription> {
        const url = '/notifications/unsubscriptions';
        return await this.service.post(url, body);
    }

    async publish(body: PNSMessage): Promise<void> {
        const url = '/notifications/publish';
        return await this.service.post(url, body);
    }
}
