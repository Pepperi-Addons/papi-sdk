import { NestedObject } from './base';

export interface Transaction_Lines {
    InternalID?: number;
    Hidden?: boolean;
    UnitDiscountPercentage?: number;
    UnitPriceAfterDiscount?: number;
    TotalUnitsPriceBeforeDiscount?: number;
    TotalUnitsPriceAfterDiscount?: number;
    DeliveryDate?: string;
    TransactionExternalID?: string;
    LineNumber?: number;
    ItemExternalID?: string;
    UnitsQuantity?: number;
    UnitPrice?: number;
    CreationDateTime?: string;
    Item?: NestedObject;
    Transaction?: NestedObject;
}
