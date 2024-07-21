import { AddonData, NgComponentRelation } from './addons';
import { DataViewScreenSize, ResourceType } from './data-view';

export interface Page extends AddonData {
    Name?: string;
    Description?: string;
    Blocks: PageBlock[];
    Layout: PageLayout;
}

export interface PageBlock {
    Key: string;
    Relation?: NgComponentRelation; // Deprecated. Use Configuration (Resource & AddonUUID) instead.
    Configuration: ResourceDataConfiguration;
    ConfigurationPerScreenSize?: ScreenSizeDataConfiguration;
    PageConfiguration?: PageConfiguration;
}

export interface ResourceDataConfiguration {
    Resource: string;
    AddonUUID: string;
    Data: any; // For desktop
}

export interface ScreenSizeDataConfiguration {
    Tablet?: any;
    Mobile?: any;
}

export interface PageConfiguration {
    Parameters: PageConfigurationParameter[];
}

export type PageConfigurationParameter = PageConfigurationParameterString | PageConfigurationParameterFilter;
export interface PageConfigurationParameterBase {
    Key: string;
    Type: string;
    // Mandatory: boolean;
    Consume: boolean;
    Produce: boolean;
}

export interface PageConfigurationParameterString extends PageConfigurationParameterBase {
    Type: 'String';
}
export interface PageConfigurationParameterFilter extends PageConfigurationParameterBase {
    Type: 'Filter';
    Resource: ResourceType;
    Fields: string[];
}

export const PageSizeTypes = ['none', 'sm', 'md', 'lg'] as const;
export type PageSizeType = typeof PageSizeTypes[number];

export interface PageLayout {
    Sections: PageSection[];
    VerticalSpacing?: PageSizeType;
    HorizontalSpacing?: PageSizeType;
    SectionsGap?: PageSizeType;
    ColumnsGap?: PageSizeType;
    // RoundedCorners?: PageSizeType;
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
    Height?: number;
    Columns: PageSectionColumn[];
    Split?: SplitType;
    Hide?: DataViewScreenSize[];
    CollapseOnTablet?: boolean;
    FillHeight?: boolean;
    Padding?: PepPaddingSettings;
}

export interface PepPaddingSettings {
    isUniform: boolean;
    paddingValue: string;
}

export interface PageSectionColumn {
    BlockContainer?: PageBlockContainer;
}

export interface PageBlockContainer {
    BlockKey: string;
    Hide?: DataViewScreenSize[];
}
