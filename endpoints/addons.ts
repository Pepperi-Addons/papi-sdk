import Endpoint, { FileFindOptions, FindOptions } from '../endpoint';
import {
    Addon,
    InstalledAddon,
    AddonVersion,
    AddonAPIAsyncResult,
    AddonData,
    AddonDataScheme,
    Relation,
    Job,
    AddonFile,
    ElasticSearchDocument,
    DIMXObject,
    SearchBody,
    SearchData,
    TemporaryFileRequest,
    TemporaryFile,
    CrawlerInput,
    MultiCrawlerInput,
    DistinctValuesBody,
    DistinctValuesResponse,
    FilterObject,
} from '../entities';
import {
    DataImportInput,
    FileExportInput,
    FileImportInput,
    MappingInput,
    RecursiveExportInput,
    RecursiveImportInput,
} from '../entities/dimx_inputs';
import { PapiClient } from '../papi-client';
import { ConfigurationsEndpoints } from './configurations';
import { CrawlerEndpoint, MultiCrawlerEndpoint } from './crawler';
import { UpdateByQueryResponse, DataIndexBatchRequestBody } from '../entities/data-index';

class InstalledAddonEnpoint {
    constructor(private service: PapiClient, private addonUUID: string) {}
    async install(version = ''): Promise<AddonAPIAsyncResult> {
        if (version) return await this.service.post(`/addons/installed_addons/${this.addonUUID}/install/${version}`);
        else return await this.service.post(`/addons/installed_addons/${this.addonUUID}/install`);
    }

    async uninstall(): Promise<AddonAPIAsyncResult> {
        return await this.service.post(`/addons/installed_addons/${this.addonUUID}/uninstall`);
    }

    async upgrade(version = ''): Promise<AddonAPIAsyncResult> {
        if (version) return await this.service.post(`/addons/installed_addons/${this.addonUUID}/upgrade/${version}`);
        else return await this.service.post(`/addons/installed_addons/${this.addonUUID}/upgrade`);
    }

    async downgrade(version: string): Promise<AddonAPIAsyncResult> {
        return await this.service.post(`/addons/installed_addons/${this.addonUUID}/downgrade/${version}`);
    }

    async get(): Promise<InstalledAddon> {
        return await this.service.get(`/addons/installed_addons/${this.addonUUID}`);
    }
}

class InstalledAddonsEnpoint extends Endpoint<InstalledAddon> {
    constructor(service: PapiClient) {
        super(service, '/addons/installed_addons');
    }
    addonUUID(uuid: string) {
        return new InstalledAddonEnpoint(this.service, uuid);
    }
}

class AddonApiEndpoint {
    private options = {
        uuid: '',
        file: '',
        func: '',
        version: '',
        sync: true,
        queryString: '',
    };
    constructor(private service: PapiClient) {}

    uuid(uuid: string) {
        this.options.uuid = uuid;
        return this;
    }
    file(fileName: string) {
        this.options.file = fileName;
        return this;
    }
    func(functionName: string) {
        this.options.func = functionName;
        return this;
    }
    sync() {
        this.options.sync = true;
        return this;
    }
    async() {
        this.options.sync = false;
        return this;
    }

    async get(params: any = {}) {
        const url = this.GetAddonApiUrl(params);
        return await this.service.get(url);
    }
    async post(params: any = {}, body: any = undefined) {
        const url = this.GetAddonApiUrl(params);
        return await this.service.post(url, body);
    }

    private GetAddonApiUrl(params: any = {}) {
        let asyncPart = '';
        if (!this.options.sync) {
            asyncPart = '/async';
        }
        const url = '/addons/api' + asyncPart + `/${this.options.uuid}/${this.options.file}/${this.options.func}`;
        const queryString = Endpoint.encodeQueryParams(params);
        return queryString ? url + '?' + queryString : url;
    }
}

class AddonVersionEndpoint extends Endpoint<AddonVersion> {
    constructor(service: PapiClient) {
        super(service, '/addons/versions');
    }
}

