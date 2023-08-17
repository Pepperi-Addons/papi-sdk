import { AddonData, AddonDataScheme, SchemeFieldType } from './addons';

export interface ConfigurationScheme extends AddonData {
    Name: string;
    Fields: ConfigurationFields;
    SyncData: AddonDataScheme['SyncData'];
    AddonUUID: string;
}

interface ConfigurationFields {
    [key: string]: { Type: SchemeFieldType; PerProfile?: boolean };
}

export interface Draft extends AddonData {
    AddonUUID: string;
    ConfigurationSchemaName: string;
    Description: string;
    PublishedVersion?: string; //reference to version
    Data: DraftData;
    Profiles: ConfigurationsProfile[];
}

export interface DraftData {
    [FieldID: string]: any;
}

export interface ConfigurationsProfile {
    Key: string; //ref to profile
    Data: DraftData;
}

export interface Version extends AddonData {
    Description: string;
    Draft: string; //ref to draft
    State: VersionState;
    AddonUUID: string;
    ConfigurationSchemaName: string;
}

export interface VersionState {
    Data: DraftData;
    Profiles: ConfigurationsProfile[];
}

export interface ConfigurationObject extends AddonData {
    ConfigurationSchemeName: string;
    Draft: string; //reference to the draft
    Version: string; //reference to the version
    Profile: string; //reference to the profile
    Data: DraftData;
}
