import { AddonData, NgComponentRelation } from './addons';
import { DataViewScreenSize, ResourceType } from './data-view';

export interface Page extends AddonData {
    Name: string;
    Description?: string;
    Type?: 'Home' | 'AccountHome' | 'None';
    Blocks: PageBlock[];
    Layout: PageLayout;
}

export interface PageBlock {
    Key: string;
    Relation: PageRelation;
    Configuration?: any;
    PageConfiguration?: PageConfiguration;
}

export interface PageRelation extends NgComponentRelation {
    EditorModuleName?: string;
    EditorComponentName?: string;
}

export interface PageConfiguration {
    Consume?: PageConsume;
    Produce?: PageProduce;
}

export interface PageConsume {
    Filter: PageFilter;
    Context: PageContext;
}

export interface PageProduce {
    Filters: PageFilter[];
    Context: PageContext;
}

export interface PageFilter {
    Resource: ResourceType;
    Fields: string[];
}

export interface PageContext {
    Resource?: ResourceType;
}

export type PageSizeType = 'SM' | 'MD' | 'LG';

export interface PageLayout {
    Sections: PageSection[];
    SectionsGap?: PageSizeType;
    CoulmnsGap?: PageSizeType;
    MaxWidth?: number;
}

export const SplitTypes = [
    '1/4 3/4',
    '1/3 2/3',
    '1/2 1/2',
    '2/3 1/3',
    '3/4 1/4',
    '1/3 1/3 1/3',
    '1/2 1/4 1/4',
    '1/4 1/2 1/4',
    '1/4 1/4 1/2',
    '1/4 1/4 1/4 1/4',
] as const;
export type SplitType = typeof SplitTypes[number];

export interface PageSection {
    Key: string;
    Name?: string;
    // IsHeightFixed?: boolean;
    Height?: number;
    Columns: PageSectionColumn[];
    Split?: SplitType;
    Hide?: DataViewScreenSize[];
}

export interface PageSectionColumn {
    Block?: PageSectionBlock;
}

export interface PageSectionBlock {
    BlockKey: string;
    Hide?: DataViewScreenSize[];
}
