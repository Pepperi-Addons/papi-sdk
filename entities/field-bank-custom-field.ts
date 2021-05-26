import { AddonData } from '.';
import { DataViewFieldType } from './data-view';

export interface FieldBankCustomField extends AddonData {
    Title: string;
    FieldType?: DataViewFieldType;
    Group: string;
    FieldID?: string;
    FieldPrefix: string;
    FieldParams?: any;
}

type AddonFieldType = 'Component' | 'Navigation' | 'BackgroundJob';
type ComponentAddonSubType = 'NG11';
type NavigationAddonSubType = 'Settings';
type BackgroundJobAddonSubType = 'None' | 'DownloadURL';
type AddonFieldSubType = ComponentAddonSubType | NavigationAddonSubType | BackgroundJobAddonSubType;
interface AddonFieldBase {
    Type: AddonFieldType;
    SubType: AddonFieldSubType;
    AddonUUID: string;
    RelativeURL: string;
    VisibleEndpoint?: string;
    MultiSelection?: boolean;
    Confirmation?: boolean;
}
export interface ComponentAddonField extends AddonFieldBase {
    Type: 'Component';
    SubType: ComponentAddonSubType;
    ComponentName: string;
    ModuleName: string;
}

export interface NavigationAddonField extends AddonFieldBase {
    Type: 'Navigation';
    SubType: NavigationAddonSubType;
}

export interface BackgroundJobAddonField extends AddonFieldBase {
    Type: 'BackgroundJob';
    SubType: BackgroundJobAddonSubType;
}

export type AddonField = ComponentAddonField | NavigationAddonField | BackgroundJobAddonField;
