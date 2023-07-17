import Endpoint from '../endpoint';
import { PapiClient } from '../papi-client';
import { ConfigurationObject, ConfigurationScheme, Draft, SearchBody, Version } from '../entities';

class ConfigurationsCRUDEndpoints<T> extends Endpoint<T> {
    constructor(service: PapiClient, protected url: string) {
        super(service, url);
    }
    key(key: string) {
        return {
            get: async () => {
                return await this.service.get(`${this.url}/key/${key}`);
            },
        };
    }
    async search(searchBody: SearchBody) {
        return await this.service.post(`${this.url}/search`, searchBody);
    }
}

//configurations/
export class ConfigurationsEndpoints {
    schemes: ConfigurationsCRUDEndpoints<ConfigurationScheme>;
    objects: ConfigurationsCRUDEndpoints<ConfigurationObject>;
    constructor(protected service: PapiClient, protected url: string) {
        this.schemes = new ConfigurationsCRUDEndpoints<ConfigurationScheme>(this.service, this.url + '/schemes');
        this.objects = new ConfigurationsCRUDEndpoints<ConfigurationObject>(this.service, this.url + '/objects');
    }

    addonUUID(addonUUID: string) {
        return {
            scheme: (scheme: string) => {
                return {
                    drafts: new DraftsEndpoints(this.service, this.url + `/${addonUUID}/${scheme}/drafts`),
                    versions: new ConfigurationsCRUDEndpoints<Version>(
                        this.service,
                        this.url + `/${addonUUID}/${scheme}/versions`,
                    ),
                };
            },
        };
    }
}

//configurations/:uuid/:scheme/drafts
class DraftsEndpoints extends ConfigurationsCRUDEndpoints<Draft> {
    constructor(protected service: PapiClient, protected url: string) {
        super(service, url);
    }
    key(key: string) {
        return {
            publish: async () => {
                return await this.service.post(this.url + `/key/${key}/publish`);
            },
            restore: async (versionKey: string) => {
                return await this.service.post(this.url + `/key/${key}/restore`, { VersionKey: versionKey });
            },
            get: async () => {
                return await this.service.get(`${this.url}/key/${key}`);
            },
        };
    }
}
