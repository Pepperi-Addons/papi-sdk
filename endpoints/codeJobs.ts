import { CodeJob } from '../entities/codeJobs';
import Endpoint from '../endpoint';
import { PapiClient } from '../papi-client';

class CodeJobEndpoint {
    constructor(private service: PapiClient, private uuid: string, private async: boolean) {}

    async find(includeDeleted = false): Promise<CodeJob> {
        return await this.service.get(`/code_jobs/${this.uuid}?include_deleted=${includeDeleted}`);
    }

    async publish(body: { comment: string }) {
        return this.service.post(`/code_jobs/${this.uuid}/publish`, body);
    }

    async execute() {
        const asyncPart = this.async ? 'async/' : '';
        return this.service.post(`/code_jobs/${asyncPart}${this.uuid}/execute`);
    }
}

export class CodeJobsEndpoint extends Endpoint<CodeJob> {
    private isAsync = false;
    constructor(service: PapiClient) {
        super(service, '/code_jobs');
    }

    async() {
        this.isAsync = true;
        return this;
    }
}
