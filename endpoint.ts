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

    async find(options: FindOptions = {}) : Promise<T[]> {
        let url = this.endpoint;
        let query = this.encodeQueryParams(options);
        url = query ? url + "?" + query : url;
        console.log(url);

        return this.service.get(url);
    }

    async upsert(object: T): Promise<T> {
        return this.service.post(this.endpoint, object);
    }

    private encodeQueryParams(params: any) {
        const ret = [];
        for (let d in params)
            ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(params[d]));

        return ret.join('&');
    }
}