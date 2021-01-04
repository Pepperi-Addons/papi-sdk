import Endpoint from '../endpoint';
import { Addon, InstalledAddon, AddonVersion, AddonAPIAsyncResult, AddonData, AddonDataScheme } from '../entities';
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

class AddonDataEndpoint extends Endpoint<AddonData> {
    private options = {
        uuid: '',
        table: '',
        key: '',
    };
    constructor(service: PapiClient) {
        super(service, '/addons/data');
    }

    uuid(addonUUID: string) {
        this.options.uuid = addonUUID;
        return this;
    }

    table(tableName: string) {
        this.options.table = tableName;
        return this;
    }

    key(keyName: string) {
        this.options.key = keyName;
        return this;
    }

    async schemes(body: AddonDataScheme) {
        return await this.service.post('/addons/data/schemes', body);
    }

    async get(params: any = {}) {
        const url = this.GetAddonDataUrl(params);
        return await this.service.get(url);
    }
    async post(body: any = undefined) {
        const url = this.GetAddonDataUrl();
        return await this.service.post(url, body);
    }

    private GetAddonDataUrl(params: any = {}) {
        const url = `/addons/data/${this.options.uuid}/${this.options.table}/${this.options.key}`;
        const queryString = Endpoint.encodeQueryParams(params);
        return queryString ? url + '?' + queryString : url;
    }
}

export class AddonEndpoint extends Endpoint<Addon> {
    constructor(service: PapiClient) {
        super(service, '/addons');
    }
    installedAddons = new InstalledAddonsEnpoint(this.service);
    versions = new AddonVersionEndpoint(this.service);
    api = new AddonApiEndpoint(this.service);
    data = new AddonDataEndpoint(this.service);
}
