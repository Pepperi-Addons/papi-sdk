import { PapiClient } from '../papi-client';
import { MaintenanceJobResult, ArchiveBody } from '../entities';

export class MaintenanceEndpoint {
    private service: PapiClient;

    constructor(service: PapiClient) {
        this.service = service;
    }

    async archive(body: ArchiveBody): Promise<MaintenanceJobResult> {
        const url = '/maintenance/archive';
        return await this.service.post(url, body);
    }
}
