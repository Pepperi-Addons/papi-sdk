import { AddonData } from '.';

type EmployeeType = 1 | 2 | 3;

/**
 * An object that defines how to filter a resource for a specific employee type.
 */
export interface FilterRule extends AddonData {
    Key?: string;
    /**
     * Type of the profile this rule applies to, 1 = Admin, 2 = Rep, 3 = Buyer.
     */
    EmployeeType: EmployeeType;
    /**
     * Name of the resource we are filtering.
     */
    Resource: string;
    /**
     * Key of the filter object we wish to filter by for this resource and profile.
     */
    Filter: string;
    /**
     * UUID of the owner of this filter rule.
     */
    AddonUUID?: string;
    /**
     * Permission set of the filter rule, default is "Sync".
     */
    PermissionSet?: string;
}

/**
 * An object that defines a step in the filtering process.
 */
export interface FilterObject extends AddonData {
    Key?: string;
    /**
     * Name of the filter object.
     */
    Name: string;
    /**
     * Name of the resource we are filtering.
     */
    Resource: string;
    /**
     * ID of the field that this filter returns.
     */
    Field: string;
    /**
     * ID of the field we wish to filter by.
     */
    PreviousField?: string;
    /**
     * Key of the filter object we wish to filter by,
     * we chain the current filter to the previous filter.
     */
    PreviousFilter?: string;
    /**
     * UUID of the owner of this filter object
     */
    AddonUUID?: string;
}
