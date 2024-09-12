import Endpoint from '../endpoint';
import { AddonAPIAsyncResult, CrawlerInput, CrawlerOutput, MultiCrawlerInput, MultiCrawlerOutput } from '../entities';
import { PapiClient } from '../papi-client';
export class CrawlerEndpoint extends Endpoint<CrawlerOutput> {
    constructor(service: PapiClient, protected url: string) {
        super(service, url);
    }

    async crawl(input: CrawlerInput, retries = 1, callbackEncodedUrl?: string): Promise<AddonAPIAsyncResult> {
        const url = `${this.url}/crawl?retry=${retries}${
            callbackEncodedUrl ? `&callback_encoded_url=${callbackEncodedUrl}` : ''
        }`;

        return await this.service.post(url, input);
    }
}

export class MultiCrawlerEndpoint extends Endpoint<MultiCrawlerOutput> {
    constructor(service: PapiClient, protected url: string) {
        super(service, url);
    }

    async multi_crawl(
        input: MultiCrawlerInput,
        retries = 1,
        callbackEncodedUrl?: string,
    ): Promise<AddonAPIAsyncResult> {
        const url = `${this.url}/multi_crawl?retry=${retries}${
            callbackEncodedUrl ? `&callback_encoded_url=${callbackEncodedUrl}` : ''
        }`;

        return await this.service.post(url, input);
    }
}
