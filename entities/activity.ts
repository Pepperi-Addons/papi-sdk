import { NestedObject } from './base';

interface Activity {
    InternalID?: number;
    UUID?: string;
    ExternalID?: string;
    AccountExternalID?: string;
    ActionDateTime?: string;
    ActivityTypeID?: number;
    AdditionalAccountExternalID?: string;
    AgentExternalID?: string;
    Archive?: boolean;
    CatalogExternalID?: string;
    ContactPersonExternalID?: string;
    CreationDateTime?: string;
    CreatorExternalID?: string;
    Hidden?: boolean;
    ModificationDateTime?: string;
    Status?: number;
    StatusName?: string;
    SubmissionGeoCodeLAT?: number;
    SubmissionGeoCodeLNG?: number;
    Type?: string;
    Account?: NestedObject;
    Agent?: NestedObject;
    ContactPerson?: NestedObject;
    Creator: NestedObject;
    [key: string]: any;
}

export interface GeneralActivity extends Activity {
    CreationGeoCodeLAT?: number;
    CreationGeoCodeLNG?: number;
    PlannedDuration?: number;
    PlannedEndTime?: string;
    PlannedStartTime?: string;
    Title?: string;
}

export interface Transaction extends Activity {
    BillToCity?: string;
    BillToCountry?: string;
    BillToFax?: string;
    BillToName?: string;
    BillToPhone?: string;
    BillToState?: string;
    BillToStreet?: string;
    BillToZipCode?: string;
    CurrencySymbol?: string;
    DeliveryDate?: string;
    DiscountPercentage?: number;
    GrandTotal?: number;
    ItemsCount?: number;
    QuantitiesTotal?: number;
    Remark?: string;
    ShipToCity?: string;
    ShipToCountry?: string;
    ShipToExternalID?: string;
    ShipToFax?: string;
    ShipToName?: string;
    ShipToPhone?: string;
    ShipToState?: string;
    ShipToStreet?: string;
    ShipToZipCode?: string;
    Signature?: any;
    SubTotal?: number;
    SubTotalAfterItemsDiscount?: number;
    TaxPercentage?: number;
    AdditionalAccount?: NestedObject;
    Catalog?: NestedObject;
    OriginAccount?: NestedObject;
    TransactionLines?: NestedObject;
}
