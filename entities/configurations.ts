import { SchemeFieldType } from './addons';

export interface ConfigurationScheme {
    Name: string;
    Fields: ConfigurationFields;
    Sync: Sync;
    AddonUUID: string;
}

export interface ConfigurationFields {
    [key: string]: { Type: SchemeFieldType; PerProfile?: boolean };
}

interface Sync {
    SyncData: boolean;
}

export interface Draft {
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

export interface Version {
    Description: string;
    Draft: string; //ref to draft
    State: VersionState;
}

export interface VersionState {
    Data: DraftData;
    Profiles: ConfigurationsProfile[];
}

export interface ConfigurationObject {
    Key: string; //should be consist of draftKey_profileKey
    ConfigurationSchemeName: string;
    Draft?: string; //reference to the draft
    Version: string; //reference to the version
    Profile: string; //reference to the profile
    Data: DraftData;
}
