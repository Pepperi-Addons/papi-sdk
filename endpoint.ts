import { PapiClient } from './index';

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

    /** @depracated function
     * this function is depracated and will be remove in version 2.X!
     * please use iter().toArray() instead
     */

    async find(options: FindOptions = {}): Promise<T[]> {
        console.warn(
            'this function is depracated and will be remove is version 2.X! \n please use iter().toArray() instead ',
        );
        let url = this.endpoint;
        const query = Endpoint.encodeQueryParams(options);
        url = query ? url + '?' + query : url;
        return this.service.get(url);
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
        let url = this.endpoint;
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

    async upsert(object: T): Promise<T> {
        return this.service.post(this.endpoint, object);
    }

    static encodeQueryParams(params: any) {
        const ret: string[] = [];

        Object.keys(params).forEach((key) => {
            ret.push(key + '=' + encodeURIComponent(params[key]));
        });

        return ret.join('&');
    }
}
