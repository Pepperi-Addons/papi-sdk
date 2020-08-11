export interface ATDMetaData {
    TypeID: number;
    ExternalID: string;
    Description: string;
    CreationDate: string;
    ModificationDate: string;
    Hidden: boolean;
    Owner: {
        UUID: string;
    };
}
