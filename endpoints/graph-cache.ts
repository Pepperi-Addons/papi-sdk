import Endpoint from '../endpoint';
import {
    CacheChangesInput,
    CacheChangesResult,
    CacheEdgeLabelInput,
    CacheEdgeLabelOutput,
    CacheEdgeLabelPurgeInput,
    CacheEdgeLabelPurgeOutput,
    CacheEdgesUpdateInput,
    CacheEdgesUpdateOutput,
    CacheRemoveInput,
    CacheRemoveOutput,
    CacheScheme,
    CacheSchemePurgeInput,
    CacheSchemePurgeOutput,
    DeleteEdgesInput,
    DeleteEdgesOutput,
    SearchBody,
} from '../entities';
import { PapiClient } from '../papi-client';

export class GraphCacheEndpoint extends Endpoint<never> {
    constructor(service: PapiClient) {
        super(service, '/cache');
    }

    schemes = {
        upsert: async (scheme: CacheScheme): Promise<CacheScheme> => {
            const url = 'cache/schemes';
            return await this.service.post(url, scheme);
        },
        search: async (searchBody: SearchBody): Promise<CacheScheme[]> => {
            const url = '/cache/schemes/search';
            return await this.service.post(url, searchBody);
        },
        purge: async (input: CacheSchemePurgeInput): Promise<CacheSchemePurgeOutput> => {
            const url = '/cache/purge';
            return await this.service.post(url, input);
        },
    };
    records = {
        upsert: async (input: CacheChangesInput): Promise<CacheChangesResult> => {
            const url = 'cache/changes';
            return await this.service.post(url, input);
        },
        purge: async (input: CacheRemoveInput): Promise<CacheRemoveOutput> => {
            const url = 'cache/remove';
            return await this.service.post(url, input);
        },
    };
    edge_labels = {
        upsert: async (input: CacheEdgeLabelInput): Promise<CacheEdgeLabelOutput> => {
            const url = 'cache/edges/labels';
            return await this.service.post(url, input);
        },
        search: async (searchBody: SearchBody): Promise<CacheEdgeLabelOutput[]> => {
            const url = '/cache/edges/labels/search';
            return await this.service.post(url, searchBody);
        },
        purge: async (input: CacheEdgeLabelPurgeInput): Promise<CacheEdgeLabelPurgeOutput> => {
            const url = 'cache/edges/labels/purge';
            return await this.service.post(url, input);
        },
    };
    edges = {
        upsert: async (input: CacheEdgesUpdateInput): Promise<CacheEdgesUpdateOutput> => {
            const url = '/cache/edges/changes';
            return await this.service.post(url, input);
        },
        purge: async (input: DeleteEdgesInput): Promise<DeleteEdgesOutput> => {
            const url = '/cache/edges/remove';
            return await this.service.post(url, input);
        },
    };
}
