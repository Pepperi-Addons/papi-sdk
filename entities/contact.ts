import { NestedObject } from './base';

export interface Contact {
    InternalID?: number;
    CreationDateTime?: string;
    Email?: string;
    Email2?: string;
    ExternalID: string;
    FirstName?: string;
    Hidden?: boolean;
    IsBuyer?: boolean;
    LastName?: string;
    Mobile?: string;
    ModificationDateTime?: string;
    Phone?: string;
    Role?: string;
    Status?: number;
    TypeDefinitionID?: number;
    UUID?: string;
    Account?: NestedObject;
    Profile?: NestedObject;
    [key: string]: any;
}
