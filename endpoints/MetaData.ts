import Endpoint from "../endpoint"
import { PapiClient } from "../papi-client";


export class DistributorFlagsEndpoint 
{
    constructor(private service: PapiClient) { }

    async name(flagName:string): Promise<object> {
        return await this.service.get(`/meta_data/flags/${flagName}`);

    }
}