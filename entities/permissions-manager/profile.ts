export interface PermissionsProfile {
    PolicyAddonUUID: string;
    PolicyName: string;
    ProfileID: '1' | '2' | '3';
    Allowed: boolean;
    Hidden?: boolean;
}
