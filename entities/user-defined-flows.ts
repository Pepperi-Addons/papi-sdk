import { AddonData, SchemeFieldType } from '.';

export interface FlowParam {
    Name: string;
    Type: SchemeFieldType;
    Description?: string;
    DefaultValue: any;
    Internal: boolean;
}

export interface FlowGroupStep {
    Type: 'Group';
    Steps: FlowSteps[];
    Concurrent: boolean;
}

export interface FlowBlockStep {
    Type: 'LogicBlock';
    Configuration: any;
    Relation: {
        AddonUUID: string;
        Name: string;
        ExecutionURL: string;
    };
}

export type FlowSteps = FlowBlockStep | FlowGroupStep;

export interface Flow extends AddonData {
    Name: string;
    Description?: string;
    Params: FlowParam[];
    Steps: FlowSteps[];
}
