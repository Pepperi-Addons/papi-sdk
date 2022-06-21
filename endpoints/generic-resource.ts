import Endpoint, { FindOptions } from '../endpoint';
import {
    AddonAPIAsyncResult,
    AddonData,
    AddonDataScheme,
    DataImportInput,
    FileExportInput,
    FileImportInput,
} from '../entities';
import { PapiClient } from '../papi-client';

export class GenericResourceEndpoint {
    constructor(private service: PapiClient, private baseUrl: string) {}

    async get(options?: FindOptions): Promise<AddonDataScheme[]> {
        const query = Endpoint.encodeQueryParams(options);
        const url = query ? this.baseUrl + '?' + query : this.baseUrl;
        return await this.service.get(url);
    }

    async post(body: AddonDataScheme): Promise<AddonDataScheme> {
        return await this.service.post(this.baseUrl, body);
    }

    key(key: string) {
        return {
            get: async (): Promise<AddonData> => {
                return await this.service.get(`${this.baseUrl}/key/${key}`);
            },
        };
    }

    unique(fieldID: string) {
        return {
            get: async (value: string): Promise<AddonData> => {
                return await this.service.get(`${this.baseUrl}/unique/${fieldID}/${value}`);
            },
        };
    }

    search() {
        return {
            post: async (body: any): Promise<AddonData[]> => {
                return await this.service.post(`${this.baseUrl}/search`, body);
            },
        };
    }

    import() {
        return {
            post: async (body: DataImportInput): Promise<AddonAPIAsyncResult> => {
                return await this.service.post(`${this.baseUrl}/import`, body);
            },
            file: () => {
                return {
                    post: async (body: FileImportInput): Promise<AddonAPIAsyncResult> => {
                        return await this.service.post(`${this.baseUrl}/import/file`, body);
                    },
                };
            },
        };
    }

    export() {
        return {
            file: () => {
                return {
                    post: async (body: FileExportInput): Promise<AddonAPIAsyncResult> => {
                        return await this.service.post(`${this.baseUrl}/export/file`, body);
                    },
                };
            },
        };
    }
}
