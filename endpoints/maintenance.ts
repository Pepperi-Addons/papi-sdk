import { PapiClient } from '../papi-client';
import { ExportApiResponse, ArchiveBody } from '../entities';

export class MaintenanceEndpoint {
    private service: PapiClient;

    constructor(service: PapiClient) {
        this.service = service;
    }

    async archive(body: ArchiveBody): Promise<ExportApiResponse> {
        const url = '/maintenance/archive';
        return await this.service.post(url, body);
    }
}
