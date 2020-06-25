import Endpoint from '../endpoint';
import { PapiClient } from '../papi-client';
import { ResourceName, ArchivedObject, MaintenanceJobInfo, MaintenanceJobResult } from '../entities';

export class MaintenanceEndpoint {
    private resourceName: ResourceName = 'all_activities';
    private service: PapiClient;

    constructor(service: PapiClient) {
        this.service = service;
    }

    archived = {
        type: (type: ResourceName) => {
            return new Endpoint<ArchivedObject>(this.service, `/maintenance/archived/${type}`);
        },
        job_info: async (uuid: string): Promise<MaintenanceJobInfo> => {
            return await this.service.get(`/maintenance/archived/job_info/${uuid}`);
        },
    };

    type(resourceName: ResourceName) {
        this.resourceName = resourceName;
        return this;
    }

    async archive(params: any = {}, body: any = undefined): Promise<MaintenanceJobResult> {
        const url = this.GetMaintenanceApiUrl(params, 'archive');
        return await this.service.post(url, body);
    }

    async unarchive(params: any = {}, body: any = undefined): Promise<MaintenanceJobResult> {
        const url = this.GetMaintenanceApiUrl(params, 'unarchive');
        return await this.service.post(url, body);
    }

    private GetMaintenanceApiUrl(params: any, funcName: string) {
        const url = `/maintenance/${this.resourceName}/${funcName}`;
        const quesyString = Endpoint.encodeQueryParams(params);
        return quesyString ? url + '?' + quesyString : url;
    }
}
