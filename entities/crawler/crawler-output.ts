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
    Statistics: Statistics;
}

/**
 * Statistics tracked by the Crawler to give insight into the process.
 */
interface Statistics {
    SourcePagesCount: number;
    SourceObjectsCount: number;
    TargetTimeInSeconds: number;
    SourceTimeInSeconds: number;
    SourceSizeInKB: number;
}
