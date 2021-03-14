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

type AddonFieldType = 'Component' | 'Navigation' | 'BackgroundJob';
type ComponentAddonSubType = 'ng11';
type NavigationAddonSubType = 'settings';
type BackgroundJobAddonSubType = 'None' | 'DownloadURL';
type AddonFieldSubType = ComponentAddonSubType | NavigationAddonSubType | BackgroundJobAddonSubType;
export interface AddonField {
    Type: AddonFieldType;
    SubType: AddonFieldSubType;
    AddonUUID: string;
    RelativeURL: string;
    ComponentName?: string;
    ModuleName?: string;
    VisibleEndpoint?: string;
    MultiSelection?: boolean;
    Confirmation?: boolean;
}

export interface ComponentAddonField extends AddonField {
    Type: 'Component';
    SubType: ComponentAddonSubType;
    AddonUUID: string;
    RelativeURL: string;
    ComponentName?: string;
    ModuleName?: string;
    VisibleEndpoint?: string;
    Confirmation?: boolean;
    MultiSelection?: boolean;
}

export interface NavigationAddonField extends AddonField {
    Type: 'Navigation';
    SubType: NavigationAddonSubType;
    AddonUUID: string;
    RelativeURL: string;
    VisibleEndpoint?: string;
    MultiSelection?: boolean;
    Confirmation?: boolean;
}

export interface BackgroundJobAddonField extends AddonField {
    Type: 'BackgroundJob';
    SubType: BackgroundJobAddonSubType;
    AddonUUID: string;
    RelativeURL: string;
    VisibleEndpoint?: string;
    MultiSelection?: boolean;
    Confirmation?: boolean;
}
