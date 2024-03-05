import { CrawlerInput, CrawlerTargetOutputBlueprint } from './crawler-input';
import { PagerCrawlerInput } from './pager-input';

export interface MultiCrawlerInput {
    /**
     * The ID of the lock to use, allows the caller to 'lock' the crawler to prevent multiple crawlers operations from running at the same time.
     */
    LockID?: string;

    /**
     * Array of crawlers to run.
     */
    Crawlers: (CrawlerInput | PagerCrawlerInput)[];

    /**
     * Default values for optional crawler parameters.
     */
    Defaults: {
        SourceData?: { [key: string]: unknown };
        TargetData?: { [key: string]: unknown };
        MaxPageSize?: number;
        MaxConcurrency?: number;
        TargetOutputs?: CrawlerTargetOutputBlueprint[];
    };

    /**
     * Maximum number of parallel calls to the sources.
     *
     * Default: 5, Max: 10.
     */
    MaxSourcesConcurrency?: number;

    /**
     * Maximum number of parallel calls to the targets.
     *
     * Default: false.
     */
    MaxTargetsConcurrency?: number;

    /**
     * Should the multi-crawl be aborted if one of the crawlers fails?
     * Default: false.
     */
    AbortOnFailure?: boolean;

    /**
     * The key is the crawler's BlockID that should be blocked.
     * The array is the crawlers BlockIDs that blocks the former.
     */
    BlockingRules?: {
        [key: string]: string[];
    };
}
