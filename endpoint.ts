import { PapiClient } from './index';
import { BatchApiResponse, ExportApiResponse } from './entities';

interface FindOptions {
    fields?: string[];
    where?: string;
    orderBy?: string;
    page?: number;
    page_size?: number;
    include_nested?: boolean;
    full_mode?: boolean;
    include_deleted?: boolean;
    is_distinct?: boolean;
}

export class IterableEndpoint<T> {
    constructor(protected service: PapiClient, protected endpoint: string) {}

    async find(options: FindOptions = {}): Promise<T[]> {
        let url = this.getEndpointURL();
        const query = Endpoint.encodeQueryParams(options);
        url = query ? url + '?' + query : url;
        return this.service.get(url);
    }

    getEndpointURL() {
        return this.endpoint;
    }

    iter(options: FindOptions = {}) {
        const self = this;
        return {
            [Symbol.asyncIterator](): AsyncIterator<T> {
                const newOptions: FindOptions & { include_count?: boolean } = options;
                newOptions.include_count = true;
                let currentPage = 1;
                let obj: { items: T[]; numOfPages: number } = { items: [], numOfPages: 1 };
                return {
                    next: async () => {
                        if (obj.items.length == 0) {
                            if (currentPage == 1) {
                                newOptions.page = currentPage++;
                                obj = await self.getFirstPage(newOptions);
                                newOptions.include_count = false;
                            } else if (currentPage <= obj.numOfPages) {
                                newOptions.page = currentPage++;
                                obj.items = await self.find(newOptions);
                            }
                        }
                        const retItem = obj.items.length > 0 ? obj.items.shift() : undefined;
                        if (retItem) {
                            return { value: retItem, done: false };
                        }
                        return { value: {}, done: true };
                    },
                };
            },

            toArray: async () => {
                const items: T[] = [];
                for await (const item of this.iter(options)) {
                    items.push(item);
                }

                return items;
            },
        };
    }

    private async getFirstPage(options: any): Promise<{ items: T[]; numOfPages: number }> {
        let url = this.getEndpointURL();
        const query = Endpoint.encodeQueryParams(options);
        let items: T[] = [];
        url = query ? url + '?' + query : url;
        const res = await this.service.apiCall('GET', url);
        const numOfPages = Number(res.headers.get('X-Pepperi-Total-Pages'));
        items = await res.json();
        return { items, numOfPages };
    }
}

export default class Endpoint<T> extends IterableEndpoint<T> {
    constructor(protected service: PapiClient, protected endpoint: string) {
        super(service, endpoint);
    }

    async get(id: number): Promise<T[]> {
        let url = this.getEndpointURL();
        url += '/' + id;
        return this.service.get(url);
    }

    async upsert(object: T): Promise<T> {
        return this.service.post(this.getEndpointURL(), object);
    }

    async batch(objects: T[]): Promise<BatchApiResponse[]> {
        return this.service.post('/batch' + this.getEndpointURL(), objects);
    }

    async export(options: FindOptions): Promise<ExportApiResponse> {
        const body = {
            fields: options.fields ? options.fields.join(',') : undefined,
            where: options.where,
            orderBy: options.orderBy,
            page: options.page,
            page_size: options.page_size,
            include_nested: options.include_nested,
            full_mode: options.full_mode,
            include_deleted: options.include_deleted,
            is_distinct: options.is_distinct,
        };
        return this.service.post('/export' + this.getEndpointURL(), body);
    }

    async delete(id: number): Promise<boolean> {
        let url = this.getEndpointURL();
        url += '/' + id;
        return this.service
            .delete(url)
            .then((res) => res.text())
            .then((res) => (res ? JSON.parse(res) : ''));
    }

    static encodeQueryParams(params: any) {
        const ret: string[] = [];

        Object.keys(params).forEach((key) => {
            ret.push(key + '=' + encodeURIComponent(params[key]));
        });

        return ret.join('&');
    }
}
