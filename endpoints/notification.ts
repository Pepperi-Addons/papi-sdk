import { PapiClient } from '../papi-client';
import { PNSMessage, PublishMessageResult, Subscription } from '../entities/subscription';
import Endpoint from '../endpoint';
export class NotificationEndpoint {
    constructor(private service: PapiClient) {}

    subscriptions = new Endpoint<Subscription>(this.service, '/notification/subscriptions');

    async publish(body: PNSMessage): Promise<PublishMessageResult> {
        const url = '/notification/publish';
        return await this.service.post(url, body);
    }
}
