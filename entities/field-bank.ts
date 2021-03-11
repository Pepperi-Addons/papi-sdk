import { DataViewFieldType } from './data-view';

export interface FieldBank {
    UUID?: string;
    Hidden?: boolean;
    CreationDateTime?: string;
    ModificationDateTime?: string;
    Title: string;
    FieldType?: DataViewFieldType;
    Group: string;
    FieldID?: string;
    FieldPrefix: string;
    FieldParams?: any;
}

export interface AddonOptions {  
   Type:'Navigation'|'Component'|'BackgroundJob';
   SubType:string;
   AddonUUID:string;
   RelativeURL:string;
   ComponentName?:string;
   ModuleName?:string;
   VisibleEndpoint?: string;
   MultiSelection?:boolean;
   Confirmation?:boolean;
}
