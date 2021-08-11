import { NgComponentRelation } from "./addons";

export interface Page {
    Hidden?: boolean;
    CreationDateTime?: string;
    ModificationDateTime?: string;
    Name: string;
    Description?: string;
    Type?: 'Home' | 'AccountHome' | 'None';
    Blocks: Array<PageBlock>;
    Layout: PageLayout;
}

export interface PageBlock {
    Key: string,
    Relation: PageRelation;
    Configuration?: any,
    PageConfiguration?: PageConfiguration;
}

export interface PageRelation extends NgComponentRelation {
    EditorModuleName?: string;
    EditorComponentName?: string;
}

export interface PageConfiguration {
    Consume?: PageConsume; 
    Produce?: PageProduce
}

export interface PageConsume {
    Filter: PageFilter;
    Context: PageContext;
}

export interface PageProduce {
    Filters: Array<PageFilter>;
    Context: PageContext;
}

export interface PageFilter {
    Resource: PageResourceType;
    Fields: Array<string>;
}

export interface PageContext {
    Resource?: PageResourceType;
}

// TODO: Add all resource types.
export type PageResourceType = 'transaction' | 'transaction_lines' | '';

export interface PageLayout {
    Sections: Array<PageSection>;
    SectionGap?: string;
    CoulmnsGap?: string;
    MaxWidth?: string;
}

export interface PageSection {
    IsHeightFixed?: boolean;
    Height?: string;
    Columns: Array<PageSectionColumn>;
}

export interface PageSectionColumn {
    BlockKey?: string;
    Width: string;
}