import { NestedObject } from './base';

export interface TransactionLines {
    InternalID?: number;
    UUID?: string;
    Archive?: boolean;
    CreationDateTime?: string;
    DeliveryDate?: null;
    Hidden?: boolean;
    LineNumber: number;
    ModificationDateTime?: string;
    TotalUnitsPriceAfterDiscount?: number;
    TotalUnitsPriceBeforeDiscount?: number;
    UnitDiscountPercentage?: number;
    UnitPrice?: number;
    UnitPriceAfterDiscount?: number;
    UnitsQuantity: number;
    Item: NestedObject;
    Transaction: NestedObject;
}
