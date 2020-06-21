export interface ApiFieldObject {
    FieldID: string;
    Label: string;
    Description?: string;
    IsUserDefinedField?: boolean;
    UIType: any;
    Type?: number;
    Format?: number;
    CreationDate?: Date;
    ModificationDate?: Date;
    Hidden?: boolean;
    CSVMappedColumnName?: string;
    UserDefinedTableSource?: any;
    CalculatedRuleEngine?: any;
    TypeSpecificFields?: any;
}
