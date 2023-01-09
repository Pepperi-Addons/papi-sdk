import { BaseActivity } from './base-activity';

export interface Survey extends BaseActivity {
    Template: string; // reference to the SurveyTemplate
    Answers?: Answer[]; // contains object
}

export interface Answer {
    Key: string; // reference to the SurveyTemplate question key
    Answer: any;
}
