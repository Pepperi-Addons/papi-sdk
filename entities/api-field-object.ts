export interface ApiFieldObject {
    InternalID?: number;
    FieldID: string;
    Label: string;
    Description?: string;
    IsUserDefinedField?: boolean;
    UIType: {
        ID: number;
        Name?: string;
    };
    Type?: string;
    Format?: string;
    CreationDateTime?: Date;
    ModificationDateTime?: Date;
    Hidden?: boolean;
    CSVMappedColumnName?: string;
    UserDefinedTableSource?: any;
    CalculatedRuleEngine?: any;
    TypeSpecificFields?: any;
}
