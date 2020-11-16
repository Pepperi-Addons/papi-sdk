import { PapiClient } from '../papi-client';
import { SyncBody, SyncResponse, SyncJobInfo, SyncData } from '../entities';

export class SyncEndpoint {
    constructor(private service: PapiClient) {}

    async post(body: SyncBody): Promise<SyncResponse> {
        const url = `/application/sync`;
        return await this.service.post(url, body);
    }

    async jobInfo(uuid: string): Promise<SyncJobInfo> {
        const url = `/application/sync/jobinfo/${uuid}`;
        return await this.service.get(url);
    }

    async data(uuid: string): Promise<SyncData> {
        const url = `/application/sync/data/${uuid}`;
        return await this.service.get(url);
    }
}
