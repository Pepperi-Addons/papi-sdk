import { SchemeFieldType } from './addons';

export interface ConfigurationScheme {
    Key?: string;
    Name: string;
    Fields: ConfigurationFields;
    Sync: Sync;
    AddonUUID: string;
    Hidden?: boolean;
}

interface ConfigurationFields {
    [key: string]: { Type: SchemeFieldType; PerProfile?: boolean };
}

interface Sync {
    SyncData: boolean;
}

export interface Draft {
    Key?: string;
    AddonUUID: string;
    ConfigurationSchemaName: string;
    Description: string;
    PublishedVersion?: string; //reference to version
    Data: DraftData;
    Profiles: ConfigurationsProfile[];
    Hidden?: boolean;
}

export interface DraftData {
    [FieldID: string]: any;
}

export interface ConfigurationsProfile {
    Key: string; //ref to profile
    Data: DraftData;
}

export interface Version {
    Key?: string;
    Hidden?: boolean;
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

export interface ConfigurationObject {
    Key?: string; //should be consist of draftKey_profileKey
    Hidden?: boolean;
    ConfigurationSchemeName: string;
    Draft: string; //reference to the draft
    Version: string; //reference to the version
    Profile: string; //reference to the profile
    Data: DraftData;
}
