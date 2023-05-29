import Endpoint from '../endpoint';
import { Flow, SearchBody, SearchData } from '../entities';
import { PapiClient } from '../papi-client';

export class UserDefinedFlowsEndpoint extends Endpoint<Flow> {
    constructor(public service: PapiClient) {
        super(service, '/user_defined_flows');
    }

    async search(body: SearchBody): Promise<SearchData<Flow>> {
        return await this.service.post('/user_defined_flows/search', body);
    }
}
