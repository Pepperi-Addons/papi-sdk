import Endpoint from '../endpoint';
import { DataView, FieldBankCustomField } from '../entities';
import { PapiClient } from '../papi-client';

export class DataViewsEndpoint extends Endpoint<DataView> {
    constructor(service: PapiClient) {
        super(service, '/meta_data/data_views');
    }
    fieldBank = (fieldBankUUID: string) => {
        const service = this.service;
        return {
            customFields: new CustomFields(service, fieldBankUUID),
        };
    };
}

class CustomFields {
    constructor(private service: PapiClient, private fieldBankUUID: string) {}
    url = `/meta_data/data_views/field_bank/${this.fieldBankUUID}/custom_fields`;
    key(keyName: string) {
        return {
            get: async (): Promise<FieldBankCustomField> => {
                return await this.service.get(`${this.url}/${keyName}`);
            },
        };
    }
    async get(): Promise<FieldBankCustomField[]> {
        return await this.service.get(this.url);
    }
    async upsert(body: FieldBankCustomField): Promise<FieldBankCustomField> {
        return await this.service.post(this.url, body);
    }
}
