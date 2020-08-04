export interface ATDSettings {
    Icon: string;
    ShowOrderDetails: boolean;
    SearchAll: boolean;
    ShareOrder: boolean;
    MainAction: {
        ID: string;
        Name: string;
    };
    OrderView: {
        ID: string;
        Name: string;
    };
    InventoryLimitation: {
        ID: string;
        Name: string;
    };
    CaseQuantityLimitation: {
        ID: string;
        Name: string;
    };
    Type: {
        ID: string;
        Name: string;
    };
    EPayment: any;
    OriginAccountsData: AccountTypeDefinition;
    DestinationAccountsData: AccountTypeDefinition;
    TransactionItemsScopeFilterID: string;
    TransactionLinesFilter: {
        AdvancedFormula: boolean;
        formula: string;
        participatingAPINames: string[];
    };
}

export interface AccountTypeDefinition {
    IDs: string[];
    Label: string;
    AllTypes: boolean;
    UserAccount: boolean;
}
