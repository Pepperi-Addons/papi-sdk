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

