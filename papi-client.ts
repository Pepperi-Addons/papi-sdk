
import Endpoint from "./endpoint";
import { AddonEndpoint, CodeJobsEndpoint,DistributorFlagsEndpoint } from "./endpoints";
import { UserDefinedTableMetaData, UserDefinedTableRow, Account, GeneralActivity, Transaction } from "./entities" ;
import { performance } from 'perf_hooks';
import fetch from 'node-fetch'
import { User } from "./entities/user";

type HttpMethod =  'POST' | 'GET' | 'PUT' | 'DELETE';

interface PapiClientOptions {
    token: string, 
    baseURL: string
};

export class PapiClient {
    
    metaData = {
        userDefinedTables: new Endpoint<UserDefinedTableMetaData>(this, '/meta_data/user_defined_tables'),
        flags : new DistributorFlagsEndpoint(this)

    };

    userDefinedTables = new Endpoint<UserDefinedTableRow>(this, '/user_defined_tables');
    addons = new AddonEndpoint(this);
    codeJobs = new CodeJobsEndpoint(this);
    activities = new Endpoint<GeneralActivity>(this, '/activities');
    transactions = new Endpoint<Transaction>(this, '/transactions');
    allActivities = new Endpoint<GeneralActivity | Transaction>(this, '/all_activities');
    accounts = new Endpoint<Account>(this, '/accounts');
    users = new Endpoint<User>(this, '/users');
  
    
    constructor(
        private options: PapiClientOptions
        ) {
        
    }

    async get(url: string): Promise<any> {
        return this.apiCall('GET', url);
    }

    async post(url: string, body: any = undefined): Promise<any> {
        return this.apiCall('POST', url, body);
    }

    private async apiCall(method: HttpMethod, url: string, body: any = undefined) {
        
        const fullURL = this.options.baseURL + url;
        const options: any = {
            method: method,
            headers: {
                authorization: 'Bearer ' + this.options.token
            }
        };
        
        if (body) {
            options.body = JSON.stringify(body);
        }

        const t0 = performance.now();
        const res = await fetch(fullURL, options);
        const t1 = performance.now();

        console.log(method, fullURL, 'took', (t1 - t0).toFixed(2), 'milliseconds');

        return await res.json();
    }
}