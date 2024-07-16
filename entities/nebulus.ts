export interface NebulusRebuildInput {
    SourceAddonUUID: string;
    Clean?: boolean;
    IncludedResources?: string[];
    ExcludedResources?: string[];
}
