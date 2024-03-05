import { CrawlerStatistics } from './crawler-output';

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
    Statistics: CrawlerStatistics;

    /**
     * The status of each crawler.
     */
    Statuses: {
        [CrawlerName: string]: {
            /**
             * Finished - the crawler finished crawling successfully.
             *
             * InProgress - the crawler is still running (or waiting for retry).
             *
             * Aborted - the crawler was aborted but did not fail directly, for more information read message.
             *
             * Failed - the crawler failed, for more information read message.
             */
            Status: 'Finished' | 'InProgress' | 'Aborted' | 'Failed';
            Message?: string;
        };
    };
}