class BatchEndpoint {
    constructor(
        private service: PapiClient,
        private baseURL: string,
        private body: {
            Objects: AddonData[];
            OverwriteObject?: boolean;
            WriteMode?: 'Merge' | 'Overwrite' | 'Insert';
            MaxPageSize?: number;
        },
        private headers: any = undefined,
    ) {}

    uuid(addonUUID: string) {
        return {
            resource: async (resourceName: string): Promise<DIMXObject[]> => {
                return await this.service.post(`${this.baseURL}/${addonUUID}/${resourceName}`, this.body, this.headers);
            },
        };
    }
}

class DistinctValuesEndpoint {
    constructor(
        private service: PapiClient,
        private baseURL: string,
        private body: DistinctValuesBody,
        private headers: any = undefined,
    ) {}

    uuid(addonUUID: string) {
        return {
            resource: async (resourceName: string): Promise<DistinctValuesResponse> => {
                return await this.service.post(`${this.baseURL}/${addonUUID}/${resourceName}`, this.body, this.headers);
            },
        };
    }
}

class TableEndpoint extends Endpoint<AddonData> {
    private addonUUID: string;
    private tableName: string;

    constructor(service: PapiClient, addonUUID: string, tableName: string) {
        super(service, `/addons/data/${addonUUID}/${tableName}`);
        this.addonUUID = addonUUID;
        this.tableName = tableName;
    }

    async upsert(object: AddonData, waitForIndex = false): Promise<AddonData> {
        let headers = undefined;
        if (waitForIndex) {
            headers = {
                'x-pepperi-await-indexing': true,
            };
        }
        return this.service.post(this.getEndpointURL(), object, headers);
    }

    key(keyName: string) {
        return {
            get: async (): Promise<AddonData> => {
                return await this.service.get(`/addons/data/${this.addonUUID}/${this.tableName}/${keyName}`);
            },
            hardDelete: async (force = false): Promise<AddonData> => {
                return await this.service.post(
                    `/addons/data/${this.addonUUID}/${this.tableName}/${keyName}/hard_delete`,
                    {
                        Force: force,
                    },
                );
            },
        };
    }
}

export class AddonEndpoint extends Endpoint<Addon> {
    constructor(service: PapiClient) {
        super(service, '/addons');
    }
    installedAddons = new InstalledAddonsEnpoint(this.service);
    versions = new AddonVersionEndpoint(this.service);
    api = new AddonApiEndpoint(this.service);
    configurations = new ConfigurationsEndpoints(this.service, '/addons/configurations');
    // data = new AddonDataEndpoint(this.service);

