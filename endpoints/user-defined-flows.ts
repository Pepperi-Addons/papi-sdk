import Endpoint from '../endpoint';
import { Flow, SearchBody } from '../entities';
import { PapiClient } from '../papi-client';

const base_url = '/user_defined_flows';

export class FlowsEndpoint extends Endpoint<Flow> {
    constructor(public service: PapiClient) {
        super(service, base_url);
    }

    key(flowKey: string) {
        return {
            get: async () => {
                return await this.service.get(`${base_url}/key/${flowKey}`);
            },
        };
    }

    async search(body: SearchBody) {
        return await this.service.post(`${base_url}/search`, body);
    }
}
