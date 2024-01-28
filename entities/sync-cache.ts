// all interfaces are described here:
// https://apidesign.pepperi.com/sync/open-sync/cache-interface.html

export interface CacheScheme {
    SourceAddonUUID: string;
    SchemeAddonUUID: string;
    SchemeName: string;
    CacheConfiguration?: any;
    SyncDataConfiguration?: any;
    TrackChanges?: boolean;
    ModificationDateTimeFieldID?: string;
}

export interface SyncPathData {
    // Stop all reference paths on the first resource that exists in this array
    // The current user resource is allways appended to this array
    // if no users resources exist
    Destinations: {
        Resource: string; // e.g. "accounts"
        Key: string;
    }[];
    // Return only resources that have one of these resources in one their reference paths
    IncludedResources: string[];

    // Return all resources expect these that have one of these resources in one their reference paths
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
    Resources: [
        {
            Scheme: {
                AddonUUID: string;
                Name: string;
            };
            Keys: string[];
            HiddenKeys: string[];
            // what was stores in the scheme when it was upserted
            SyncDataConfiguration: any;
        },
    ];
    NextPageKey: string; // only if there are additional pages left
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
