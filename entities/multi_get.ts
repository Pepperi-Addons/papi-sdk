export interface MultiGetInput {
    Resources: {
        Keys: string[];
        Scheme: {
            Name: string;
            AddonUUID: string;
        };
    }[];
}

export interface MultiGetOutput {
    Resources: {
        Scheme: {
            Name: string;
            AddonUUID: string;
        };
        Objects: {
            [fieldID: string]: unknown;
        }[];
    }[];
}
