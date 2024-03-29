import { PapiClient } from './index';
import { BatchApiResponse, ExportApiResponse } from './entities';

export interface FindOptions {
    fields?: string[];
    where?: string;
    order_by?: string;
    page?: number;
    page_size?: number;
    include_nested?: boolean;
    full_mode?: boolean;
    include_deleted?: boolean;
    is_distinct?: boolean;
}

export interface FileFindOptions extends FindOptions {
    folder: string;
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
                const pageSize = options.page_size || 100;
                let obj: { items: T[]; numOfPages: number } = { items: [], numOfPages: 1 };
                return {
                    next: async () => {
                        if (obj.items.length == 0) {
                            if (currentPage == 1) {
                                newOptions.page = currentPage++;
                                obj = await self.getFirstPage(newOptions);
                                obj.items = obj.items.reverse();
                                newOptions.include_count = false;

                                // this means there is no 'X-Pepperi-Total-Pages' header (eg. ADAL)
                                if (obj.numOfPages === 0) {
                                    // the items on first page are less than the page size
                                    // this means that there are no more pages
                                    if (obj.items.length < pageSize) {
                                        obj.numOfPages = 1;
                                    }
                                }
                            } else if (obj.numOfPages === 0 || currentPage <= obj.numOfPages) {
                                newOptions.page = currentPage++;
                                obj.items = (await self.find(newOptions)).reverse();

                                if (obj.numOfPages === 0) {
                                    // we might have reached the end and don't want to call one extra time
                                    if (obj.items.length < pageSize) {
                                        obj.numOfPages = currentPage - 1;
                                    }
                                }
                            }
                        }
                        const retItem = obj.items.length > 0 ? obj.items.pop() : undefined;
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

    async count(): Promise<number>;
    async count(options: { where?: string; include_deleted?: boolean }): Promise<number>;
    async count(options: {
        where?: string;
        include_deleted?: boolean;
        group_by: string;
    }): Promise<{ [key in string | number]: number }>;

    async count(
        options: { where?: string; include_deleted?: boolean; group_by?: string } = {},
    ): Promise<number | { [key in string | number]: number }> {
        let url = '/totals';
        url += this.getEndpointURL();
        const query = Endpoint.encodeQueryParams({
            select: 'count(InternalID) as count',
            ...options,
        });
        url = query ? url + '?' + query : url;
        const countObject = await this.service.get(url);

        if (options.group_by) {
            // Return an object of 'group_by' values and 'count' values.
            const groupedCountObjects: { [key in string | number]: number } = {};
            (countObject as Array<{ [key in string]: any }>).forEach((item) => {
                groupedCountObjects[item[options.group_by || '']] = item['count'];
            });

            return groupedCountObjects;
        } else {
            // Returns just a number.
            return countObject && countObject.length == 1 ? countObject[0].count : 0;
        }
    }

    async get(id: number): Promise<T> {
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
            order_by: options.order_by,
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

    uuid(uuid: string): { get: () => Promise<T> } {
        const service = this.service;
        let url = this.getEndpointURL();
        url += '/uuid/' + uuid;
        return {
            get(): Promise<T> {
                return service.get(url);
            },
        };
    }

    static encodeQueryParams(params: any) {
        const ret: string[] = [];

        Object.keys(params).forEach((key) => {
            ret.push(key + '=' + encodeURIComponent(params[key]));
        });

        return ret.join('&');
    }
}
