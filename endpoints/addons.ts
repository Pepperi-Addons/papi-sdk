import Endpoint, { FileFindOptions, FindOptions } from '../endpoint';
import {
    Addon,
    InstalledAddon,
    AddonVersion,
    AddonAPIAsyncResult,
    AddonData,
    AddonDataScheme,
    Relation,
    AddonFile,
    ElasticSearchDocument,
} from '../entities';
import { PapiClient } from '../papi-client';

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

class TableEndpoint extends Endpoint<AddonData> {
    private addonUUID: string;
    private tableName: string;

    constructor(service: PapiClient, addonUUID: string, tableName: string) {
        super(service, `/addons/data/${addonUUID}/${tableName}`);
        this.addonUUID = addonUUID;
        this.tableName = tableName;
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
        type: (indexType: 'index' | 'typed_index') => {
            return {
                schemes: {
                    uuid: (addonUUID: string) => {
                        return {
                            create: async (body: ElasticSearchDocument) => {
                                return await this.service.post(
                                    `/addons/data/${indexType}/schemes/${addonUUID}/create`,
                                    body,
                                );
                            },
                            purge: async (body: ElasticSearchDocument) => {
                                return await this.service.post(
                                    `/addons/data/${indexType}/schemes/${addonUUID}/purge`,
                                    body,
                                );
                            },
                        };
                    },
                },
                uuid: (addonUUID: string) => {
                    return {
                        resource: (resourceName: string) => {
                            return {
                                create: async (body: ElasticSearchDocument) => {
                                    return await this.service.post(
                                        `/addons/data/${indexType}/${addonUUID}/${resourceName}`,
                                        body,
                                    );
                                },
                                key: (key: string) => {
                                    return {
                                        get: async (): Promise<ElasticSearchDocument> => {
                                            return await this.service.get(
                                                `/addons/data/${indexType}/${addonUUID}/${resourceName}/${key}`,
                                            );
                                        },
                                    };
                                },
                                find: async (params: FindOptions): Promise<ElasticSearchDocument[]> => {
                                    let url = `/addons/data/${indexType}/${addonUUID}/${resourceName}`;
                                    const query = Endpoint.encodeQueryParams(params);
                                    url = query ? url + '?' + query : url;
                                    return await this.service.get(url);
                                },
                            };
                        },
                    };
                },
                batch: (body: ElasticSearchDocument[]) => {
                    return {
                        uuid: (addonUUID: string) => {
                            return {
                                resource: async (resourceName: string) => {
                                    return await this.service.post(
                                        `/addons/data/${indexType}/batch/${addonUUID}/${resourceName}`,
                                        body,
                                    );
                                },
                            };
                        },
                    };
                },
                search: (dslQuery: any) => {
                    return {
                        uuid: (addonUUID: string) => {
                            return {
                                resource: async (resourceName: string) => {
                                    return await this.service.post(
                                        `/addons/data/${indexType}/${addonUUID}/search/${resourceName}`,
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
                                        `/addons/data/${indexType}/${addonUUID}/delete/${resourceName}`,
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
                                resource: async (resourceName: string) => {
                                    return await this.service.post(
                                        `/addons/data/${indexType}/${addonUUID}/update/${resourceName}`,
                                        dslQuery,
                                    );
                                },
                            };
                        },
                    };
                },
            };
        },
        relations: new Endpoint<Relation>(this.service, '/addons/data/relations'),
    };

    files = {
        uuid: (addonUUID: string) => {
            return {
                key: (keyName: string) => {
                    return {
                        get: async (): Promise<AddonFile> => {
                            return await this.service.get(`/addons/files/${addonUUID}/${keyName}`);
                        },
                    };
                },
                find: async (params: FileFindOptions): Promise<AddonFile[]> => {
                    let url = `/addons/files/${addonUUID}`;
                    const query = Endpoint.encodeQueryParams(params);
                    url = `${url}?${query}`;

                    return await this.service.get(url);
                },
                post: async (body: AddonFile): Promise<AddonFile> => {
                    return await this.service.post(`/addons/files/${addonUUID}`, body);
                },
            };
        },
    };
}
