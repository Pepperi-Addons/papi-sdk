import { ElasticSearchDocument } from './addons';

export interface UpdateByQueryResponse {
    took: number;
    timed_out: boolean;
    total: number;
    updated: number;
    deleted: number;
    batches: number;
    version_conflicts: number;
    noops: number;
    retries: {
        bulk: number;
        search: number;
    };
    throttled_millis: number;
    requests_per_second: number;
    throttled_until_millis: number;
    failures: any[];
}

export interface DataIndexBatchRequestBody {
    Objects: ElasticSearchDocument[];
    OverwriteObject?: boolean;
    WriteMode?: 'Merge' | 'Overwrite' | 'Insert';
    StaleModificationFieldID?: string;
    StaleHandlingStrategy?: 'UpdateIfNewerOrEqual' | 'UpdateIfNewer';
}
