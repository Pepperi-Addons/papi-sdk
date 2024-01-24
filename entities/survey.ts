import { BaseActivity } from './base-activity';

export interface Survey extends BaseActivity {
    Template: string; // reference to the SurveyTemplate
    Answers?: SurveyAnswer[]; // contains object
}

export interface SurveyAnswer {
    Key: string; // reference to the SurveyTemplate question key
    Answer: any;
}
