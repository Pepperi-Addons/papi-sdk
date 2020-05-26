export interface CodeJob {
    UUID?:string;
    CodeJobName:string;
    Type?:string;
    Description?:string;
    Owner?:string;
    CronExpression?:string;
    NextRunTime?:Date; 
    IsScheduled?:boolean;
    FailureAlertEmailTo?:any; 
    FailureAlertEmailSubject?:string;
    CodeJobIsHidden?:boolean;
    CreationDateTime?:Date;
    ModificationDateTime?:Date;
    ExecutionMemoryLevel?:number;
    NumberOfTries?:number;
    ExecutedCode?:string ;
    FunctionName?:string ;
    DraftCode?:string;
}

