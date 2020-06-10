import { Activity } from "../entities/activities";
import Endpoint from "../endpoint"
import { PapiClient } from "../papi-client";


export class ActivitiesEndpoint extends Endpoint<Activity> {
    constructor(service: PapiClient) { 
    super(service, '/all_activities');
    }
    
}