    data = {
        schemes: {
            get: async (params: FindOptions): Promise<AddonDataScheme[]> => {
                let url = '/addons/data/schemes';
                const query = Endpoint.encodeQueryParams(params);
                url = query ? url + '?' + query : url;
                return await this.service.get(url);
            },
            name: (name: string) => {
                return {
                    get: async (): Promise<AddonDataScheme> => {
                        return await this.service.get(`/addons/data/schemes/${name}`);
                    },
                };
            },
            post: async (body: AddonDataScheme): Promise<AddonDataScheme> => {
                return await this.service.post('/addons/data/schemes', body);
            },
        },
        uuid: (addonUUID: string) => {
            return {
                table: (tableName: string) => {
                    return new TableEndpoint(this.service, addonUUID, tableName);
                },
            };
        },
        batch: (
            body: {
                Objects: AddonData[];
                OverwriteObject?: boolean;
                WriteMode?: 'Merge' | 'Overwrite' | 'Insert';
                MaxPageSize?: number;
            },
            headers: any = undefined,
        ) => {
            return new BatchEndpoint(this.service, '/addons/data/batch', body, headers);
        },
        distinct_values: (body: DistinctValuesBody, headers: any = undefined) => {
            return new DistinctValuesEndpoint(this.service, '/addons/data/distinct_values', body, headers);
        },
        relations: new Endpoint<Relation>(this.service, '/addons/data/relations'),
        import: {
            uuid: (addonUUID: string) => {
                return {
                    table: (tableName: string) => {
                        return {
                            upsert: async (body: DataImportInput): Promise<DIMXObject[]> => {
                                return await this.service.post(`/addons/data/import/${addonUUID}/${tableName}`, body);
                            },
                        };
                    },
                };
            },
            file: {
                uuid: (addonUUID: string) => {
                    return {
                        table: (tableName: string) => {
                            return {
                                upsert: async (body: FileImportInput): Promise<AddonAPIAsyncResult> => {
                                    return await this.service.post(
                                        `/addons/data/import/file/${addonUUID}/${tableName}`,
                                        body,
                                    );
                                },
                            };
                        },
                    };
                },
                recursive: {
                    uuid: (addonUUID: string) => {
                        return {
                            table: (tableName: string) => {
                                return {
                                    upsert: async (body: RecursiveImportInput): Promise<AddonAPIAsyncResult> => {
                                        return await this.service.post(
                                            `/addons/data/import/file/recursive/${addonUUID}/${tableName}`,
                                            body,
                                        );
                                    },
                                };
                            },
                        };
                    },
                },
            },
        },
        export: {
            file: {
                uuid: (addonUUID: string) => {
                    return {
                        table: (tableName: string) => {
                            return {
                                get: async (body: FileExportInput): Promise<AddonAPIAsyncResult> => {
                                    return await this.service.post(
                                        `/addons/data/export/file/${addonUUID}/${tableName}`,
                                        body,
                                    );
                                },
                            };
                        },
                    };
                },
                recursive: {
                    uuid: (addonUUID: string) => {
                        return {
                            table: (tableName: string) => {
                                return {
                                    get: async (body: RecursiveExportInput): Promise<AddonAPIAsyncResult> => {
                                        return await this.service.post(
                                            `/addons/data/export/file/recursive/${addonUUID}/${tableName}`,
                                            body,
                                        );
                                    },
                                };
                            },
                        };
                    },
                },
            },
        },
        mapping: {
            uuid: (addonUUID: string) => {
                return {
                    table: (tableName: string) => {
                        return {
                            upsert: async (body: MappingInput): Promise<AddonAPIAsyncResult> => {
                                return await this.service.post(`/addons/data/mapping/${addonUUID}/${tableName}`, body);
                            },
                        };
                    },
                };
            },
        },
        search: {
            uuid: (addonUUID: string) => {
                return {
                    table: (tableName: string) => {
                        return {
                            post: async (searchBody: SearchBody): Promise<SearchData<AddonData>> => {
                                return await this.service.post(
                                    `/addons/data/search/${addonUUID}/${tableName}`,
                                    searchBody,
                                );
                            },
                        };
                    },
                };
            },
        },
    };

    index = {
        schemes: {
            uuid: (addonUUID: string) => {
                return {
                    create: async (body: ElasticSearchDocument) => {
                        return await this.service.post(`/addons/index/schemes/${addonUUID}/create`, body);
                    },
                    purge: async (body: ElasticSearchDocument) => {
                        return await this.service.post(`/addons/index/schemes/${addonUUID}/purge`, body);
                    },
                };
            },
        },
        uuid: (addonUUID: string) => {
            return {
                resource: (resourceName: string) => {
                    return {
                        create: async (body: ElasticSearchDocument) => {
                            return await this.service.post(`/addons/index/${addonUUID}/${resourceName}`, body);
                        },
                        key: (key: string) => {
                            return {
                                get: async (): Promise<ElasticSearchDocument> => {
                                    return await this.service.get(`/addons/index/${addonUUID}/${resourceName}/${key}`);
                                },
                            };
                        },
                        find: async (params: FindOptions): Promise<ElasticSearchDocument[]> => {
                            let url = `/addons/index/${addonUUID}/${resourceName}`;
                            const query = Endpoint.encodeQueryParams(params);
                            url = query ? url + '?' + query : url;
                            return await this.service.get(url);
                        },
                    };
                },
            };
        },
        batch: (body: DataIndexBatchRequestBody, headers: any = undefined) => {
            return new BatchEndpoint(this.service, '/addons/index/batch', body, headers);
        },
        distinct_values: (body: DistinctValuesBody, headers: any = undefined) => {
            return new DistinctValuesEndpoint(this.service, '/addons/index/distinct_values', body, headers);
        },
        search: (dslQuery: any) => {
            return {
                uuid: (addonUUID: string) => {
                    return {
                        resource: async (resourceName: string) => {
                            return await this.service.post(
                                `/addons/index/search/${addonUUID}/${resourceName}`,
                                dslQuery,
                            );
                        },
                    };
                },
            };
        },
        delete: (dslQuery: any) => {
            return {
                uuid: (addonUUID: string) => {
                    return {
                        resource: async (resourceName: string) => {
                            return await this.service.post(
                                `/addons/index/delete/${addonUUID}/${resourceName}`,
                                dslQuery,
                            );
                        },
                    };
                },
            };
        },
        update: (dslQuery: any) => {
            return {
                uuid: (addonUUID: string) => {
                    return {
                        resource: async (resourceName: string): Promise<UpdateByQueryResponse> => {
                            return await this.service.post(
                                `/addons/index/update/${addonUUID}/${resourceName}`,
                                dslQuery,
                            );
                        },
                    };
                },
            };
        },
    };

