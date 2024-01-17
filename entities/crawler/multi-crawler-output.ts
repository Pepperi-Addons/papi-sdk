export interface MultiCrawlerOutput {
    /**
     * All crawlers outputs.
     */
    Outputs: {
        [CrawlerName: string]: {
            [FieldID: string]: string | number;
        };
    };

    /**
     * Combined statistics of the crawlers.
     */
    TotalStatistics: {
        SourcePagesCount: number;
        SourceObjectsCount: number;
        TargetTimeInSeconds: number;
        SourceTimeInSeconds: number;
        SourceSizeInKB: number;
    };
}
