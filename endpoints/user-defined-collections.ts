import Endpoint from '../endpoint';
import { Collection } from '../entities';
import { PapiClient } from '../papi-client';

export class SchemesEndpoint extends Endpoint<Collection> {
    constructor(public service: PapiClient) {
        super(service, '/user_defined_collection/schemes');
    }

    name(schemeName: string) {
        return {
            get: async () => {
                return await this.service.get(`/user_defined_collection/schemes/${schemeName}`);
            },
        };
    }
}
