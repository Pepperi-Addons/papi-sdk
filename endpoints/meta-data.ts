import { PapiClient } from '../papi-client';
import { ApiFieldObject } from '../entities';

export class DistributorFlagsEndpoint {
    private options = {
        name: '',
    };
    constructor(private service: PapiClient) {}

    name(flagName: string) {
        this.options.name = flagName;
        return this;
    }

    async get(): Promise<any> {
        return await this.service.get(`/meta_data/flags/${this.options.name}`);
    }
}

export class TypeMetaData {
    constructor(private service: PapiClient, private typeObject: string) {}

    types = new Types(this.service, this.typeObject);
    fields = new Fields(this.service, this.typeObject);
}

export class Types {
    private options = {
        subtype: '',
    };
    constructor(private service: PapiClient, private typeName: string) {}

    subtype(subtypeid: string) {
        this.options.subtype = subtypeid;
        return this;
    }

    async get(): Promise<ApiFieldObject> {
        let url = `/meta_data/${this.typeName}/types`;
        if (this.options.subtype) {
            url = `${url}/${this.subtype}`;
        }
        return await this.service.get(url);
    }

    fields() {
        return new Fields(this.service, this.typeName, this.options.subtype);
    }
}

export class Fields {
    constructor(private service: PapiClient, private type: string, private subtypeid?: string) {}
    async get(apiName?: string): Promise<ApiFieldObject> {
        let url = `/meta_data/${this.type}`;
        if (this.subtypeid) {
            url = `${url}/types/${this.subtypeid}`;
        }
        url = `${url}/fields`;

        if (apiName) {
            url = `${url}/${apiName}`;
        }
        return await this.service.get(url);
    }
    async upsert(body: ApiFieldObject): Promise<ApiFieldObject> {
        let url = `/meta_data/${this.type}`;
        if (this.subtypeid) {
            url = `${url}/types/${this.subtypeid}`;
        }
        url = `${url}/fields`;

        return await this.service.post(url, body);
    }
}
