import Endpoint from '../endpoint';
import { DataView } from '../entities';
import { PapiClient } from '../papi-client';

export class DataViewsEndpoint extends Endpoint<DataView> {
    constructor(service: PapiClient) {
        super(service, '/meta_data/data_views');
    }
}

