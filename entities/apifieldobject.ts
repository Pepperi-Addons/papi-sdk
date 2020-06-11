export interface apifieldobject {

    FieldID: string;
    Label:string;
    Description?:string;
    IsUserDefinedField?: boolean;
    UIType: object;
    Type?: number,
    Format?: number,
    CreationDate?: Date,
    ModificationDate?: Date,
    Hidden?: boolean,
    CSVMappedColumnName?: string,
    UserDefinedTableSource?: object,
    CalculatedRuleEngine?: object,
    TypeSpecificFields?: object

}

