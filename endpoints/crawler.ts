import Endpoint from '../endpoint';
import { AddonAPIAsyncResult, CrawlerInput, CrawlerOutput, MultiCrawlerInput, MultiCrawlerOutput } from '../entities';
import { PapiClient } from '../papi-client';

export class CrawlerEndpoint extends Endpoint<CrawlerOutput> {
    constructor(service: PapiClient, protected url: string) {
        super(service, url);
    }

    async crawl(input: CrawlerInput, retries = 1): Promise<AddonAPIAsyncResult> {
        return await this.service.post(`${this.url}/crawl?retry=${retries}`, input);
    }
}

export class MultiCrawlerEndpoint extends Endpoint<MultiCrawlerOutput> {
    constructor(service: PapiClient, protected url: string) {
        super(service, url);
    }

    async multi_crawl(input: MultiCrawlerInput, retries = 1): Promise<AddonAPIAsyncResult> {
        return await this.service.post(`${this.url}/multi_crawl?retry=${retries}`, input);
    }
}
