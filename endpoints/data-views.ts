import Endpoint from '../endpoint';
import { FieldBankCustomField } from '../entities';
import { PapiClient } from '../papi-client';

export class DataViewsEndpoint extends Endpoint<DataView> {
    constructor(service: PapiClient) {
        super(service, '/meta_data/data_views');
    }

    fieldBank = (fieldBankUUID: string) => {
        const service = this.service;
        return {
            get customFields() {
                return new Endpoint<FieldBankCustomField>(
                    service,
                    `/meta_data/data_views/field_bank/${fieldBankUUID}/custom_fields`,
                );
            },
        };
    };
}
