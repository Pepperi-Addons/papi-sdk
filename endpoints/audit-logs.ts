import { AuditLog } from '../entities';
import Endpoint from '../endpoint';
import { PapiClient } from '../papi-client';

class AuditLogEndpoint {
    constructor(private service: PapiClient, private uuid: string, private linesPart: string = '') {}

    async get() {
        return await this.service.get(`/audit_logs/${this.uuid}${this.linesPart}`);
    }
    async post(body: any) {
        return await this.service.post(`/audit_logs/${this.uuid}${this.linesPart}`, body);
    }
    lines() {
        this.linesPart = '/lines';
        return this;
    }
}

export class AuditLogsEndpoint extends Endpoint<AuditLog> {
    constructor(service: PapiClient) {
        super(service, '/audit_logs');
    }

    uuid(uuid: string) {
        return new AuditLogEndpoint(this.service, uuid);
    }
}
