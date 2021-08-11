import { PapiClient } from '../papi-client';
import Endpoint from '../endpoint';
import { Page } from '../entities/page';

export class PagesEndpoint extends Endpoint<Array<Page>> {
    constructor(service: PapiClient) {
        super(service, '/pages');
    }
}
