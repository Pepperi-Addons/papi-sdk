export interface Action {
    ActionType: number;
    ClientOnly: boolean;
    ConditionAPIName?: any;
    Disable: boolean;
    ActionTypeName: string;
    ActionID: string;
    ParentID: string;
    BranchToTransition: string;
    KeyValue: any;
}

export interface WorkflowTransition {
    TransitionID: string;
    OriginStatus: number;
    TransitionName: string;
    Actions: Action[];
    PerformerID: number;
    ClientUID?: any;
    TransitionGeneralData: any;
    NavigateTo?: any;
}

export interface WorkflowProgram {
    TransitionID: string;
    Description: string;
    TransitionName: string;
    Actions: Action[];
    PerformerID: number;
    ClientUID?: any;
    TransitionGeneralData: any;
    NavigateTo?: any;
}

export interface WorkflowObject {
    WorkflowTransitions: WorkflowTransition[];
    WorkflowPrograms: WorkflowProgram[];
}

export interface WorkflowReference {
    Type: string;
    ID: string;
    Name: string;
    UUID: string;
}

export interface Worflow {
    ActivityTypeUUID: string;
    WorkflowObject: WorkflowObject;
    WorkflowReferences: WorkflowReference[];
}
