import { PapiClient } from '../papi-client';
import { ApiFieldObject, ATDSettings, ATDMetaData } from '../entities';

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
    constructor(private service: PapiClient, private typeName: string) {}

    subtype(subtypeid: string): SubTypes {
        return new SubTypes(this.service, this.typeName, subtypeid);
    }

    async get(): Promise<ATDMetaData[]> {
        const url = `/meta_data/${this.typeName}/types`;
        return await this.service.get(url);
    }

    fields = new Fields(this.service, this.typeName);
}

export class SubTypes {
    constructor(private service: PapiClient, private typeName: string, private subtype: string) {}

    async get(): Promise<ATDMetaData> {
        const url = `/meta_data/${this.typeName}/types/${this.subtype}`;
        return await this.service.get(url);
    }

    fields = new Fields(this.service, this.typeName, this.subtype);

    settings = new Settings(this.service, this.typeName, this.subtype);
}

export class Fields {
    constructor(private service: PapiClient, private type: string, private subtypeid?: string) {}

    async get(): Promise<ApiFieldObject[]>;
    async get(apiName: string): Promise<ApiFieldObject>;
    async get(apiName?: string): Promise<ApiFieldObject | ApiFieldObject[]> {
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

export class Settings {
    constructor(private service: PapiClient, private type: string, private subtypeid: string) {}

    async get(): Promise<ATDSettings> {
        const url = `/meta_data/${this.type}/types/${this.subtypeid}/settings`;
        return await this.service.get(url);
    }

    async update(body: ATDSettings): Promise<ATDSettings> {
        const url = `/meta_data/${this.type}/types/${this.subtypeid}/settings`;
        return await this.service.post(url, body);
    }
}
