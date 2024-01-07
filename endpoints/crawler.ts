import Endpoint from '../endpoint';
import { CrawlerInput, CrawlerOutput } from '../entities';
import { PapiClient } from '../papi-client';

export class CrawlerEndpoint extends Endpoint<CrawlerOutput> {
    constructor(service: PapiClient, protected url: string) {
        super(service, url);
    }
    async crawl(input: CrawlerInput): Promise<CrawlerOutput> {
        return await this.service.post(`${this.url}/crawl`, input);
    }
}
