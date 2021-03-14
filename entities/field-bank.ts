import { DataViewFieldType } from './data-view';

export interface FieldBank {
    UUID?: string;
    Hidden?: boolean;
    CreationDateTime?: string;
    ModificationDateTime?: string;
    Title: string;
    FieldType?: DataViewFieldType;
    Group: string;
    FieldID?: string;
    FieldPrefix: string;
    FieldParams?: any;
}

export type Component  = 'NG11' | 'Default';
export type Navigation = 'Settings' | 'Default';
export type BackgroundJob = 'None' | 'DownloadURL' ;

export type OpenType = 
    {'Component': Component} | 
    {'Navigation': Navigation } |
    {'BackgroundJob': BackgroundJob};

export type AddonField<T extends OpenType> = {
    readonly Type?: keyof T;
    SubType: T[keyof T];
    AddonUUID: string;
    RelativeURL: string;
    ComponentName?: string;
    ModuleName?: string;
    VisibleEndpoint?: string;
    MultiSelection?: boolean;
    Confirmation?: boolean;
}
