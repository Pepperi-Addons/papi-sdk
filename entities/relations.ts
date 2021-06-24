import { AddonData } from './addons';

type RelationType = 'AddonAPI' | 'NgComponent' | 'Navigation';
//type RelationName = 'ATD_Export' | 'ATD_Import' | 'TypeLIst' | 'PageLayout';

export interface Relation extends AddonData {
    Description?: string;
    AddonRelativeURL?: string;
    Type: RelationType;
    AddonUUID: string;
    Name: string;
    RelationName: string;
    SubType?: string;
    ComponentName?: string;
    ModuleName?: string;
    [key:string]:any;
}
