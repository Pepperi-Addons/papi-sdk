import { AuditLog, AuditLogLines } from '../entities';
import Endpoint from '../endpoint';
import { PapiClient } from '../papi-client';

class AuditLogEndpoint {
    constructor(private service: PapiClient, private uuid: string) {}

    async get() {
        return await this.service.get(`/audit_logs/${this.uuid}`);
    }

    lines = new Endpoint<AuditLogLines>(this.service, `/audit_logs/${this.uuid}/lines`);
}

export class AuditLogsEndpoint extends Endpoint<AuditLog> {
    constructor(service: PapiClient) {
        super(service, '/audit_logs');
    }
    uuid(uuid: string) {
        return new AuditLogEndpoint(this.service, uuid);
    }
}