    shared_index = {
        schemes: {
            uuid: (addonUUID: string) => {
                return {
                    create: async (body: ElasticSearchDocument) => {
                        return await this.service.post(`/addons/shared_index/schemes/${addonUUID}/create`, body);
                    },
                    purge: async (body: ElasticSearchDocument) => {
                        return await this.service.post(`/addons/shared_index/schemes/${addonUUID}/purge`, body);
                    },
                };
            },
        },
        index: {
            index_name: (indexName: string) => {
                return {
                    uuid: (addonUUID: string) => {
                        return {
                            resource: (resourceName: string) => {
                                return {
                                    create: async (body: ElasticSearchDocument) => {
                                        return await this.service.post(
                                            `/addons/shared_index/index/${indexName}/${addonUUID}/${resourceName}`,
                                            body,
                                        );
                                    },
                                    key: (key: string) => {
                                        return {
                                            get: async (): Promise<ElasticSearchDocument> => {
                                                return await this.service.get(
                                                    `/addons/shared_index/index/${indexName}/${addonUUID}/${resourceName}/${key}`,
                                                );
                                            },
                                        };
                                    },
                                    find: async (params: FindOptions): Promise<ElasticSearchDocument[]> => {
                                        let url = `/addons/shared_index/index/${indexName}/${addonUUID}/${resourceName}`;
                                        const query = Endpoint.encodeQueryParams(params);
                                        url = query ? url + '?' + query : url;
                                        return await this.service.get(url);
                                    },
                                };
                            },
                        };
                    },
                    batch: (body: DataIndexBatchRequestBody, headers: any = undefined) => {
                        return new BatchEndpoint(
                            this.service,
                            `/addons/shared_index/index/${indexName}/batch`,
                            body,
                            headers,
                        );
                    },
                    distinct_values: (body: DistinctValuesBody, headers: any = undefined) => {
                        return new DistinctValuesEndpoint(
                            this.service,
                            `/addons/shared_index/index/${indexName}/distinct_values`,
                            body,
                            headers,
                        );
                    },
                    search: (dslQuery: any) => {
                        return {
                            uuid: (addonUUID: string) => {
                                return {
                                    resource: async (resourceName: string) => {
                                        return await this.service.post(
                                            `/addons/shared_index/index/${indexName}/search/${addonUUID}/${resourceName}`,
                                            dslQuery,
                                        );
                                    },
                                };
                            },
                        };
                    },
                    delete: (dslQuery: any) => {
                        return {
                            uuid: (addonUUID: string) => {
                                return {
                                    resource: async (resourceName: string) => {
                                        return await this.service.post(
                                            `/addons/shared_index/index/${indexName}/delete/${addonUUID}/${resourceName}`,
                                            dslQuery,
                                        );
                                    },
                                };
                            },
                        };
                    },
                    update: (dslQuery: any) => {
                        return {
                            uuid: (addonUUID: string) => {
                                return {
                                    resource: async (resourceName: string): Promise<UpdateByQueryResponse> => {
                                        return await this.service.post(
                                            `/addons/shared_index/index/${indexName}/update/${addonUUID}/${resourceName}`,
                                            dslQuery,
                                        );
                                    },
                                };
                            },
                        };
                    },
                };
            },
        },
    };

