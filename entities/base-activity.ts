import { AddonData } from './addons';

export interface BaseActivity extends AddonData {
    StatusName?: string;
    ActionDateTime?: Date;
    Creator?: string;
    Account?: string; // the UUID of the account the survey was created for
    Agent?: string;
    ExternalID?: string; // unique ID
}
