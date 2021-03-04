import Endpoint from '../endpoint';
import { PapiClient } from '../papi-client';

export class DataViewsEndpoint extends Endpoint<DataView> {
    constructor(service: PapiClient) {
        super(service, '/meta_data/data_views');
    }
    fieldBank(fieldBankUUID: string) {
        return new FieldBank(this.service, fieldBankUUID);
    }
}

export class FieldBank {
    constructor(private service: PapiClient, private fieldBankUUID: string) {}

    customFields = new CustomField(this.service, this.fieldBankUUID);
}

export class CustomField {
    constructor(private service: PapiClient, private fieldBankUUID: string) {}
    fieldUUID(fieldUUID: string) {
        return new CustomFieldUUID(this.service, this.fieldBankUUID, fieldUUID);
    }

    async upsert(body: FieldBank): Promise<FieldBank> {
        const url = `meta_data/data_views/${this.fieldBankUUID}/custom_fields`;
        return await this.service.post(url, body);
    }
}

export class CustomFieldUUID {
    constructor(private service: PapiClient, private fieldBankUUID: string, private fieldUUID: string) {}

    async get(): Promise<FieldBank> {
        const url = `meta_data/data_views/${this.fieldBankUUID}/custom_fields/${this.fieldUUID}`;
        return await this.service.get(url);
    }
}
