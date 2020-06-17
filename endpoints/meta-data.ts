import { PapiClient } from "../papi-client";


export class DistributorFlagsEndpoint 
{ 
    private options = {
        name:''
    }
    constructor (private service: PapiClient) {}

    name(flagName:string) {
        this.options.name = flagName;
        return this;
    }

    async get(): Promise<object> {
        return await this.service.get(`/meta_data/flags/${this.options.name}`); 
    }
}