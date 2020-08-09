export interface ATDMetaData {
    TypeID: string;
    ExternalID: string;
    Description: string;
    CreationDate: string;
    ModificationDate: string;
    Hidden: boolean;
    Owner: {
        UUID: string;
    };
}
