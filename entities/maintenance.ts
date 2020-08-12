export interface MaintenanceJobResult {
    UUID: string;
    URI: string;
}

export interface ArchiveBody {
    activities?: number[];
    transactions?: number[];
}
