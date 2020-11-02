export interface BatchApiResponse {
    InternalID: number;
    UUID: string;
    ExternalID: string;
    Status: 'Update' | 'Insert' | 'Ignore' | 'Error';
    Message: string;
    URI: string;
}
