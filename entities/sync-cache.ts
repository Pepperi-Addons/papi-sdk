// all interfaces are described here:
// https://apidesign.pepperi.com/sync/open-sync/cache-interface.html

import { GraphSchemeCacheConfiguration } from './graph-sync-cache';

export interface CacheScheme {
    SourceAddonUUID: string;
    SchemeAddonUUID: string;
    SchemeName: string;
    CreationDateTime?: string;
    /**
     * Default is ModificationDateTime, value must be a valid ISO DateTime.
     */
    ModificationDateTimeFieldID?: string;
    ModificationDateTime?: string;
    /**
     * Object that will be sent in the delta, saved and returned as string.
     */
    SyncDataConfiguration?: string;
    /**
     * Specific cache configuration, defined by each specific cache addon.
     */
    CacheConfiguration?: GraphSchemeCacheConfiguration;
    Hidden?: boolean;
}

export interface SyncPathData {
    /** Stop all reference paths on the first resource that exists in this array
     * The current user resource is always appended to this array
     * if no users resources exist
     */
    Destinations: {
        Resource: string; // e.g. "accounts"
        Key: string;
    }[];
    /**
     * Return only resources that have one of these resources in one their reference paths
     */
    IncludedResources: string[];

    /**Return all resources expect these that have one of these resources in one their reference paths
     */
    ExcludedResources: string[];
}

export interface CacheDeltaInput {
    SourceAddonUUID: string;
    LastSyncDateTime: string;
    PageSize?: number;
    PageKey?: string;
    IncludeDeleted?: boolean;
    PathData?: SyncPathData;
}

export interface CacheDeltaResult {
    Resources: {
        Schema: {
            AddonUUID: string;
            Name: string;
        };
        Keys: string[];
        HiddenKeys: string[];
        /**
         * What was stored in the scheme when it was upserted.
         */
        SyncDataConfiguration?: any;
    }[];
    /**
     * Only if there are additional pages left.
     */
    NextPageKey?: string;
    LastSyncDateTime?: string;
}

export interface CacheChangesInput {
    SourceAddonUUID: string;
    SchemeAddonUUID: string;
    SchemeName: string;
    Updates: CacheObject[];
}
export interface CacheObject {
    CreationDateTime?: string;
    ModificationDateTime?: string;
    Key: string;
    ObjectModificationDateTime: string;
    Hidden?: boolean;
}

export interface CacheChangesResult {
    Updates: CacheUpdateResult[];
}

export interface CacheUpdateResult {
    Key: string;
    Status: 'Insert' | 'Update' | 'Ignore' | 'Error' | 'Remove';
    Details: string;
}

export interface CacheRemoveInput {
    SourceAddonUUID: string;
    SchemeAddonUUID: string;
    SchemeName: string;
    Keys: string[];
}

export interface CacheRemoveOutput {
    Updates: {
        Key: string;
        Status: 'Ignore' | 'Remove' | 'Error';
        Details: string;
    }[];
}
