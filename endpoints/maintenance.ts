import { IterableEndpoint } from '../endpoint';
import { PapiClient } from '../papi-client';
import {
    ResourceName,
    ArchivedObject,
    MaintenanceJobInfo,
    MaintenanceJobResult,
    UnArchiveBody,
    ArchiveBody,
} from '../entities';

export class MaintenanceEndpoint {
    private resourceName: ResourceName = 'all_activities';
    private service: PapiClient;

    constructor(service: PapiClient) {
        this.service = service;
    }

    archived = {
        type: (type: ResourceName) => {
            return new IterableEndpoint<ArchivedObject>(this.service, `/maintenance/archived/${type}`);
        },
        jobInfo: async (uuid: string): Promise<MaintenanceJobInfo> => {
            return await this.service.get(`/maintenance/archived/job_info/${uuid}`);
        },
    };

    type(resourceName: ResourceName) {
        this.resourceName = resourceName;
        return this;
    }

    async archive(body: ArchiveBody): Promise<MaintenanceJobResult> {
        const url = `/maintenance/${this.resourceName}/archive`;
        return await this.service.post(url, body);
    }

    async unArchive(body: UnArchiveBody): Promise<MaintenanceJobResult> {
        const url = `/maintenance/${this.resourceName}/unarchive`;
        return await this.service.post(url, body);
    }
}
