import { SchemeFieldType } from '.';

export interface IUserDefinedParameterConfiguration {
    Key: string;
    Description?: string;
    Type: SchemeFieldType;
    DefaultValue?: any;
    Persistency?: boolean;
    Disabled?: boolean;
}

export interface IUserDefinedParameterValue {
    Key: string;
    Value?: any;
    Persistency?: boolean;
}

export interface IUserDefinedParametersValuesBody {
    SourceAddonUUID: string;
    SourceKey?: string;
    Parameters: IUserDefinedParameterValue[];
}

export const SYSTEM_PARAMETERS: IUserDefinedParameterConfiguration[] = [
    { Key: 'AccountUUID', Type: 'String', Disabled: true },
];
