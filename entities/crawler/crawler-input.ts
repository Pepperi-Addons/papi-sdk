/**
 * The input of a crawler operation.
 */
export interface CrawlerInput {
    /**
     * The name of the crawler action.
     */
    Name: string;

    /**
     * The description of the crawler action.
     */
    Description?: string;

    /**
     * The ID of the lock to use, allows the caller to 'lock' the crawler to prevent multiple crawlers operations from running at the same time.
     */
    LockID?: string;

    /**
     * Used in multi-Crawler to define execution order.
     */
    BlockID?: string;

    /**
     * The URL to the source - will be used to fetch pages.
     */
    SourceRelativeURL: string;

    /**
     * The URL to the target - will be used to send pages and collect outputs.
     */
    TargetRelativeURL: string;

    /**
     * Data that will be sent to the source in each page request.
     */
    SourceData?: { [key: string]: unknown };

    /**
     * Data that will be sent to the target in page handling request.
     */
    TargetData?: { [key: string]: unknown };

    /**
     * The maximum number of items inside a page that the target can handle.
     */
    MaxPageSize?: number;

    /**
     * The maximum number of pages that the target can handle in parallel.
     */
    MaxConcurrency?: number;

    /**
     * The target outputs blueprints, defines how the crawler should handle the target outputs.
     */
    TargetOutputs?: CrawlerTargetOutputBlueprint[];
}

export interface CrawlerTargetOutputBlueprint {
    /**
     * The name and ID of the field.
     */
    FieldID: string;
    /**
     * Sum: Sum all values.
     *
     * Array: Concat all items till Limit, returns a URL to a temporary files.
     */
    Type: 'Sum' | 'Array';
    /**
     * Only used on type Array, used to limit the number of items the crawler collect.
     */
    Limit?: number;
}
