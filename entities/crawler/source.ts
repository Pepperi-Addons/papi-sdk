/**
 * Input of a Crawler source.
 */
export interface CrawlerSourceInput {
    /**
     * A key that can be used to fetch the next page of the resource.
     */
    PageKey: string | undefined;
    [key: string]: unknown;
}

/**
 * Output of a Crawler source.
 */
export interface CrawlerSourceOutput {
    /**
     * The page content.
     */
    Objects: unknown[];

    /**
     * A key that can be used to fetch the next page of the resource.
     */
    NextPageKey: string;
}
