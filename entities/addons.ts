export interface Addon {
        UUID?: string;
        Name?: string;
        Description?: string;
        SystemData: any;
        Hidden?: boolean;
        Type?: number;
}

export interface InstalledAddon {
    Addon: Addon;
    Version?: string;
    AdditionalData?: string;
    UUID?: string;
    Name?: string;
    Description?: string;
    SystemData: any;
    Hidden?: boolean;
    Type?: number;

}

export interface AddonVersion {
    UUID?: string;
    Hidden?: boolean;
    CreationDateTime?: Date;
    ModificationDateTime?: Date;
    Version?: string;
    Description?: string;
    Available?:boolean;
    Phased?: boolean;
    StartPhasedDateTime?:Date;
    AddonUUID?: string;
    PhasedFunction?:string;
}

export interface AddonSyncDeploymentResult {
    Status?: boolean;
    ExecutionUUID?:string;
    URI?:string;
}

export interface AddonAPIAsyncResult {
    ExecutionUUID?:string;
    URI?:string;
}

export interface AddonAPISyncResult {
    success?:boolean;
    errorMessage?:string;
}
