import Endpoint, { FindOptions } from '../endpoint';
import {
    AddonAPIAsyncResult,
    AddonData,
    DataImportInput,
    DistinctValuesBody,
    DistinctValuesResponse,
    FileExportInput,
    FileImportInput,
    SearchBody,
    SearchData,
} from '../entities';
import { PapiClient } from '../papi-client';

export class GenericResourceEndpoint {
    constructor(private service: PapiClient, private baseUrl: string) {}

    async get(options: FindOptions = {}): Promise<AddonData[]> {
        const query = Endpoint.encodeQueryParams(options);
        const url = query ? this.baseUrl + '?' + query : this.baseUrl;
        return await this.service.get(url);
    }

    async post(body: AddonData): Promise<AddonData> {
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

    async search(body: SearchBody): Promise<SearchData<AddonData>> {
        return await this.service.post(`${this.baseUrl}/search`, body);
    }

    async distinct_values(body: DistinctValuesBody): Promise<DistinctValuesResponse> {
        return await this.service.post(`${this.baseUrl}/distinct_values`, body);
    }

    import = {
        data: async (body: DataImportInput): Promise<AddonAPIAsyncResult> => {
            return await this.service.post(`${this.baseUrl}/import/data`, body);
        },
        file: () => {
            return {
                post: async (body: FileImportInput): Promise<AddonAPIAsyncResult> => {
                    return await this.service.post(`${this.baseUrl}/import/file`, body);
                },
            };
        },
    };

    export = {
        file: () => {
            return {
                post: async (body: FileExportInput): Promise<AddonAPIAsyncResult> => {
                    return await this.service.post(`${this.baseUrl}/export/file`, body);
                },
            };
        },
    };
}
