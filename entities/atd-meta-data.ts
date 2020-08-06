export interface ATDMetaData {
    InternaID: string;
    ExternalID: string;
    Description: string;
    CreationDate: string;
    ModificationDate: string;
    Hidden: boolean;
    Owner: {
        UUID: string;
    };
}