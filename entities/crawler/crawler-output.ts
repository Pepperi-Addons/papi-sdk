export interface CrawlerOutput {
    /**
     * The result of the target outputs handling.
     */
    TargetOutputs: {
        [FieldID: string]: string | number;
    };
    /**
     * Statistics tracked by the Crawler to give insight into the process.
     */
    Statistics: CrawlerStatistics;
}

/**
 * Statistics tracked by the Crawler to give insight into the process.
 */
export interface CrawlerStatistics {
    SourcePagesCount: number;
    SourceObjectsCount: number;
    SourceSizeInKB: number;
    TargetTimeInSeconds: number;
    SourceTimeInSeconds: number;
    PagerTimeInSeconds: number;
}
