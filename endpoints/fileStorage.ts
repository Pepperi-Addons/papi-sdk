import { IterableEndpoint } from '../endpoint';
import { FileStorage, TempUrlResponse } from '../entities';
import { PapiClient } from '../papi-client';

export class FileStorageEndpoint extends IterableEndpoint<FileStorage> {
    constructor(service: PapiClient) {
        super(service, '/code_jobs');
    }

    async name(fileName: string): Promise<FileStorage> {
        return await this.service.get(`/file_storage/name/${fileName}`);
    }

    async temporaryUploadUrl(): Promise<TempUrlResponse> {
        return await this.service.post('/file_storage/temporary_upload_url');
    }
}