    pfs = {
        uuid: (addonUUID: string) => {
            return {
                schema: (schemaName: string) => {
                    return {
                        key: (keyName: string) => {
                            return {
                                get: async (): Promise<AddonFile> => {
                                    return await this.service.get(`/addons/pfs/${addonUUID}/${schemaName}/${keyName}`);
                                },
                            };
                        },
                        find: async (params: FileFindOptions): Promise<AddonFile[]> => {
                            let url = `/addons/pfs/${addonUUID}/${schemaName}`;
                            const query = Endpoint.encodeQueryParams(params);
                            url = `${url}?${query}`;

                            return await this.service.get(url);
                        },
                        post: async (body: AddonFile): Promise<AddonFile> => {
                            return await this.service.post(`/addons/pfs/${addonUUID}/${schemaName}`, body);
                        },
                    };
                },
            };
        },
        temporaryFile: async (temporaryFileRequest?: TemporaryFileRequest): Promise<TemporaryFile> => {
            return await this.service.post(`/addons/pfs/temporary_file`, temporaryFileRequest ?? {});
        },
    };

    jobs = {
        uuid: (uuid: string) => {
            return {
                get: async (): Promise<Job> => {
                    return await this.service.get(`/addons/jobs/${uuid}`);
                },
            };
        },
        find: async (params: FindOptions): Promise<Job[]> => {
            let url = '/addons/jobs';
            const query = Endpoint.encodeQueryParams(params);
            url = query ? url + '?' + query : url;
            return await this.service.get(url);
        },
    };

    crawler = {
        crawl: async (input: CrawlerInput, numberOfRetries = 1) => {
            const crawler = new CrawlerEndpoint(this.service, '/addons/crawler');
            return await crawler.crawl(input, numberOfRetries);
        },
        multi_crawl: async (input: MultiCrawlerInput, numberOfRetries = 1) => {
            const crawler = new MultiCrawlerEndpoint(this.service, '/addons/crawler');
            return await crawler.multi_crawl(input, numberOfRetries);
        },
    };

    febula = {
        profile_filters: {
            find: async (params: FindOptions): Promise<FilterObject[]> => {
                let url = '/addons/api/cebb251f-1c80-4d80-b62c-442e48e678e8/api/profile_filters';
                const query = Endpoint.encodeQueryParams(params);
                url = query ? url + '?' + query : url;
                return await this.service.get(url);
            },
            upsert: async (body: FilterObject): Promise<FilterObject> => {
                const url = '/addons/api/cebb251f-1c80-4d80-b62c-442e48e678e8/api/profile_filters';
                return await this.service.post(url, body);
            },
            delete: async (keys: string[]): Promise<FilterObject[]> => {
                const url = '/addons/api/cebb251f-1c80-4d80-b62c-442e48e678e8/api/profile_filters_delete';
                return await this.service.post(url, { Keys: keys });
            },
        },
        filters: {
            find: async (params: FindOptions): Promise<FilterObject[]> => {
                let url = '/addons/api/cebb251f-1c80-4d80-b62c-442e48e678e8/api/filters';
                const query = Endpoint.encodeQueryParams(params);
                url = query ? url + '?' + query : url;
                return await this.service.get(url);
            },
            upsert: async (body: FilterObject): Promise<FilterObject> => {
                const url = '/addons/api/cebb251f-1c80-4d80-b62c-442e48e678e8/api/filters';
                return await this.service.post(url, body);
            },
            delete: async (keys: string[]): Promise<FilterObject[]> => {
                const url = '/addons/api/cebb251f-1c80-4d80-b62c-442e48e678e8/api/filters_delete';
                return await this.service.post(url, { Keys: keys });
            },
        },
    };
}
