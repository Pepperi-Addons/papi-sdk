import Endpoint from "./endpoint";
import { AddonEndpoint } from "./endpoints";
import { UserDefinedTableMetaData, UserDefinedTableRow } from "./entities" ;
import { performance } from 'perf_hooks';
import fetch, { FetchError } from 'node-fetch'

type HttpMethod =  'POST' | 'GET' | 'PUT' | 'DELETE';

interface PapiClientOptions {
    token: string, 
    baseURL: string
};

export class PapiClient {
    
    metaData = {
        userDefinedTables: new Endpoint<UserDefinedTableMetaData>(this, '/meta_data/user_defined_tables')
    };

    userDefinedTables = new Endpoint<UserDefinedTableRow>(this, '/user_defined_tables');
    addons = new AddonEndpoint(this);
  
    
    constructor(
        private options: PapiClientOptions
        ) {
        
    }

    async get(url: string): Promise<any> {
        return this.apiCall('GET', url);
    }

    async post(url: string, body: any): Promise<any> {
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
            options.body = body;
        }

        const t0 = performance.now();
        const res = await fetch(fullURL, options);
        const t1 = performance.now();

        console.log(method, fullURL, 'took', (t1 - t0).toFixed(2), 'milliseconds');

        return await res.json();
    }
}