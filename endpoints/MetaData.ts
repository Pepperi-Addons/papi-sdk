import Endpoint from "../endpoint"
import { PapiClient } from "../papi-client";
import { AddonAPIAsyncResult, apifieldobject } from "../entities";


export class DistributorFlagsEndpoint {
    private options = {
        name: ''
    }
    constructor(private service: PapiClient) { }

    name(flagName: string) {
        this.options.name = flagName;
        return this;
    }

    async get(): Promise<object> {
        return await this.service.get(`/meta_data/flags/${this.options.name}`);
    }
}

export class TypeEndpoint {
    constructor(private service: PapiClient) { }

    name(type: string) {
        return new typeMetaData(this.service, type);
    }
}

export class types {

    private options = {
        subtype: ''
    }
    constructor(private service: PapiClient, private typeName: string) { }

    subtype(subtypeid: string) {
        this.options.subtype = subtypeid;
        return this;
    }

    async get(): Promise<apifieldobject> {
        var url = `/meta_data/${this.typeName}/types`
        if (this.options.subtype) {
            url = `${url}/${this.subtype}`;
        }
        return await this.service.get(url);
    }

    fields() {
        return  new fields(this.service, this.typeName, this.options.subtype);
    } 
    

}

export class fields {
    constructor(private service: PapiClient, private type: string, private subtypeid?: string) { }
    async get(apiName?: string): Promise<apifieldobject> {


        var url = `/meta_data/${this.type}`;
        if (this.subtypeid) {
            url = `${url}/types/${this.subtypeid}`;
        }
        url = `${url}/fields`;

        if (apiName) {
            url = `${url}/${apiName}`;
        }
        return await this.service.get(url);
    }
    async post(body: any): Promise<apifieldobject> {

        var url = `/meta_data/${this.type}`;
        if (this.subtypeid) {
            url = `${url}/types/${this.subtypeid}`;
        }
        url = `${url}/fields`;

        return await this.service.post(url, body);
    }
}

export class typeMetaData {
    constructor(private service: PapiClient, private typeName: string) { }

    types = new types(this.service, this.typeName);
    fields = new fields(this.service, this.typeName);

}

