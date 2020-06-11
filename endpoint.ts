import { PapiClient } from './index';

interface FindOptions {
    fields?: string[],
    where?: string,
    orderBy?: string,
    page?: number,
    page_size?: number,
    include_nested?: boolean,
    full_mode?: boolean,
    include_deleted?: boolean,
    is_distinct?: boolean
}

export default class Endpoint<T> {
    constructor(
        protected service: PapiClient,
        protected endpoint: string
    ) {

    }

    async find(options: FindOptions = {}): Promise<T[]> {
        let url = this.endpoint;
        let query = Endpoint.encodeQueryParams(options);
        url = query ? url + "?" + query : url;
        return this.service.get(url);
    }

    async upsert(object: T): Promise<T> {
        return this.service.post(this.endpoint, object);
    }

    async findById(id: string, options: FindOptions = {}): Promise<T[]> {
        let url = this.endpoint;
        let query = Endpoint.encodeQueryParams(options);
        url = query ? url + "/" + id + "?" + query : url + "/" + id;
        return this.service.get(url);
    }

    static encodeQueryParams(params: any) {
        const ret: string[] = [];

        Object.keys(params).forEach(key => {
            ret.push(key + '=' + encodeURIComponent(params[key]));
        });

        return ret.join('&');
    }
}