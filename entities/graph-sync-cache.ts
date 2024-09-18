/**
 * Defines a scheme that only exists to define edges.
 *
 * Its keys are never returned in the sync.
 *
 * When all edges are removed on a Key the Key will be removed.
 */
export interface GraphSchemeCacheConfiguration {
    /**
     * Optional, default is false
     */
    Phantom: boolean;

    /**
     * A list of Labels to use for filtering per profile.
     *
     * The delta endpoint will only return Keys that have edges to them
     * per the current user profile.
     *
     * If a profile doesn't exist, use profile hierarchy.
     *
     * If the label doesn't exist fail the upsert of the scheme.
     */
    Profiles: GraphSchemeCacheConfigurationProfile[];
}

export interface GraphSchemeCacheConfigurationProfile {
    InternalID: number;
    /**
     * default is true, if phantom is true this is always false
     */
    Sync: boolean;
    /**
     * No labels or empty will not filter and return all the keys
     */
    Labels: GraphSchemeCacheConfigurationLabel[];
}

export interface GraphSchemeCacheConfigurationLabel {
    Name: string;
}

export interface CacheEdgeLabelInput {
    Name: string;
    SourceAddonUUID: string;
    SourceScheme: {
        AddonUUID: string;
        SchemeName: string;
    };
    TargetScheme: {
        AddonUUID: string;
        SchemeName: string;
    };
}

export interface CacheEdgeLabelOutput extends CacheEdgeLabelInput {
    Key: string;
}

export interface CacheEdgesUpdateInput {
    SourceAddonUUID: string;
    LabelName: string;
    Updates: CacheEdge[];
}

export interface CacheEdge {
    SourceKey: string;
    TargetKey: string;
    ObjectModificationDateTime?: string;
    Hidden?: boolean;
}

export interface CacheEdgesUpdateOutput {
    Updates: {
        Key: string;
        Status: 'Ignore' | 'Insert' | 'Update' | 'Error';
        Details: string;
    }[];
}
